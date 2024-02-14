# Nuxt Imagetools

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt module for image manipulation and optimization. You simply put high-quality images in the assets folder, and import them in your pages and components. Optimized renditions are automatically generated during build-time, and an image component automatically uses the right, optimized image for each browser and resolution in runtime.

This module is a wrapper around [sharp](https://sharp.pixelplumbing.com/) and [imagetools](https://github.com/JonasKruckenberg/imagetools).

[✨ &nbsp;Release Notes](/CHANGELOG.md)

## Features

- **⚡️ Ready-to-use image component**
- **📦 Automatic image optimization**
- **🚀 Output modern formats**
- **🖼 Resize Images**
- **🔍 Image lazy loading**
- **📏 Image aspect ratio**
- **📐 Image cropping**
- **🔒 Remove Image Metadata**

Optimizing your images by hand is a tedious and error-prone process: Opening the image in Photoshop, naming and exporting each image individually, and then reference everything correctly in the HTML.
This is where imagetools comes to the rescue: simply reference your image in code, specify the needed transformations and imagetools will take care of the rest! All this happens during build-time, so your users will only download the optimized images.

To get started quickly, a sensible default configuration is provided. It generates `webp` and `avif` renditions in common browser resolutions for each image, and automatically generates a sourcemap that can be used in the provided Image component. This component selects the right image for each browser and resolution using the standard HTML [picture](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) element.

```vue
<script setup lang="ts">
// simply import your images and add ?imagetools to the end of the path
import pic_1 from '~/assets/living_sr_crop.png?imagetools'
</script>
<template>
  <div>
    <Image
      :picture="pic_1"
      alt="Picture One"
      sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 50vw, (min-width: 640px) 100vw, 100vw"
    />
  </div>
</template>
```

The `sizes` attribute is used to specify the size of the image at different screen sizes. The browser will select the right image for the current screen size and resolution based on what you define here. The `picture` attribute is used to specify the image to be displayed. The `alt` attribute is used to specify the alternative text for the image.

The above defaults are only trying to cover the most common use case. You can also customize the defaults, or generate different formats, sizes, aspect ratios and outputs and use them in whatever way you like.

## Quick Setup

1. Add `nuxt-imagetools` to your project

```bash
# Using pnpm
pnpm add -D floatingpixels/nuxt-imagetools

# Using yarn
yarn add --dev floatingpixels/nuxt-imagetools

# Using npm
npm install --save-dev floatingpixels/nuxt-imagetools
```

2. Add `nuxt-imagetools` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ['floatingpixels/nuxt-imagetools'],
})
```

That's it! You can now use imagetools in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/my-module/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/my-module
[npm-downloads-src]: https://img.shields.io/npm/dm/my-module.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/my-module
[license-src]: https://img.shields.io/npm/l/my-module.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/my-module
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
