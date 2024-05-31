<script setup lang="ts">
import pic from '~/assets/test.png?imagetools'
</script>
<template>
  <div>
    <div>
      <Image
        :picture="pic"
        alt="Picture with default settings"
        sizes="100vw"
      />
    </div>
  </div>
</template>
