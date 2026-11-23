import type { Metadata } from 'next'

const SITE_URL = 'https://wrkload.vercel.app'

export const DESCRIPTION =
  "wrkload is a web app where you can track what you've worked on in a simple and organized way."

const OPEN_GRAPH = {
  description: DESCRIPTION,
  siteName: 'wrkload',
  locale: 'en-US',
  images: [`${SITE_URL}/images/og.jpg`],
  type: 'website' as const
}

export const pageMetadata = (title: string, path?: string): Metadata => ({
  title,
  openGraph: {
    ...OPEN_GRAPH,
    title,
    ...(path === undefined ? {} : { url: `${SITE_URL}${path}` })
  }
})
