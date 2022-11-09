import { useMemo } from 'react';
import {
  forwardRef,
  TextProps,
  chakra,
  Flex,
  Text,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';

import { capitalize } from '../../lib/utils';
import {
  PokemonGameVersion,
  PokemonEncounterDetail,
  PokemonVersionEncounterDetail,
  PokemonLocationAreaEncounter,
} from '../../lib/pokemon/types';

interface PokemonEncounterLocationsProps {
  pokemonLocationAreaEncounters: PokemonLocationAreaEncounter[];
}

type PokemonLocationAreaByVersion = {
  location_area: PokemonLocationAreaEncounter['location_area'];
} & PokemonVersionEncounterDetail;

const GAME_VERSION_ORDER = [
  'red',
  'green',
  'blue',
  'yellow',
  'gold',
  'silver',
  'crystal',
  'ruby',
  'sapphire',
  'emerald',
  'firered',
  'leafgreen',
  'diamond',
  'pearl',
  'platinum',
  'heartgold',
  'soulsilver',
  'black',
  'white',
  'black-2',
  'white-2',
  'x',
  'y',
  'sun',
  'moon',
  'ultra-sun',
  'ultra-moon',
];

function getEncounterMethodColor(method: string) {
  const encounterMethodColor = [
    ['walk', 'green.400'],
    ['gift', 'blue.400'],
    ['headbutt', 'orange.400'],
  ];

  return (
    encounterMethodColor.find(([currentMethod]) =>
      method.startsWith(currentMethod)
    )?.[1] ?? 'white'
  );
}

const PokemonEncounterType = forwardRef<
  TextProps & PokemonEncounterDetail,
  typeof Text
>(({ method, min_level, max_level, chance, ...props }, ref) => (
  <Text
    ref={ref}
    {...props}
  >
    <chakra.span
      fontWeight='semibold'
      color={getEncounterMethodColor(method.name)}
    >
      [{method.name.toUpperCase()}]
    </chakra.span>{' '}
    Lv.
    {min_level === max_level
      ? min_level
      : `${min_level}-${max_level}`} with {chance}% chance
  </Text>
));

export default function PokemonEncounterLocations({
  pokemonLocationAreaEncounters,
}: PokemonEncounterLocationsProps) {
  const pokemonLocationAreaByVersion = useMemo(
    () =>
      pokemonLocationAreaEncounters.reduce(
        (acc, pokemonLocationAreaEncounter) => {
          pokemonLocationAreaEncounter.version_details.forEach(
            (versionDetail, index) => {
              const pokemonLocationAreaByVersion: PokemonLocationAreaByVersion =
                {
                  location_area: pokemonLocationAreaEncounter.location_area,
                  ...pokemonLocationAreaEncounter.version_details[index],
                };

              acc[versionDetail.version.name] = [
                ...(acc[versionDetail.version.name] ?? []),
                pokemonLocationAreaByVersion,
              ];
            }
          );

          return acc;
        },
        {} as { [V in PokemonGameVersion]: PokemonLocationAreaByVersion[] }
      ),
    [pokemonLocationAreaEncounters]
  );

  return (
    <Flex>
      {pokemonLocationAreaEncounters.length === 0 ? (
        <Text textAlign='center'>None</Text>
      ) : (
        <TableContainer
          mx={20}
          w={{
            base: '90vw',
            md: '80vw',
          }}
        >
          <Table>
            <Tbody>
              {Object.entries(pokemonLocationAreaByVersion)
                .sort(
                  ([a], [b]) =>
                    GAME_VERSION_ORDER.indexOf(a) -
                    GAME_VERSION_ORDER.indexOf(b)
                )
                .map(([versionName, locationArea]) => (
                  <Tr key={versionName}>
                    <Th>{versionName}</Th>
                    <Td>
                      <Accordion
                        w='full'
                        boxSizing='border-box'
                        defaultIndex={[]}
                        allowMultiple
                      >
                        {locationArea.map((area) => (
                          <AccordionItem key={area.location_area.name}>
                            <AccordionButton>
                              <Text
                                w='full'
                                textAlign='left'
                                fontWeight='semibold'
                              >
                                {capitalize(
                                  area.location_area.name
                                    .replace(
                                      /kanto|johto|hoenn|sinnoh|unova|kalos|area|[-]/gi,
                                      ' '
                                    )
                                    .trim()
                                )}
                              </Text>
                              <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel w={100}>
                              {area.encounter_details.map(
                                (encounterDetail, index) => (
                                  <PokemonEncounterType
                                    key={`${encounterDetail.method}${index}`}
                                    {...encounterDetail}
                                  />
                                )
                              )}
                            </AccordionPanel>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Flex>
  );
}
