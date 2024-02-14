import { defineNuxtModule, createResolver, addComponent, extendViteConfig, addTypeTemplate } from '@nuxt/kit'
import { imagetools } from 'vite-imagetools'

// Module options TypeScript interface definition
type ImageFormat = 'gvheic' | 'heif' | 'avif' | 'jpeg' | 'jpg' | 'png' | 'tiff' | 'webp' | 'gif'
export interface ModuleOptions {
  /**
   * Formats to generate
   * @default ['avif', 'webp']
   * @type ImageFormat[] - heic | heif | avif | jpeg | jpg | png | tiff | webp | gif
   * @docs https://github.com/JonasKruckenberg/imagetools/blob/main/docs/directives.md#format
   */
  formats: ImageFormat[]
  /**
   * Quality of the generated images (0-100)
   * @default 85
   * @type number
   * @docs https://github.com/JonasKruckenberg/imagetools/blob/main/docs/directives.md#quality
   */
  quality: number
  /**
   * Resizes the image to be the specified amount of pixels wide. If not given the height will be scaled accordingly.
   * @default [640, 768, 1024, 1280, 1600, 1920]
   * @type number[]
   * @docs https://github.com/JonasKruckenberg/imagetools/blob/main/docs/directives.md#width
   */
  widths: number[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-imagetools',
    configKey: 'imagetools',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    widths: [640, 768, 1024, 1280, 1600, 1920],
    formats: ['avif', 'webp'],
    quality: 85,
  },
  setup(options) {
    // @ts-ignore
    const { resolve } = createResolver(import.meta.url)

    addComponent({
      name: 'Image',
      filePath: resolve('./runtime/components/image.vue'),
    })

    extendViteConfig(config => {
      config.plugins.push(
        imagetools({
          defaultDirectives: url => {
            if (url.searchParams.size !== 1) return url.searchParams
            return new URLSearchParams({
              w: options.widths.join(';'),
              format: options.formats.join(';'),
              quality: options.quality.toString(),
              as: 'picture',
            })
          },
        }),
      )
    })

    addTypeTemplate({
      filename: 'imagetools.d.ts',
      getContents: () => `
declare module '*imagetools' {
  /**
   * - code https://github.com/JonasKruckenberg/imagetools/blob/main/packages/core/src/output-formats.ts
   * - docs https://github.com/JonasKruckenberg/imagetools/blob/main/docs/guide/getting-started.md#metadata
   */
  import type { Picture } from 'vite-imagetools'
  const out: Picture
  export default out
}
    `,
    })
  },
})
