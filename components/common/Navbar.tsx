import Link from 'next/link';
import { useColorModeValue, Flex, Button } from '@chakra-ui/react';

import ToggleColorModeButton from './ToggleColorModeButton';

export default function Navbar() {
  const bg = useColorModeValue('white', 'black');

  return (
    <Flex
      py={2}
      px={5}
      minW='100%'
      h='full'
      justifyContent='space-between'
      bg={bg}
      pos='sticky'
      top={0}
      zIndex={5}
      overflowX='hidden'
    >
      <Link
        href='/'
        shallow
      >
        <Button
          variant='ghost'
          fontWeight='bold'
        >
          Pokedex App
        </Button>
      </Link>
      <Flex>
        <ToggleColorModeButton />
      </Flex>
    </Flex>
  );
}
