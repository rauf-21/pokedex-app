import create from 'zustand';

import { PokemonGameSeries } from '../lib/pokemon/types';

interface PokemonGameSeriesStore {
  currentPokemonGameSeries: PokemonGameSeries;
  setCurrentPokemonGameSeries: (
    newPokemonGameSeries: PokemonGameSeries
  ) => void;
}

const usePokemonGameSeriesStore = create<PokemonGameSeriesStore>((set) => ({
  currentPokemonGameSeries: 'sword-shield',
  setCurrentPokemonGameSeries: (newPokemonGameSeries) =>
    set(() => ({
      currentPokemonGameSeries: newPokemonGameSeries,
    })),
}));

export default usePokemonGameSeriesStore;
