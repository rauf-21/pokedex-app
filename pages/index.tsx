import { Flex, Text, Heading, VStack } from '@chakra-ui/react';

import PokemonSearchInput from '../components/common/input/PokemonSearchInput';
import Pokedex from '../components/Pokedex';

export default function HomePage() {
  return (
    <Flex
      w='100%'
      rowGap={10}
      direction='column'
      justifyContent='flex-start'
      alignItems='center'
      overflowX='hidden'
    >
      <VStack m={5}>
        <Heading textAlign='center'>
          Welcome to{' '}
          <Text
            display={{
              base: 'block',
              md: 'inline',
            }}
            color='primary.500'
          >
            Pokedex App
          </Text>
        </Heading>
        <Text align='center'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus,
          perspiciatis.
        </Text>
      </VStack>
      <PokemonSearchInput />
      <Pokedex />
    </Flex>
  );
}
