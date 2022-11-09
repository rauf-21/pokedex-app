import {
  Stack,
  Progress,
  Table,
  TableContainer,
  Tbody,
  Th,
  Tr,
  Td,
} from '@chakra-ui/react';

import { PokemonStat } from '../../lib/pokemon/types';

interface PokemonStatsProps {
  stats: PokemonStat[];
}

export default function PokemonStats({ stats }: PokemonStatsProps) {
  function getStatColorScheme(stat: number) {
    const statColors: [number, string][] = [
      [0, 'red.500'],
      [50, 'orange.500'],
      [100, 'yellow.500'],
      [120, 'green.500'],
      [150, 'blue.500'],
    ];

    return statColors.reduce(
      (currentColor, [minStat, color]) =>
        stat >= minStat ? color : currentColor,
      'red'
    );
  }

  return (
    <TableContainer
      w={{
        base: '95vw',
        md: 'fit-content',
      }}
    >
      <Table>
        <Tbody>
          {stats.map((stat) => (
            <Tr key={stat.stat.name}>
              <Th>{stat.stat.name}</Th>
              <Td w='fit-content'>{stat.base_stat}</Td>
              <Td w='full'>
                <Stack
                  direction='row'
                  alignItems='center'
                >
                  <Progress
                    minW={{
                      base: 100,
                      md: 200,
                    }}
                    w='100%'
                    max={300}
                    color={getStatColorScheme(stat.base_stat)}
                    key={stat.stat.name}
                    value={stat.base_stat}
                  />
                </Stack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
