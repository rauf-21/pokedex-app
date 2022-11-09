import {
  useColorModeValue,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
} from '@chakra-ui/react';

import TypeBadge from '../common/badges/TypeBadge';
import {
  Type,
  NameWithURL,
  PokemonType,
  TypeRelations,
} from '../../lib/pokemon/types';

interface PokemonDamageTakenProps {
  pokemonTypes: Type[];
}

const TYPE_ORDER = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
];

export default function PokemonDamageTakenEffectiveness({
  pokemonTypes,
}: PokemonDamageTakenProps) {
  const pokemonDamageTakenEffectivenessEntries = pokemonTypes.map((type) =>
    Object.entries(type.damage_relations)
  ) as [keyof TypeRelations, NameWithURL<PokemonType>[]][][];

  const pokemonDamageTakenEffectiveness = Object.entries(
    pokemonDamageTakenEffectivenessEntries.reduce(
      (acc, damage_relations) =>
        damage_relations.reduce(
          (prevAcc, [damage_relation, typeInfo]) =>
            typeInfo.reduce((prev2Acc, type) => {
              switch (damage_relation) {
                case 'half_damage_from':
                  return {
                    ...prev2Acc,
                    [type.name]:
                      prev2Acc[type.name] === 0
                        ? 0
                        : prev2Acc[type.name] === 1
                        ? -2
                        : prev2Acc[type.name] - 2 === 0
                        ? 1
                        : prev2Acc[type.name] - 2,
                  };
                case 'no_damage_from':
                  return {
                    ...prev2Acc,
                    [type.name]: 0,
                  };
                case 'double_damage_from':
                  return {
                    ...prev2Acc,
                    [type.name]:
                      prev2Acc[type.name] === 0
                        ? 0
                        : prev2Acc[type.name] === 1
                        ? 2
                        : prev2Acc[type.name] + 2 === 0
                        ? 1
                        : prev2Acc[type.name] + 2,
                  };
                default:
                  return prev2Acc;
              }
            }, prevAcc),
          acc
        ),
      {
        normal: 1,
        fighting: 1,
        flying: 1,
        poison: 1,
        ground: 1,
        rock: 1,
        bug: 1,
        ghost: 1,
        steel: 1,
        fire: 1,
        water: 1,
        grass: 1,
        electric: 1,
        psychic: 1,
        ice: 1,
        dragon: 1,
        dark: 1,
        fairy: 1,
      } as { [V in PokemonType]: number }
    )
  ).sort(
    (a, b) =>
      TYPE_ORDER.indexOf(Object.keys(a)[0]) -
      TYPE_ORDER.indexOf(Object.keys(b)[0])
  );

  const damageTakenTextColor = useColorModeValue('black', 'white');

  const damageTakenMultiplierBg: { [key: string]: string } = {
    '1': useColorModeValue('white', 'gray.900'),
    '2': 'green.500',
    '4': 'green.500',
    '0': 'black',
    '-2': 'red.600',
    '-4': 'red.900',
  };

  return (
    <Flex
      w={{
        base: '95vw',
        md: '80vw',
      }}
    >
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              {TYPE_ORDER.map((type, index) => (
                <Th
                  key={`${type}${index}`}
                  borderWidth={2}
                  p={0}
                  w='fit-content'
                >
                  <TypeBadge
                    w='full'
                    p={2}
                    textAlign='center'
                    type={{
                      type: { name: type as PokemonType, url: '' },
                      slot: 1,
                    }}
                  />
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              {pokemonDamageTakenEffectiveness.map(
                ([typeName, damageTakenMultiplier]) => (
                  <Td
                    key={`${typeName}-effectiveness`}
                    borderWidth={2}
                    bg={
                      damageTakenMultiplierBg[
                        damageTakenMultiplier.toString()
                      ] ?? 'gray.900'
                    }
                  >
                    <Text
                      w='full'
                      textAlign='center'
                      fontWeight='bold'
                      color={
                        damageTakenMultiplier < 1 || damageTakenMultiplier > 1
                          ? 'white'
                          : damageTakenTextColor
                      }
                    >
                      {Math.sign(damageTakenMultiplier) < 0
                        ? `1/${Math.abs(damageTakenMultiplier)}`
                        : damageTakenMultiplier}
                    </Text>
                  </Td>
                )
              )}
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
