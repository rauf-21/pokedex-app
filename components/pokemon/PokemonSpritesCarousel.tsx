import Image from 'next/image';
import { useState } from 'react';
import { chakra, Flex, IconButton } from '@chakra-ui/react';
import {
  VscCircleFilled,
  VscCircleOutline,
  VscChevronLeft,
  VscChevronRight,
  VscClose,
} from 'react-icons/vsc';

import { PokemonDefaultSprite } from '../../lib/pokemon/types';

interface PokemonSpritesCarouselProps {
  sprites: PokemonDefaultSprite;
}

const carouselPokemonImageOrder: (keyof PokemonDefaultSprite)[][] = [
  ['front_default', 'back_default'],
  ['front_shiny', 'back_shiny'],
];

export default function PokemonSpritesCarousel({
  sprites,
}: PokemonSpritesCarouselProps) {
  const [
    currentCarouselPokemonImageOrderIndex,
    setCurrentCarouselPokemonImageOrderIndex,
  ] = useState(0);

  return (
    <Flex
      direction='column'
      alignItems='center'
    >
      <Flex alignItems='center'>
        <IconButton
          fontSize='xl'
          variant='ghost'
          aria-label='tes'
          icon={<VscChevronLeft />}
          color='primary.400'
          rounded='full'
          onClick={() => {
            setCurrentCarouselPokemonImageOrderIndex((index) =>
              index === 0 ? carouselPokemonImageOrder.length - 1 : index - 1
            );
          }}
        />
        <Flex
          w={300}
          direction='row'
          overflow='hidden'
        >
          {carouselPokemonImageOrder.map((pokemonImages, slideIndex) => (
            <Flex
              key={`pokemon-image-slide-${slideIndex + 1}`}
              w={300}
              ml={`-${currentCarouselPokemonImageOrderIndex * 50}%`}
              transition='all .5s'
              opacity={
                slideIndex !== currentCarouselPokemonImageOrderIndex ? 0 : 1
              }
            >
              {pokemonImages.map((pokemonImage, imageIndex) => (
                <chakra.div
                  key={`${pokemonImage}-${slideIndex}-${imageIndex}`}
                  w={150}
                  h={150}
                  pos='relative'
                >
                  {sprites[pokemonImage] ? (
                    <Image
                      alt={`${pokemonImage}-${slideIndex}-${imageIndex}`}
                      src={sprites[pokemonImage]!}
                      width={150}
                      height={150}
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
                    >
                      <VscClose />
                    </Flex>
                  )}
                </chakra.div>
              ))}
            </Flex>
          ))}
        </Flex>
        <IconButton
          fontSize='xl'
          variant='ghost'
          aria-label='next carousel picture'
          icon={<VscChevronRight />}
          color='primary.400'
          rounded='full'
          onClick={() => {
            setCurrentCarouselPokemonImageOrderIndex((index) =>
              index === carouselPokemonImageOrder.length - 1 ? 0 : index + 1
            );
          }}
        />
      </Flex>
      <Flex>
        {carouselPokemonImageOrder.map(([frontPicture, backPicture], index) => (
          <IconButton
            key={`${frontPicture}${backPicture}`}
            variant='ghost'
            aria-label='button for changing carousel picture'
            icon={
              index === currentCarouselPokemonImageOrderIndex ? (
                <VscCircleFilled />
              ) : (
                <VscCircleOutline />
              )
            }
            color='primary.400'
            rounded='full'
            onClick={() => setCurrentCarouselPokemonImageOrderIndex(index)}
          />
        ))}
      </Flex>
    </Flex>
  );
}
