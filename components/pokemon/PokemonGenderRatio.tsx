import { Flex, Progress, Text } from '@chakra-ui/react';

import { PokemonSpecies } from '../../lib/pokemon/types';
import ColorBox from '../common/ColorBox';

interface PokemonGenderRatioProps {
  genderRate: PokemonSpecies['gender_rate'];
}

export default function PokemonGenderRatio({
  genderRate,
}: PokemonGenderRatioProps) {
  const genderRatio = {
    male: 100 - (genderRate / 8) * 100,
    female: (genderRate / 8) * 100,
  };

  return (
    <Flex
      direction='column'
      gap={2}
    >
      <Progress
        minW={{
          base: 100,
          md: 200,
        }}
        w='100%'
        value={genderRatio.male}
        color='blue.500'
        bg='red.500'
      />
      <Flex direction='column'>
        <Flex
          alignItems='center'
          columnGap={2}
        >
          <ColorBox bg='blue.500' />
          <Text>Male ({genderRatio.male}%)</Text>
        </Flex>
        <Flex
          alignItems='center'
          columnGap={2}
        >
          <ColorBox bg='red.500' />
          <Text>Female ({genderRatio.female}%)</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
