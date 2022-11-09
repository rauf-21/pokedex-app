import { useColorModeValue, Badge } from '@chakra-ui/react';

import { MoveCategory } from '../../../lib/pokemon/types';

interface MoveCategoryBadgeProps {
  moveCategory: MoveCategory;
}

export default function MoveCategoryBadge({
  moveCategory,
}: MoveCategoryBadgeProps) {
  const color = useColorModeValue('white', 'black');
  const bg = {
    physical: 'orange.500',
    special: 'blue.500',
    status: 'gray.200',
  };

  return (
    <Badge
      variant='solid'
      bg={bg[moveCategory]}
      color={moveCategory === 'status' ? 'black' : color}
    >
      {moveCategory}
    </Badge>
  );
}
