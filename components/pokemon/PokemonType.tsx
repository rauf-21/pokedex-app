import { Flex } from '@chakra-ui/react';

import { PokemonOwnType } from '../../lib/pokemon/types';
import TypeBadge from '../common/badges/TypeBadge';

interface PokemonTypeProps {
  types: PokemonOwnType[];
}

export default function PokemonType({ types }: PokemonTypeProps) {
  return (
    <Flex
      width='fit-content'
      justifyContent='space-evenly'
      columnGap={2}
    >
      {types.map((typeInfo) => (
        <TypeBadge
          key={typeInfo.type.name}
          type={typeInfo}
        />
      ))}
    </Flex>
  );
}
