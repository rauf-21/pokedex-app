import { progressAnatomy } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(progressAnatomy.keys);

const baseStyleFilledTrack = defineStyle((props) => {
  const { color } = props;

  return {
    bgColor: color,
  };
});

const baseStyle = definePartsStyle((props) => ({
  filledTrack: baseStyleFilledTrack(props),
}));

const progressTheme = defineMultiStyleConfig({
  baseStyle,
});

export default progressTheme;
