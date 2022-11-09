import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useBoolean, Flex, Text } from '@chakra-ui/react';
import 'swiper/css';

import {
  Pokemon,
  PokemonLocationAreaEncounter,
  PokemonSpecies,
  Type,
  EvolutionChain,
} from '../../lib/pokemon/types';
import {
  getPokemon,
  getPokemonLocationAreaEncounters,
  getPokemonType,
  getPokemonSpecies,
  getPokemonEvolutionChain,
  extractIdFromUrl,
} from '../../lib/pokemon/pokedex';
import PokemonDetail from '../../components/pokemon/PokemonDetail';

export default function PokemonPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useBoolean(false);
  const [entryNumber, setEntryNumber] = useState<number | null>(null);
  const [pokemonBaseInformation, setPokemonBaseInformation] = useState<
    (Pokemon & PokemonSpecies) | null
  >(null);
  const [pokemonLocationAreaEncounters, setPokemonLocationAreaEncounters] =
    useState<PokemonLocationAreaEncounter[] | null>([]);
  const [pokemonTypes, setPokemonTypes] = useState<Type[] | null>([]);
  const [pokemonEvolutionChain, setPokemonEvolutionChain] =
    useState<EvolutionChain | null>();

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      if (
        url !== router.asPath &&
        !!entryNumber &&
        !!pokemonBaseInformation &&
        !!pokemonLocationAreaEncounters &&
        !!pokemonTypes &&
        !!pokemonEvolutionChain
      ) {
        setIsLoading.on();
      }
    };
    const handleRouteChangeComplete = (url: string) => {
      if (
        url === router.asPath &&
        !!entryNumber &&
        !!pokemonBaseInformation &&
        !!pokemonLocationAreaEncounters &&
        !!pokemonTypes &&
        !!pokemonEvolutionChain
      ) {
        setIsLoading.off();
      }
    };

    if (router.isReady) {
      (async () => {
        const currentEntryNumber = parseInt(
          router.query.entryNumber as string,
          10
        );
        const newPokemonBaseInformation = await getPokemon(currentEntryNumber);
        const newPokemonLocationAreaEncounters =
          await getPokemonLocationAreaEncounters(currentEntryNumber);
        const newPokemonTypes = await Promise.all(
          newPokemonBaseInformation.types.map(async (type) => {
            const pokemonType = await getPokemonType(type.type.name);

            return pokemonType;
          })
        );
        const newPokemonSpecies = await getPokemonSpecies(
          extractIdFromUrl(newPokemonBaseInformation.species.url)
        );
        const pokemonEvolutionChainId = extractIdFromUrl(
          newPokemonSpecies.evolution_chain.url
        );
        const newPokemonEvolutionChain = await getPokemonEvolutionChain(
          pokemonEvolutionChainId
        );

        setEntryNumber(currentEntryNumber);
        setPokemonBaseInformation({
          ...newPokemonBaseInformation,
          ...newPokemonSpecies,
        });
        setPokemonLocationAreaEncounters(newPokemonLocationAreaEncounters);
        setPokemonTypes(newPokemonTypes);
        setPokemonEvolutionChain(newPokemonEvolutionChain);
      })();
    }

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [
    router.isReady,
    router.query.entryNumber,
    pokemonBaseInformation,
    entryNumber,
    pokemonEvolutionChain,
    pokemonLocationAreaEncounters,
    pokemonTypes,
    router,
    setIsLoading,
  ]);

  return (
    <Flex
      width='100vw'
      overflowX='hidden'
    >
      {!isLoading &&
      !!entryNumber &&
      !!pokemonBaseInformation &&
      !!pokemonLocationAreaEncounters &&
      !!pokemonTypes &&
      !!pokemonEvolutionChain ? (
        <PokemonDetail
          entryNumber={entryNumber}
          pokemonBaseInformation={pokemonBaseInformation}
          pokemonLocationAreaEncounters={pokemonLocationAreaEncounters}
          pokemonTypes={pokemonTypes}
          pokemonEvolutionChain={pokemonEvolutionChain}
        />
      ) : (
        <Text
          w='full'
          textAlign='center'
        >
          Loading...
        </Text>
      )}
    </Flex>
  );
}
