import { useColorMode, IconButton } from '@chakra-ui/react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ToggleColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      bg='none'
      aria-label='Toggle color mode'
      icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
      onClick={toggleColorMode}
      borderRadius='full'
    />
  );
}
