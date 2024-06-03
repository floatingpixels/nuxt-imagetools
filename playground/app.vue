<script setup lang="ts">
import pic_1 from '~/assets/living_sr_crop.png?imagetools'
// for specific image imports, you can also use the following syntax:
import pic_2 from '~/assets/living_sr_crop.png?w=640;768;1024;1280;1600&format=avif;webp&as=picture&aspect=1:1&imagetools'
console.log(pic_2)
</script>
<template>
  <div>
    <div>Image test</div>
    <div>
      <Image
        :picture="pic_1"
        alt="Picture One"
        sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 50vw, (min-width: 640px) 100vw, 100vw"
      />
      <Image
        :picture="pic_2"
        alt="Picture Two"
        sizes="(min-width: 1280px) 10vw, (min-width: 1024px) 50vw, (min-width: 640px) 100vw, 100vw"
      />
    </div>
  </div>
</template>
