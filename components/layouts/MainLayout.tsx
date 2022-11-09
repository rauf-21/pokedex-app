import Head from 'next/head';
import { ReactNode } from 'react';
import { useColorModeValue, Flex } from '@chakra-ui/react';

import Navbar from '../common/Navbar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const bg = useColorModeValue('white', 'black');

  return (
    <>
      <Head>
        <title>Pokedex App</title>
        <meta
          name='description'
          content='Description'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <Navbar />
      <Flex
        w='100vw'
        minH='100vh'
        bg={bg}
        direction='column'
        justifyContent='center'
        alignItems='center'
        rowGap={10}
        overflowX='hidden'
      >
        {children}
      </Flex>
    </>
  );
}
