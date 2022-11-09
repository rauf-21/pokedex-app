import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  useColorModeValue,
  useDisclosure,
  Input,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { FiFilter, FiSearch } from 'react-icons/fi';

import PokemonFilterModal from '../modal/PokemonFilterModal';

export default function PokemonSearchInput() {
  const buttonVariant = useColorModeValue('solid', 'primary');
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      pos='sticky'
      top={6}
      zIndex={9}
    >
      <Input
        w='100%'
        roundedRight='none'
        variant='primary'
        placeholder='Search pokemon...'
        list='pokemon-entries'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconButton
        colorScheme='primary'
        variant={buttonVariant}
        aria-label='filter'
        icon={<FiFilter />}
        rounded='none'
        onClick={onOpen}
      />
      <IconButton
        colorScheme='primary'
        variant={buttonVariant}
        aria-label='filter'
        icon={<FiSearch />}
        roundedLeft='none'
        onClick={() => {
          router.push({
            query: {
              search: searchTerm,
            },
          });
        }}
      />
      <PokemonFilterModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  );
}
