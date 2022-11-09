import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  useBoolean,
  forwardRef,
  HeadingProps,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';

import {
  Pokemon,
  PokemonLocationAreaEncounter,
  Type,
  PokemonSpecies,
  EvolutionChain,
} from '../../lib/pokemon/types';
import { capitalize } from '../../lib/utils';
import PokemonSpritesCarousel from './PokemonSpritesCarousel';
import PokemonBaseInformation from './PokemonBaseInformation';
import PokemonStats from './PokemonStats';
import PokemonLocationAreaEncounters from './PokemonLocationAreaEncounters';
import PokemonMoves from './PokemonMoves';
import PokemonDamageTakenEffectiveness from './PokemonDamageTakenEffectiveness';
import PokemonEvolutionChain from './PokemonEvolutionChain';
import PokemonVarieties from './PokemonVarieties';

const MIN_RENDER_TIME = 200;

interface PokemonDetailProps {
  entryNumber: number;
  pokemonBaseInformation: Pokemon & PokemonSpecies;
  pokemonLocationAreaEncounters: PokemonLocationAreaEncounter[];
  pokemonTypes: Type[];
  pokemonEvolutionChain: EvolutionChain;
}

const PokemonDetailHeading = forwardRef<HeadingProps, typeof Heading>(
  ({ children, ...props }, ref) => (
    <Heading
      as='h2'
      size='md'
      textAlign='center'
      ref={ref}
      {...props}
    >
      {children}
    </Heading>
  )
);

export default function PokemonDetail({
  entryNumber,
  pokemonBaseInformation,
  pokemonLocationAreaEncounters,
  pokemonTypes,
  pokemonEvolutionChain,
}: PokemonDetailProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useBoolean(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading.off();
    }, MIN_RENDER_TIME);

    const handleRouteChangeStart = (url: string) => {
      if (url !== router.asPath) {
        setIsLoading.on();
      }
    };
    const handleRouteChangeComplete = (url: string) => {
      if (url === router.asPath) {
        setIsLoading.off();
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router, setIsLoading]);

  return !isLoading ? (
    <Flex
      width='100%'
      direction='column'
      justifyContent='center'
      alignItems='center'
      rowGap={10}
    >
      <Flex
        direction='column'
        alignItems='center'
      >
        <Heading as='h1'>{capitalize(pokemonBaseInformation.name)}</Heading>
        <Text
          color='gray'
          fontSize='sm'
        >
          #{`${entryNumber}`.padStart(3, '0')}
        </Text>
        <PokemonSpritesCarousel sprites={pokemonBaseInformation.sprites} />
      </Flex>
      <Flex
        my={5}
        w={{
          base: '95vw',
          md: '80vw',
        }}
        direction={{
          base: 'column',
          lg: 'row',
        }}
        justifyContent='space-evenly'
        mx='auto'
        gap={10}
        wrap='wrap'
      >
        <Flex
          direction='column'
          rowGap={5}
          alignItems='center'
        >
          <PokemonDetailHeading id='base-information'>
            Base Information
          </PokemonDetailHeading>
          <PokemonBaseInformation
            pokemonBaseInformation={pokemonBaseInformation}
          />
        </Flex>
        <Flex
          direction='column'
          rowGap={5}
          alignItems='center'
        >
          <PokemonDetailHeading id='stats'>Stats</PokemonDetailHeading>
          <PokemonStats stats={pokemonBaseInformation.stats} />
        </Flex>
      </Flex>
      <Flex
        direction='column'
        rowGap={5}
        alignItems='center'
      >
        <PokemonDetailHeading id='damage-taken'>
          Damage Taken
        </PokemonDetailHeading>
        <PokemonDamageTakenEffectiveness pokemonTypes={pokemonTypes} />
      </Flex>
      <Flex
        direction='column'
        rowGap={5}
        alignItems='center'
      >
        <PokemonDetailHeading id='evolution-chain'>
          Evolution Chain
        </PokemonDetailHeading>
        <PokemonEvolutionChain pokemonEvolutionChain={pokemonEvolutionChain} />
      </Flex>
      <Flex
        my={10}
        direction='column'
        rowGap={5}
        alignItems='center'
      >
        <PokemonDetailHeading id='varieties'>Varieties</PokemonDetailHeading>
        <PokemonVarieties pokemonVarieties={pokemonBaseInformation.varieties} />
      </Flex>
      <Flex
        direction='column'
        rowGap={5}
        alignItems='center'
      >
        <PokemonDetailHeading id='locations'>Locations</PokemonDetailHeading>
        <PokemonLocationAreaEncounters
          pokemonLocationAreaEncounters={pokemonLocationAreaEncounters}
        />
      </Flex>
      <Flex
        direction='column'
        rowGap={5}
        alignItems='center'
      >
        <PokemonDetailHeading id='moves'>Moves</PokemonDetailHeading>
        <PokemonMoves moves={pokemonBaseInformation.moves} />
      </Flex>
    </Flex>
  ) : (
    <Text
      w='full'
      textAlign='center'
    >
      Loading...
    </Text>
  );
}
