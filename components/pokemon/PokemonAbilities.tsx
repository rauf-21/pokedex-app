import { useState, useEffect } from 'react';
import { Flex, Button, Tooltip } from '@chakra-ui/react';

import { capitalize } from '../../lib/utils';
import { getPokemonAbility } from '../../lib/pokemon/pokedex';
import { PokemonAbility, PokemonOwnAbility } from '../../lib/pokemon/types';

interface PokemonAbilitiesProps {
  abilities: PokemonOwnAbility[];
}

interface PokemonAbilityProps {
  ability: PokemonOwnAbility;
}

function PokemonAbilityComponent({ ability }: PokemonAbilityProps) {
  const [abilityDetail, setAbilityDetail] = useState<PokemonAbility | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const currentAbilityDetail = await getPokemonAbility(
        ability.ability.name
      );

      setAbilityDetail(currentAbilityDetail);
    })();
  }, [ability]);

  return (
    <Tooltip
      label={
        abilityDetail === null
          ? 'Loading...'
          : abilityDetail.effect_entries.find(
              (effectEntry) => effectEntry.language.name === 'en'
            )!.short_effect
      }
      border='1px red'
      p={2}
      hasArrow
    >
      <Button
        size='sm'
        variant={ability.is_hidden ? 'primary' : 'outline'}
      >
        {capitalize(ability.ability.name)}
      </Button>
    </Tooltip>
  );
}

export default function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  return (
    <Flex
      gap={5}
      width={300}
      wrap='wrap'
    >
      {abilities.map((ability) => (
        <PokemonAbilityComponent
          key={ability.ability.name}
          ability={ability}
        />
      ))}
    </Flex>
  );
}
