import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { transparentize } from '@chakra-ui/theme-tools';

const primaryVariant = defineStyle(({ theme }) => ({
  border: '1px solid',
  borderColor: 'primary.400',
  color: 'primary.400',
  _hover: {
    bg: transparentize('primary.200', 0.12)(theme),
  },
}));

// const iconPrimaryVariant = defineStyle(({ theme }) => ({
//   color: 'primary.'
// }))

const buttonTheme = defineStyleConfig({
  variants: {
    primary: primaryVariant,
  },
});

export default buttonTheme;
