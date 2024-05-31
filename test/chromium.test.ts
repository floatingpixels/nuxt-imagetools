import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, createPage, url } from '@nuxt/test-utils/e2e'

describe('imagetools', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    browser: true,
    browserOptions: {
      type: 'chromium',
      launch: {
        headless: true,
        args: ['--no-sandbox'],
      },
    },
  })

  let page = await createPage()

  it('creates the right sourcemaps for the default settings', async () => {
    // Check if the image's picture element contains the expected source tags
    await page.goto(url('/default_100vw'))
    const picSources = await page.$$eval('picture:nth-child(1) source', sources =>
      sources.map(source => ({
        type: source.getAttribute('type'),
        srcset: source.getAttribute('srcset'),
      })),
    )
    // Validate the sources (checking different resolutions and formats)
    expect(picSources).toContainEqual(
      expect.objectContaining({
        type: 'image/avif',
        srcset: expect.stringContaining('640w'),
      }),
    )
    expect(picSources).toContainEqual(
      expect.objectContaining({
        type: 'image/webp',
        srcset: expect.stringContaining('640w'),
      }),
    )
    expect(picSources).toContainEqual(
      expect.objectContaining({
        type: 'image/avif',
        srcset: expect.stringContaining('768w'),
      }),
    )
    expect(picSources).toContainEqual(
      expect.objectContaining({
        type: 'image/webp',
        srcset: expect.stringContaining('768w'),
      }),
    )
    expect(picSources).toContainEqual(
      expect.objectContaining({
        type: 'image/avif',
        srcset: expect.stringContaining('1024w'),
      }),
    )
    expect(picSources).toContainEqual(
      expect.objectContaining({
        type: 'image/webp',
        srcset: expect.stringContaining('1024w'),
      }),
    )
    expect(picSources).toContainEqual(
      expect.objectContaining({
        type: 'image/avif',
        srcset: expect.stringContaining('1280w'),
      }),
    )
    expect(picSources).toContainEqual(
      expect.objectContaining({
        type: 'image/webp',
        srcset: expect.stringContaining('1280w'),
      }),
    )
    expect(picSources).toContainEqual(
      expect.objectContaining({
        type: 'image/avif',
        srcset: expect.stringContaining('1600w'),
      }),
    )
    expect(picSources).toContainEqual(
      expect.objectContaining({
        type: 'image/webp',
        srcset: expect.stringContaining('1600w'),
      }),
    )
    expect(picSources).toContainEqual(
      expect.objectContaining({
        type: 'image/avif',
        srcset: expect.stringContaining('1920w'),
      }),
    )
    expect(picSources).toContainEqual(
      expect.objectContaining({
        type: 'image/webp',
        srcset: expect.stringContaining('1920w'),
      }),
    )
  })

  it('sets the image width to 100% of the viewport width', async () => {
    await page.goto(url('/default_100vw'))

    const viewportWidth = await page.evaluate(() => window.innerWidth)
    const pictureWidth = await page.evaluate(() => document.querySelector('picture')?.getBoundingClientRect().width)
    expect(pictureWidth).greaterThan(0)
    expect(pictureWidth).toBe(viewportWidth)
  })

  it('changes image on resize', async () => {
    // Navigate to the page
    await page.goto(url('/default_100vw'))

    // get the srcset attribute and parse it to with and url
    const srcset = await page.$eval('picture:nth-child(1) source', source => source.getAttribute('srcset'))
    expect(srcset).not.toBeNull()

    let sources = srcset!.split(',').map(src => {
      const [url, size] = src.trim().split(' ')
      return { url, width: parseInt(size.replace('w', '')) }
    })
    sources = sources.filter(src => src.url.includes('.avif'))
    expect(sources.length).toBe(6)

    const devicePixelRatio = 2 //await page.evaluate(() => window.devicePixelRatio)

    for (const { width, url } of sources) {
      const adjustedWidth = Math.round(width / devicePixelRatio)

      await page.setViewportSize({ width: adjustedWidth, height: 1600 })
      // await page.waitForTimeout(5000)

      await page.waitForSelector('picture:nth-child(1) img')
      // Wait for the image to load
      await page.waitForFunction(() => {
        const img = document.querySelector('picture:nth-child(1) img') as HTMLImageElement
        return img && img.complete && img.currentSrc
      })

      const currentSrc = await page.evaluate(() => {
        const img = document.querySelector('picture:nth-child(1) img') as HTMLImageElement
        return img.currentSrc
      })

      // Normalize URLs to absolute URLs
      const absoluteUrl = new URL(url, page.url()).href

      // Check if current src is not null and contains the expected source
      expect(currentSrc).not.toBeNull()
      expect(currentSrc).toMatch(absoluteUrl)
    }
  })
})
