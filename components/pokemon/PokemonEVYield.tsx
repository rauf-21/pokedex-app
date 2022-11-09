import { useColorModeValue, Flex, Text } from '@chakra-ui/react';

import { PokemonStat } from '../../lib/pokemon/types';
import { capitalize } from '../../lib/utils';

interface PokemonEVYieldProps {
  stats: PokemonStat[];
}

interface PokemonEVProps {
  stat: PokemonStat;
}

function PokemonEV({ stat }: PokemonEVProps) {
  const color = useColorModeValue('white', 'black');
  const statColor: { [key: string]: string } = {
    'hp': 'red.500',
    'attack': 'orange.400',
    'defense': 'yellow.400',
    'special-attack': 'blue.500',
    'special-defense': 'green.500',
    'speed': 'red.400',
  };

  return (
    <Flex
      w={100}
      p={2}
      direction='column'
      alignItems='center'
      bg={statColor[stat.stat.name]}
      color={color}
      rounded='md'
      mx={1}
      wrap='wrap'
      justifyContent='space-between'
    >
      <Text
        my='auto'
        fontWeight='semibold'
        wordBreak='break-word'
        whiteSpace='normal'
        textAlign='center'
      >
        {capitalize(stat.stat.name.replace(/-/gi, ' '))}
      </Text>
      <Text fontWeight='bold'>{stat.effort}</Text>
    </Flex>
  );
}

export default function PokemonEVYield({ stats }: PokemonEVYieldProps) {
  return (
    <Flex>
      {stats
        .filter(({ effort }) => effort !== 0)
        .map((stat) => (
          <PokemonEV
            key={`ev-yield-${stat.stat.name}`}
            stat={stat}
          />
        ))}
    </Flex>
  );
}
