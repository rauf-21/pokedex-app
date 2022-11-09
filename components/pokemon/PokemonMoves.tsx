import { useEffect, useState, useMemo } from 'react';
import {
  Flex,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  Tr,
} from '@chakra-ui/react';

import PokemonType from './PokemonType';
import {
  PokemonOwnMove,
  PokemonOwnMoveDetail,
  PokemonMoveVersionGroup,
  PokemonGameSeries,
  MoveLearnMethod,
} from '../../lib/pokemon/types';
import usePokemonGameSeriesStore from '../../stores/pokemon-game-series-store';
import { getPokemonMove } from '../../lib/pokemon/pokedex';
import { capitalize, kebabCaseToNormal } from '../../lib/utils';
import MoveCategoryBadge from '../common/badges/MoveCategoryBadge';
import PokemonGameSeriesSelectMenu from '../common/select/PokemonGameSeriesSelectMenu';

interface PokemonOwnMoveShortDetail
  extends Pick<
    PokemonMoveVersionGroup,
    'level_learned_at' | 'move_learn_method'
  > {
  move: PokemonOwnMove['move'];
}

interface PokemonMovesProps {
  moves: PokemonOwnMove[];
}

interface PokemonMoveTableProps {
  pokemonOwnMoveShortDetails: PokemonOwnMoveShortDetail[];
}

const MOVE_LEARN_METHOD_ORDER: MoveLearnMethod[] = [
  'level-up',
  'egg',
  'machine',
  'tutor',
];

function PokemonMoveTable({
  pokemonOwnMoveShortDetails,
}: PokemonMoveTableProps) {
  const [pokemonOwnMoveDetails, setPokemonOwnMoveDetails] = useState<
    PokemonOwnMoveDetail[] | null
  >(null);

  useEffect(() => {
    (async () => {
      const newPokemonOwnMoveDetails = await Promise.all(
        pokemonOwnMoveShortDetails.map(async (pokemonOwnMoveShortDetail) => {
          const { move, level_learned_at, move_learn_method } =
            pokemonOwnMoveShortDetail;
          const {
            name,
            accuracy,
            power,
            pp,
            damage_class,
            effect_entries,
            type,
          } = await getPokemonMove(move.name);

          return {
            level_learned_at,
            move_learn_method,
            name,
            accuracy,
            power,
            pp,
            damage_class,
            type,
            effect_entries: effect_entries.find(
              (effectEntry) => effectEntry.language.name === 'en'
            )!,
          };
        })
      );

      setPokemonOwnMoveDetails(
        newPokemonOwnMoveDetails.sort(
          (a, b) => a.level_learned_at - b.level_learned_at
        )
      );
    })();
  }, [pokemonOwnMoveShortDetails]);

  return (
    <TableContainer
      w={{
        base: '95vw',
        md: '80vw',
      }}
      minH='100vh'
    >
      <Table>
        <Thead>
          <Tr>
            <Th w='min'>Level</Th>
            <Th>Class</Th>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Power</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pokemonOwnMoveDetails === null ? (
            <Tr aria-rowspan={5}>
              <Td>Loading....</Td>
            </Tr>
          ) : (
            pokemonOwnMoveDetails.map((pokemonOwnMoveDetail, index) => (
              <Tr
                key={`${pokemonOwnMoveDetail.name}${pokemonOwnMoveDetail.level_learned_at}${index}`}
                _hover={{
                  bg: 'gray.100',
                  cursor: 'pointer',
                  _dark: {
                    bg: 'gray.900',
                  },
                }}
              >
                <Td>{pokemonOwnMoveDetail.level_learned_at}</Td>
                <Td>
                  <MoveCategoryBadge
                    moveCategory={pokemonOwnMoveDetail.damage_class.name}
                  />
                </Td>
                <Td>
                  {capitalize(kebabCaseToNormal(pokemonOwnMoveDetail.name))}
                </Td>
                <Td>
                  <PokemonType
                    types={[{ type: pokemonOwnMoveDetail.type, slot: 1 }]}
                  />
                </Td>
                <Td>{pokemonOwnMoveDetail.power ?? '-'}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default function PokemonMoves({ moves }: PokemonMovesProps) {
  const { currentPokemonGameSeries } = usePokemonGameSeriesStore();
  const groupedPokemonOwnMoveShortDetails = useMemo(
    () =>
      moves.reduce(
        (acc, { move, version_group_details }) =>
          version_group_details.reduce(
            (acc, { level_learned_at, move_learn_method, version_group }) => {
              const pokemonOwnMoveShortDetail: PokemonOwnMoveShortDetail = {
                move,
                level_learned_at,
                move_learn_method,
              };

              if (
                Object.hasOwn(acc, version_group.name) &&
                Object.hasOwn(acc[version_group.name], move_learn_method.name)
              ) {
                return {
                  ...acc,
                  [version_group.name]: {
                    ...acc[version_group.name],
                    [move_learn_method.name]: [
                      ...acc[version_group.name][move_learn_method.name],
                      pokemonOwnMoveShortDetail,
                    ],
                  },
                };
              }

              return {
                ...acc,
                [version_group.name]: {
                  ...acc[version_group.name],
                  [move_learn_method.name]: [pokemonOwnMoveShortDetail],
                },
              };
            },
            acc
          ),
        {} as {
          [V in PokemonGameSeries]: {
            [VV in MoveLearnMethod]: PokemonOwnMoveShortDetail[];
          };
        }
      ),
    [moves]
  );

  return (
    <Flex
      w={{
        base: '95vw',
        md: '80vw',
      }}
      direction='column'
      rowGap={5}
    >
      {groupedPokemonOwnMoveShortDetails[currentPokemonGameSeries] ===
      undefined ? (
        <Text
          w='full'
          textAlign='center'
        >
          None
        </Text>
      ) : (
        <>
          <PokemonGameSeriesSelectMenu />
          <Tabs
            w='full'
            variant='enclosed'
          >
            <TabList>
              {Object.entries(
                groupedPokemonOwnMoveShortDetails[currentPokemonGameSeries]
              )
                .sort(
                  ([a], [b]) =>
                    MOVE_LEARN_METHOD_ORDER.indexOf(a as MoveLearnMethod) -
                    MOVE_LEARN_METHOD_ORDER.indexOf(b as MoveLearnMethod)
                )
                .map(([moveLearnMethod]) => (
                  <Tab key={moveLearnMethod}>
                    {capitalize(kebabCaseToNormal(moveLearnMethod))}
                  </Tab>
                ))}
            </TabList>
            <TabPanels>
              {Object.entries(
                groupedPokemonOwnMoveShortDetails[currentPokemonGameSeries]
              )
                .sort(
                  ([a], [b]) =>
                    MOVE_LEARN_METHOD_ORDER.indexOf(a as MoveLearnMethod) -
                    MOVE_LEARN_METHOD_ORDER.indexOf(b as MoveLearnMethod)
                )
                .map(([key, pokemonOwnMoveShortDetails]) => (
                  <TabPanel key={key}>
                    <PokemonMoveTable
                      pokemonOwnMoveShortDetails={pokemonOwnMoveShortDetails}
                    />
                  </TabPanel>
                ))}
            </TabPanels>
          </Tabs>
        </>
      )}
    </Flex>
  );
}
