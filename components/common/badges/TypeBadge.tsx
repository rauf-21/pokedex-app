import { useColorModeValue, Badge, BadgeProps } from '@chakra-ui/react';

import { PokemonOwnType } from '../../../lib/pokemon/types';

interface BaseTypeBadgeProps extends BadgeProps {
  type: PokemonOwnType;
  // eslint-disable-next-line react/require-default-props
  isSelected?: boolean;
}

export default function TypeBadge({
  type,
  isSelected = true,
  ...props
}: BaseTypeBadgeProps) {
  const color = useColorModeValue('white', 'black');
  const bg = {
    normal: '#a8a878',
    fighting: '#c03028',
    flying: '#e2e2e2',
    poison: '#a040a0',
    ground: '#e0c068',
    rock: '#b8a038',
    bug: '#a8b820',
    ghost: '#705898',
    steel: '#b8b8d0',
    fire: '#f08030',
    water: '#6890f0',
    grass: '#78c850',
    electric: '#f8d034',
    psychic: '#f85888',
    ice: '#98d8d8',
    dragon: '#723bf8',
    dark: '#705848',
    fairy: '#ee99ac',
  };

  return (
    <Badge
      variant='solid'
      bg={isSelected ? bg[type.type.name] : 'gray.900'}
      color={
        !isSelected ? 'white' : type.type.name === 'flying' ? 'black' : color
      }
      {...props}
    >
      {type.type.name}
    </Badge>
  );
}
