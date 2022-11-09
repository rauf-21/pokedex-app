import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  useColorModeValue,
  Flex,
  Text,
  List,
  ListItem,
} from '@chakra-ui/react';

import {
  EvolutionChain,
  EvolutionDetail,
  ChainLink,
  PokemonShortInfo,
  NameWithURL,
} from '../../lib/pokemon/types';
import {
  capitalize,
  kebabCaseToNormal,
  capitalizeEachWord,
} from '../../lib/utils';
import {
  getPokemonShortInfo,
  extractIdFromUrl,
} from '../../lib/pokemon/pokedex';

interface PokemonEvolutionChainProps {
  pokemonEvolutionChain: EvolutionChain;
}

interface PokemonEvolutionProps {
  pokemonChainLink: ChainLink;
}

function PokemonEvolution({ pokemonChainLink }: PokemonEvolutionProps) {
  const router = useRouter();
  const bg = useColorModeValue('gray.200', 'gray.900');
  const [currentEntryNumber, setCurrentEntryNumber] = useState<number | null>(
    null
  );
  const [pokemonShortInfo, setPokemonShortInfo] =
    useState<PokemonShortInfo | null>(null);

  useEffect(() => {
    if (router.isReady) {
      (async () => {
        const pokemonId = extractIdFromUrl(pokemonChainLink.species.url);
        const newPokemonShortInfo = await getPokemonShortInfo(pokemonId);

        setPokemonShortInfo(newPokemonShortInfo);
        setCurrentEntryNumber(parseInt(router.query.entryNumber as string, 10));
      })();
    }
  }, [router, pokemonChainLink]);

  function getEvolutionDetailText(evolutionDetails: EvolutionDetail[]) {
    const evolutionDetailText: {
      [key: string]: (...params: any) => string | null;
    } = {
      gender: (gender: string) => `Gender ${gender}`,
      held_item: (heldItem: NameWithURL) =>
        `Held ${capitalizeEachWord(kebabCaseToNormal(heldItem.name))}`,
      item: (item: NameWithURL) =>
        `Use ${capitalizeEachWord(kebabCaseToNormal(item.name))}`,
      known_move: (knownMove: string) =>
        `Learn ${capitalizeEachWord(kebabCaseToNormal(knownMove))}`,
      known_move_type: (knownMoveType: NameWithURL) =>
        `Learn ${capitalizeEachWord(
          kebabCaseToNormal(knownMoveType.name)
        )} move`,
      location: (location: NameWithURL) =>
        `At ${capitalizeEachWord(kebabCaseToNormal(location.name))}`,
      min_affection: (minAffection: string) => `${minAffection} affection`,
      min_beauty: (beauty: string) => `${beauty} beauty`,
      min_happiness: (minHappiness: string) => `${minHappiness} happiness`,
      min_level: (level: string) => `Level ${level}`,
      needs_overworld_rain: () => 'Rain',
      party_species: (partySpecies: NameWithURL) =>
        `${capitalizeEachWord(kebabCaseToNormal(partySpecies.name))} in party`,
      party_type: (partyType: NameWithURL) =>
        `have pokemon with ${capitalizeEachWord(
          kebabCaseToNormal(partyType.name)
        )} type in party`,
      relative_physical_stats: (relativePhysicalStats: number) =>
        relativePhysicalStats === 1
          ? 'Attack > Defense'
          : relativePhysicalStats === 0
          ? 'Attack = Defense'
          : 'Attack < Defense',
      time_of_day: (timeOfDay: string) =>
        `${capitalizeEachWord(kebabCaseToNormal(timeOfDay))} Time`,
      trade_species: (tradeSpecies: NameWithURL) =>
        `Trade with ${capitalizeEachWord(
          kebabCaseToNormal(tradeSpecies.name)
        )}`,
      trigger: (trigger: EvolutionDetail['trigger']) =>
        `[${trigger.name}]`.toUpperCase(),
      turn_upside_down: () => `Turn 3DS upside-down`,
    };

    return evolutionDetails
      .reduce(
        (acc, evolutionDetail) => [
          ...acc,
          Object.entries(evolutionDetail)
            .filter(([, value]) => value)
            .map(([evolutionType, value]) =>
              evolutionDetailText[evolutionType](value)
            )
            .join(', '),
        ],
        [] as string[]
      )
      .join('\n');
  }

  return router.isReady &&
    currentEntryNumber !== null &&
    pokemonShortInfo !== null ? (
    <Flex
      as={Link}
      href={{
        pathname: '/pokemon/[entryNumber]',
        query: {
          entryNumber: pokemonShortInfo.entry_number,
        },
      }}
      w='full'
      px={5}
      justifyContent='space-evenly'
      alignItems='center'
      cursor='pointer'
      borderLeftWidth={2}
      borderLeftColor='gray.900'
      _hover={{
        bg,
      }}
    >
      <Image
        alt={pokemonChainLink.species.name}
        src={pokemonShortInfo.sprite}
        width={120}
        height={120}
        quality={100}
        priority
      />
      <Flex
        w='full'
        direction='column'
        py={2}
      >
        <Text
          fontWeight='semibold'
          {...(currentEntryNumber === pokemonShortInfo.entry_number && {
            color: 'primary.500',
          })}
        >
          {capitalize(pokemonChainLink.species.name)}
        </Text>
        <Text
          fontSize='sm'
          whiteSpace='pre-line'
          py={5}
        >
          {getEvolutionDetailText(pokemonChainLink.evolution_details)}
        </Text>
      </Flex>
    </Flex>
  ) : (
    <Text>Loading...</Text>
  );
}

function generatePokemonEvolutionChain(
  pokemonChainLink: ChainLink | ChainLink[]
): ReactNode {
  if (Array.isArray(pokemonChainLink)) {
    return pokemonChainLink.map(generatePokemonEvolutionChain);
  }

  return (
    <List
      key={pokemonChainLink.species.name}
      pl={{
        base: 10,
        lg: 20,
      }}
      w='100%'
    >
      <ListItem>
        <Flex
          direction='row'
          justifyContent='center'
          alignItems='center'
          h='full'
          columnGap={2}
        >
          <PokemonEvolution pokemonChainLink={pokemonChainLink} />
        </Flex>
      </ListItem>
      <ListItem>
        {pokemonChainLink.evolves_to.map(generatePokemonEvolutionChain)}
      </ListItem>
    </List>
  );
}

export default function PokemonEvolutionChain({
  pokemonEvolutionChain,
}: PokemonEvolutionChainProps) {
  return (
    <Flex
      w={{
        base: '95vw',
        md: '50vw',
      }}
      justifyContent='center'
      alignItems='center'
    >
      {generatePokemonEvolutionChain(pokemonEvolutionChain.chain)}
    </Flex>
  );
}
