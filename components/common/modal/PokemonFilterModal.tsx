import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  useColorModeValue,
  ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Heading,
} from '@chakra-ui/react';

import TypeBadge from '../badges/TypeBadge';
import { PokemonType } from '../../../lib/pokemon/types';

interface PokemonFilterModalProps extends Omit<ModalProps, 'children'> {}

const POKEMON_TYPES: PokemonType[] = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
];

export default function PokemonFilterModal({
  onClose,
  ...props
}: PokemonFilterModalProps) {
  const router = useRouter();
  const bg = useColorModeValue('white', 'black');
  const [selectedTypes, setSelectedTypes] = useState<PokemonType[]>([]);

  useEffect(() => {
    if (router.isReady) {
      if (
        !Array.isArray(router.query.types) &&
        router.query.types !== undefined
      ) {
        setSelectedTypes([router.query.types as PokemonType]);
        return;
      }

      setSelectedTypes((router.query.types as PokemonType[]) ?? []);
    }
  }, [router]);

  function handleTypeClick(type: PokemonType) {
    const isTypeInSelectedTypes = selectedTypes.find(
      (selectedType) => selectedType === type
    );

    if (isTypeInSelectedTypes) {
      setSelectedTypes(
        selectedTypes.filter((selectedType) => selectedType !== type)
      );
      return;
    }

    setSelectedTypes([...selectedTypes, type]);
  }

  return (
    <Modal
      onClose={onClose}
      {...props}
    >
      <ModalOverlay />
      <ModalContent
        bg={bg}
        zIndex={999}
        _dark={{
          borderWidth: 1,
          borderColor: 'gray.900',
        }}
      >
        <ModalHeader>Pokemon Filter Menu</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading
            as='h2'
            fontSize='md'
            my={5}
          >
            Pokemon Type
          </Heading>
          <Flex
            direction='row'
            wrap='wrap'
            justifyContent='space-between'
            alignItems='center'
            gap={5}
          >
            {POKEMON_TYPES.map((type) => (
              <TypeBadge
                key={type}
                cursor='pointer'
                py={2}
                px={5}
                isSelected={
                  selectedTypes.find(
                    (selectedType) => selectedType === type
                  ) !== undefined
                }
                type={{ slot: 1, type: { url: '', name: type } }}
                onClick={() => handleTypeClick(type)}
              />
            ))}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            variant='primary'
            onClick={() => {
              router.push({
                query: {
                  types: [...selectedTypes],
                },
              });
              onClose();
            }}
          >
            Search
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
