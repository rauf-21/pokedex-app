import {
  TableContainer,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
} from '@chakra-ui/react';

import PokemonGenderRatio from './PokemonGenderRatio';
import { Pokemon, PokemonSpecies } from '../../lib/pokemon/types';
import { capitalize } from '../../lib/utils';
import PokemonType from './PokemonType';
import PokemonAbilities from './PokemonAbilities';
import ColorBox from '../common/ColorBox';
import PokemonEVYield from './PokemonEVYield';

interface PokemonBaseInformationProps {
  pokemonBaseInformation: Pokemon & PokemonSpecies;
}

export default function PokemonBaseInformation({
  pokemonBaseInformation,
}: PokemonBaseInformationProps) {
  return (
    <TableContainer
      w={{
        base: '95vw',
        md: 'fit-content',
      }}
    >
      <Table>
        <Tbody>
          <Tr>
            <Th>Type</Th>
            <Td w='full'>
              <PokemonType types={pokemonBaseInformation.types} />
            </Td>
          </Tr>
          <Tr>
            <Th>Abilities</Th>
            <Td w='full'>
              <PokemonAbilities abilities={pokemonBaseInformation.abilities} />
            </Td>
          </Tr>
          <Tr>
            <Th>Gender ratio</Th>
            <Td w='full'>
              <PokemonGenderRatio
                genderRate={pokemonBaseInformation.gender_rate}
              />
            </Td>
          </Tr>
          <Tr>
            <Th>Capture rate</Th>
            <Td w='full'>
              <Text>{pokemonBaseInformation.capture_rate}</Text>
            </Td>
          </Tr>
          <Tr>
            <Th>Egg Group</Th>
            <Td w='full'>
              <Text>
                {pokemonBaseInformation.egg_groups
                  .map(({ name }) => capitalize(name))
                  .join(',')}
              </Text>
            </Td>
          </Tr>
          <Tr>
            <Th>Hatch Counter</Th>
            <Td w='full'>
              <Text>{pokemonBaseInformation.hatch_counter}</Text>
            </Td>
          </Tr>
          <Tr>
            <Th>Height</Th>
            <Td w='full'>
              {(pokemonBaseInformation.height * 0.1).toFixed(1)} m
            </Td>
          </Tr>
          <Tr>
            <Th>Weight</Th>
            <Td w='full'>
              {(pokemonBaseInformation.weight * 0.1).toFixed(1)} kg
            </Td>
          </Tr>
          <Tr>
            <Th>Base Experience</Th>
            <Td w='full'>{pokemonBaseInformation.base_experience}</Td>
          </Tr>
          <Tr>
            <Th>Base Happiness</Th>
            <Td w='full'>{pokemonBaseInformation.base_happiness}</Td>
          </Tr>
          <Tr>
            <Th>Growth Rate</Th>
            <Td w='full'>
              {capitalize(pokemonBaseInformation.growth_rate.name)}
            </Td>
          </Tr>
          <Tr>
            <Th>EV Yield</Th>
            <Td w='full'>
              <PokemonEVYield stats={pokemonBaseInformation.stats} />
            </Td>
          </Tr>
          <Tr>
            <Th>Color</Th>
            <Td w='full'>
              <Flex
                direction='row'
                columnGap={2}
              >
                <ColorBox bg={pokemonBaseInformation.color.name} />
                <Text>{capitalize(pokemonBaseInformation.color.name)}</Text>
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
