import { extendTheme } from '@chakra-ui/react';

import inputTheme from './components/input';
import buttonTheme from './components/button';
import progressTheme from './components/progress';

const theme = extendTheme({
  // styles: {
  //   global: {
  //     'html, body': {
  //       overflowX: 'hidden',
  //     },
  //   },
  // },
  initialColorMode: 'dark',
  fonts: {
    body: `'Montserrat', sans-serif`,
  },
  colors: {
    primary: {
      100: '#fadbd8',
      200: '#f5b7b1',
      300: '#f1948a',
      400: '#ec7063',
      500: '#e74c3c',
      600: '#b93d30',
      700: '#8b2e24',
      800: '#5c1e18',
      900: '#2e0f0c',
    },
  },
  components: {
    Input: inputTheme,
    Button: buttonTheme,
    Progress: progressTheme,
  },
});

export default theme;
