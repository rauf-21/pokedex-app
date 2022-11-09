import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
// import { mode } from '@chakra-ui/theme-tools';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const primaryVariant = definePartsStyle({
  field: {
    border: '1px solid',
    bg: 'none',
    borderColor: 'primary.400',
  },
});

const inputTheme = defineMultiStyleConfig({
  variants: {
    primary: primaryVariant,
  },
});

export default inputTheme;
