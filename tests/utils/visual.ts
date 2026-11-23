import type { Page } from '@playwright/test'
import {
  ANIMATIONS_TIMEOUT_MS,
  FIRST_SLIDE_INDEX,
  INSTANT_SLIDE_MS,
  NATIVE_TEXT_BALANCING,
  PAGE_START_PX,
  SCROLL_OFFSET_PX,
  SCROLL_PASSES,
  SETTLE_MS,
  TEST_NOW
} from '../constants/e2e'

const enableNativeTextBalancing = async (page: Page) => {
  await page.addInitScript((mode) => {
    Object.assign(window, { __wrap_n: mode })
  }, NATIVE_TEXT_BALANCING)
}

export const prepareRealTime = async (page: Page) => {
  await enableNativeTextBalancing(page)
}

export const freezeTime = async (page: Page) => {
  await enableNativeTextBalancing(page)
  await page.clock.install({ time: TEST_NOW })
}

const waitForContent = async (page: Page) => {
  await page.waitForLoadState('networkidle')
  await page.waitForFunction(() =>
    Array.from(document.images).every((image) => image.complete)
  )
  await page.evaluate(async () => {
    await document.fonts.ready
  })
}

export const settle = async (page: Page) => {
  await waitForContent(page)
  await page.clock.runFor(SETTLE_MS)
  await stopSliders(page)
}

export const settleRealTime = async (page: Page) => {
  await waitForContent(page)
  await page.waitForTimeout(SETTLE_MS)
  await waitForEntranceAnimations(page)
}

interface SwiperElement extends HTMLElement {
  swiper?: {
    autoplay: { stop: () => void }
    slideTo: (index: number, speed: number) => void
  }
}

const stopSliders = async (page: Page) => {
  await page.evaluate(
    ({ index, speed }) => {
      for (const element of document.querySelectorAll<SwiperElement>(
        '.swiper'
      )) {
        element.swiper?.autoplay.stop()
        element.swiper?.slideTo(index, speed)
      }
    },
    { index: FIRST_SLIDE_INDEX, speed: INSTANT_SLIDE_MS }
  )
}

const waitForEntranceAnimations = async (page: Page) => {
  await page.waitForFunction(
    (viewportTop) =>
      Array.from(
        document.querySelectorAll<HTMLElement>('.will-change-transform')
      )
        .filter(
          (element) =>
            element.closest('.overflow-hidden.whitespace-nowrap') === null
        )
        .filter((element) => {
          const { top, bottom } = element.getBoundingClientRect()
          return bottom > viewportTop && top < window.innerHeight
        })
        .every((element) => {
          const style = getComputedStyle(element)
          return style.transform === 'none' && style.opacity === '1'
        }),
    PAGE_START_PX,
    { timeout: ANIMATIONS_TIMEOUT_MS }
  )
}

const scrollOnceToText = async (page: Page, text: string) => {
  await page
    .getByText(text)
    .first()
    .evaluate(
      (element, { offset, start }) => {
        const pageTopOf = (node: Element | null): number =>
          node instanceof HTMLElement
            ? node.offsetTop + pageTopOf(node.offsetParent)
            : start
        window.scrollTo(start, pageTopOf(element) - offset)
      },
      { offset: SCROLL_OFFSET_PX, start: PAGE_START_PX }
    )
  await page.waitForTimeout(SETTLE_MS)
}

export const scrollToText = async (page: Page, text: string) => {
  await Array.from({ length: SCROLL_PASSES }).reduce<Promise<void>>(
    async (previous) => {
      await previous
      await scrollOnceToText(page, text)
    },
    Promise.resolve()
  )
  await waitForEntranceAnimations(page)
}

export const scrollToTop = async (page: Page) => {
  await page.evaluate((start) => {
    window.scrollTo(start, start)
  }, PAGE_START_PX)
  await page.clock.runFor(SETTLE_MS)
}
