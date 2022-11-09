import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';
import {
  useBoolean,
  useColorModeValue,
  Flex,
  Text,
  Button,
} from '@chakra-ui/react';
import { Waypoint } from 'react-waypoint';
import { FiRefreshCw } from 'react-icons/fi';
import { VscClose } from 'react-icons/vsc';

import usePokemonShortInfoListStore from '../stores/pokemon-short-info-list-store';
import { capitalize } from '../lib/utils';
import { PokemonShortInfo, PokemonType } from '../lib/pokemon/types';
import {
  getTotalPokemon,
  getPokemonShortInfoList,
  getFilteredPokemonEntries,
  getPokemonShortInfo,
  extractIdFromUrl,
} from '../lib/pokemon/pokedex';
import TypeBadge from './common/badges/TypeBadge';

interface PokemonCardProps {
  pokemonShortInfo: PokemonShortInfo;
}

interface PokemonListProps {
  pokemonShortInfoList: PokemonShortInfo[];
}

function PokemonCard({ pokemonShortInfo }: PokemonCardProps) {
  const color = useColorModeValue('gray.200', 'gray.900');

  return (
    <Link
      href={`/pokemon/${pokemonShortInfo.entry_number}`}
      shallow
    >
      <Flex
        minW={200}
        py={8}
        px={5}
        direction='column'
        alignItems='center'
        borderWidth={1}
        borderColor={color}
        rounded='md'
        cursor='pointer'
        transition='all .20s ease'
        _hover={{
          bg: color,
          transform: 'scale(1.05)',
        }}
      >
        {pokemonShortInfo.sprite ? (
          <Image
            alt={`${pokemonShortInfo.name} image`}
            src={pokemonShortInfo.sprite ?? ''}
            width={120}
            height={120}
            quality={100}
          />
        ) : (
          <Flex
            w='full'
            h='full'
            justifyContent='center'
            alignItems='center'
            fontSize={50}
            width={120}
            height={120}
          >
            <VscClose />
          </Flex>
        )}
        <Text
          align='center'
          fontWeight='bold'
        >
          {capitalize(pokemonShortInfo.name)}
        </Text>
        <Text
          color='gray'
          align='center'
          fontSize='sm'
        >
          #{`${pokemonShortInfo.entry_number}`.padStart(3, '0')}
        </Text>
        <Flex
          mt={2}
          justifyContent='space-evenly'
          gap={2}
        >
          {pokemonShortInfo.types.map((typeInfo) => (
            <TypeBadge
              key={typeInfo.type.name}
              type={typeInfo}
            />
          ))}
        </Flex>
      </Flex>
    </Link>
  );
}

function PokemonShortInfoList({ pokemonShortInfoList }: PokemonListProps) {
  return (
    <Flex
      mt={15}
      mx={5}
      direction='row'
      gap={10}
      wrap='wrap'
      justifyContent='space-evenly'
    >
      {pokemonShortInfoList.map((pokemonShortInfo) => (
        <PokemonCard
          key={pokemonShortInfo.name}
          pokemonShortInfo={pokemonShortInfo}
        />
      ))}
    </Flex>
  );
}

function NationalDexPokedex() {
  const { pokemonShortInfoList, addNewPokemonShortInfoList } =
    usePokemonShortInfoListStore();
  const [shouldGetMorePokemon, setShouldGetMorePokemon] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (shouldGetMorePokemon) {
        const totalPokemon = await getTotalPokemon();
        const newPokemonShortInfoList = await getPokemonShortInfoList(
          'national',
          pokemonShortInfoList.length
        );

        if (active) {
          if (pokemonShortInfoList.length === totalPokemon) {
            setShouldGetMorePokemon(false);
          }

          addNewPokemonShortInfoList(newPokemonShortInfoList);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [
    shouldGetMorePokemon,
    pokemonShortInfoList.length,
    addNewPokemonShortInfoList,
  ]);

  return (
    <>
      <PokemonShortInfoList pokemonShortInfoList={pokemonShortInfoList} />
      <Waypoint
        scrollableAncestor={typeof window !== 'undefined' ? window : null}
        onEnter={() => setShouldGetMorePokemon(true)}
        onLeave={() => setShouldGetMorePokemon(false)}
      >
        <Button
          mb={10}
          variant='link'
          loadingText='Loading'
          leftIcon={<FiRefreshCw />}
          isLoading
        >
          Retry
        </Button>
      </Waypoint>
    </>
  );
}

function SearchResultPokedex() {
  const router = useRouter();
  const [filteredPokemonShortInfoList, setFilteredPokemonShortInfoList] =
    useState<PokemonShortInfo[] | null>(null);

  useEffect(() => {
    setFilteredPokemonShortInfoList(null);
    if (router.isReady) {
      (async () => {
        const filteredPokemonEntries = await getFilteredPokemonEntries({
          searchTerm: (router.query.search as string) ?? 'no-search-term',
          types:
            typeof router.query.types === 'string'
              ? [router.query.types as PokemonType]
              : (router.query.types as PokemonType[]) ?? [],
        });

        const newFilteredPokemonShortInfoList = await Promise.all(
          filteredPokemonEntries.map(async (pokemonEntry) => {
            const pokemonShortInfo = await getPokemonShortInfo(
              extractIdFromUrl(pokemonEntry.pokemon_species.url)
            );

            return pokemonShortInfo;
          })
        );

        setFilteredPokemonShortInfoList(newFilteredPokemonShortInfoList);
      })();
    }
  }, [router.isReady, router.query]);

  return filteredPokemonShortInfoList !== null ? (
    <PokemonShortInfoList pokemonShortInfoList={filteredPokemonShortInfoList} />
  ) : (
    <Text>Loading...</Text>
  );
}

export default function Pokedex() {
  const router = useRouter();
  const pokedex = useMemo(
    () => ({
      nationalDex: <NationalDexPokedex />,
      searchResult: <SearchResultPokedex />,
    }),
    []
  );
  const [currentPokedex, setCurrentPokedex] =
    useState<keyof typeof pokedex>('nationalDex');
  const [isLoading, setIsLoading] = useBoolean(true);

  useEffect(() => {
    setIsLoading.on();
    if (router.isReady) {
      setIsLoading.off();

      if (
        Object.hasOwn(router.query, 'search') ||
        Object.hasOwn(router.query, 'types')
      ) {
        setCurrentPokedex('searchResult');
        return;
      }

      setCurrentPokedex('nationalDex');
    }
  }, [router, setIsLoading]);

  return !isLoading ? pokedex[currentPokedex] : <Text>Loading...</Text>;
}
