<script setup lang="ts">
import type { Picture } from 'vite-imagetools'
// we want fallthrough attributes to be passed to the <img> tag, not the <picture> tag
// disabling inheritAttrs and manually binding $attrs to the <img> tag in the template
defineOptions({
  inheritAttrs: false,
})
const {
  picture,
  sizes,
  alt,
  loading = 'eager',
} = defineProps<{
  picture: Picture
  sizes: string
  alt?: string
  loading?: 'lazy' | 'eager'
}>()
</script>
<template>
  <picture>
    <source
      v-for="(srcset, format) in picture.sources"
      :key="format"
      :srcset="srcset"
      :type="'image/' + format"
      :sizes="sizes"
    />
    <img
      :src="picture.img.src"
      :alt="alt"
      :loading="loading"
      v-bind="$attrs"
    />
  </picture>
</template>
