import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useColorModeValue, Flex, Text } from '@chakra-ui/react';
import { VscClose } from 'react-icons/vsc';

import { PokemonVariety, PokemonShortInfo } from '../../lib/pokemon/types';
import { capitalizeEachWord, kebabCaseToNormal } from '../../lib/utils';
import {
  getPokemonShortInfo,
  extractIdFromUrl,
} from '../../lib/pokemon/pokedex';

interface PokemonVarietiesProps {
  pokemonVarieties: PokemonVariety[];
}

interface PokemonVarietyProps {
  pokemonVariety: PokemonVariety;
}

function PokemonVarietyComponent({ pokemonVariety }: PokemonVarietyProps) {
  const bg = useColorModeValue('gray.200', 'gray.900');
  const router = useRouter();
  const [currentEntryNumber, setCurrentEntryNumber] = useState<number>();
  const [currentPokemonVariety, setCurrentPokemonVariety] =
    useState<PokemonShortInfo | null>(null);

  useEffect(() => {
    if (router.isReady) {
      (async () => {
        const pokemonVarietyId = extractIdFromUrl(pokemonVariety.pokemon.url);
        const newPokemonVariety = await getPokemonShortInfo(pokemonVarietyId);

        setCurrentPokemonVariety(newPokemonVariety);
        setCurrentEntryNumber(parseInt(router.query.entryNumber as string, 10));
      })();
    }
  }, [router, pokemonVariety]);

  return currentPokemonVariety !== null ? (
    <Flex
      as={Link}
      href={{
        pathname: '/pokemon/[entryNumber]',
        query: {
          entryNumber: currentPokemonVariety.entry_number,
        },
      }}
      w='max-content'
      py={8}
      px={5}
      columnGap={5}
      direction='column'
      justifyContent='flex-start'
      alignItems='center'
      cursor='pointer'
      rounded='md'
      _hover={{
        bg,
      }}
    >
      {currentPokemonVariety.sprite ? (
        <Image
          alt={currentPokemonVariety.name}
          src={currentPokemonVariety.sprite ?? ''}
          width={100}
          height={100}
          quality={100}
          priority
        />
      ) : (
        <Flex
          w='full'
          h='full'
          justifyContent='center'
          alignItems='center'
          fontSize={50}
          width={100}
          height={100}
        >
          <VscClose />
        </Flex>
      )}
      <Text
        fontWeight='semibold'
        {...(currentEntryNumber === currentPokemonVariety.entry_number && {
          color: 'primary.500',
        })}
      >
        {capitalizeEachWord(kebabCaseToNormal(currentPokemonVariety.name))}
      </Text>
    </Flex>
  ) : (
    <Text>Loading...</Text>
  );
}

export default function PokemonVarieties({
  pokemonVarieties,
}: PokemonVarietiesProps) {
  return (
    <Flex
      w={{
        base: '95vw',
        lg: '50vw',
      }}
      direction='row'
      mx='auto'
      justifyContent='center'
      alignItems='center'
      rowGap={5}
      columnGap={50}
      wrap='wrap'
    >
      {pokemonVarieties.map((pokemonVariety) => (
        <PokemonVarietyComponent
          key={pokemonVariety.pokemon.name}
          pokemonVariety={pokemonVariety}
        />
      ))}
    </Flex>
  );
}
