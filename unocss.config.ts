import { defineConfig, presetUno } from 'unocss';
import transformerDirective from '@unocss/transformer-directives';

export default defineConfig({
  variants: [
    (matcher) => {
      if (!matcher.startsWith('!')) return matcher;
      return {
        matcher: matcher.slice(2),
        body: (body) => {
          body.forEach((v) => {
            if (v[1]) v[1] += ' !important';
          });
          return body;
        },
      };
    },
  ],
  shortcuts: [['flex-center', 'flex justify-center items-center']],
  presets: [presetUno()],
  transformers: [transformerDirective()],
});
