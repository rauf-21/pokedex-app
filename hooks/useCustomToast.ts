import { useToast } from '@chakra-ui/react';

export default function useCustomToast() {
  const toast = useToast();

  return {
    errorToast: (title: string, description: string) =>
      toast({
        title,
        description,
        status: 'error',
        duration: null,
      }),
  };
}
