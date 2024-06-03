import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import eslintConfigPrettier from 'eslint-config-prettier'

export default createConfigForNuxt({})
  .override('nuxt/vue/rules', {
    rules: {
      'vue/no-setup-props-destructure': 'off',
      'vue/multi-word-component-names': 'off',
    },
  })
  .append(eslintConfigPrettier)
  .append({
    ignores: [],
  })
