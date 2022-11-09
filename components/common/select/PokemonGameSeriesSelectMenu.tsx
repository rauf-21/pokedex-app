import { Select } from '@chakra-ui/react';

import { capitalize } from '../../../lib/utils';
import { PokemonGameSeries } from '../../../lib/pokemon/types';
import usePokemonGameSeriesStore from '../../../stores/pokemon-game-series-store';

const GAME_SERIES: PokemonGameSeries[] = [
  'red-blue',
  'yellow',
  'gold-silver',
  'crystal',
  'ruby-sapphire',
  'emerald',
  'firered-leafgreen',
  'diamond-pearl',
  'platinum',
  'heartgold-soulsilver',
  'black-white',
  'black-2-white-2',
  'x-y',
  'omega-ruby-alpha-sapphire',
  'sun-moon',
  'ultra-sun-ultra-moon',
  'sword-shield',
  'lets-go-pikachu-lets-go-eevee',
  'xd',
  'colosseum',
];

function readableGameSeriesText(gameSeriesValue: string) {
  const gameSeriesValueWord = gameSeriesValue.split('-');

  if (gameSeriesValueWord.length === 1) {
    return capitalize(gameSeriesValue);
  }

  const midIndex = Math.floor(gameSeriesValueWord.length / 2);

  const capitalizedGameSeriesWord = gameSeriesValueWord.map((word) =>
    capitalize(word)
  );

  capitalizedGameSeriesWord.splice(midIndex, 0, '-');

  return capitalizedGameSeriesWord.join(' ');
}

export default function PokemonGameSeriesSelectMenu() {
  const { currentPokemonGameSeries, setCurrentPokemonGameSeries } =
    usePokemonGameSeriesStore();

  return (
    <Select
      defaultValue={currentPokemonGameSeries}
      onChange={(e) =>
        setCurrentPokemonGameSeries(e.currentTarget.value as PokemonGameSeries)
      }
    >
      {GAME_SERIES.map((game) => (
        <option
          key={game}
          value={game}
        >
          {readableGameSeriesText(game)}
        </option>
      ))}
    </Select>
  );
}
