import type { Page } from '@playwright/test'
import {
  ANIMATIONS_TIMEOUT_MS,
  SCROLL_OFFSET_PX,
  SETTLE_MS,
  TEST_NOW
} from '../constants/e2e'

const useNativeTextBalancing = async (page: Page) => {
  await page.addInitScript(() => {
    Object.assign(window, { __wrap_n: 1 })
  })
}

export const prepareRealTime = async (page: Page) => {
  await useNativeTextBalancing(page)
}

export const freezeTime = async (page: Page) => {
  await useNativeTextBalancing(page)
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
  await page.evaluate(() => {
    for (const element of document.querySelectorAll<SwiperElement>('.swiper')) {
      element.swiper?.autoplay.stop()
      element.swiper?.slideTo(0, 0)
    }
  })
}

const waitForEntranceAnimations = async (page: Page) => {
  await page.waitForFunction(
    () =>
      Array.from(
        document.querySelectorAll<HTMLElement>('.will-change-transform')
      )
        .filter(
          (element) =>
            element.closest('.overflow-hidden.whitespace-nowrap') === null
        )
        .filter((element) => {
          const { top, bottom } = element.getBoundingClientRect()
          return bottom > 0 && top < window.innerHeight
        })
        .every((element) => {
          const style = getComputedStyle(element)
          return style.transform === 'none' && style.opacity === '1'
        }),
    undefined,
    { timeout: ANIMATIONS_TIMEOUT_MS }
  )
}

const SCROLL_PASSES = 2

export const scrollToText = async (page: Page, text: string) => {
  for (let pass = 0; pass < SCROLL_PASSES; pass++) {
    await page
      .getByText(text)
      .first()
      .evaluate((element, offset) => {
        let top = 0
        let node: HTMLElement | null = element as HTMLElement
        while (node !== null) {
          top += node.offsetTop
          node = node.offsetParent as HTMLElement | null
        }
        window.scrollTo(0, top - offset)
      }, SCROLL_OFFSET_PX)
    await page.waitForTimeout(SETTLE_MS)
  }
  await waitForEntranceAnimations(page)
}

export const scrollToTop = async (page: Page) => {
  await page.evaluate(() => {
    window.scrollTo(0, 0)
  })
  await page.clock.runFor(SETTLE_MS)
}
