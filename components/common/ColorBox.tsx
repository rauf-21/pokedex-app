import { BoxProps, Box } from '@chakra-ui/react';

interface ColorBoxProps extends BoxProps {}

export default function ColorBox({ bg, children, ...props }: ColorBoxProps) {
  return (
    <Box
      w={4}
      h={4}
      bg={bg}
      borderWidth={2}
      borderColor={bg === 'white' ? 'black' : bg === 'black' ? 'white' : 'none'}
      {...props}
    >
      {children}
    </Box>
  );
}
