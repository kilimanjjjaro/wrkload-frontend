import type { Page } from '@playwright/test'
import { SCROLL_OFFSET_PX, SETTLE_MS, TEST_NOW } from '../constants/e2e'

export const freezeTime = async (page: Page) => {
  await page.clock.install({ time: TEST_NOW })
  await page.addInitScript(() => {
    Object.assign(window, { __wrap_n: 1 })
  })
}

export const settle = async (page: Page) => {
  await page.waitForLoadState('networkidle')
  await page.waitForFunction(() =>
    Array.from(document.images).every((image) => image.complete)
  )
  await page.clock.runFor(SETTLE_MS)
  await page.evaluate(async () => {
    await document.fonts.ready
  })
  await stopSliders(page)
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
    await page.clock.runFor(SETTLE_MS)
  }
}

export const scrollToTop = async (page: Page) => {
  await page.evaluate(() => {
    window.scrollTo(0, 0)
  })
  await page.clock.runFor(SETTLE_MS)
}
