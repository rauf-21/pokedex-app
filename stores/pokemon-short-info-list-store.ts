import create from 'zustand';

import { PokemonShortInfo } from '../lib/pokemon/types';

interface PokemonShortInfoListState {
  pokemonShortInfoList: PokemonShortInfo[];
  addNewPokemonShortInfoList: (
    newPokemonShortInfoList: PokemonShortInfo[]
  ) => void;
}

const usePokemonShortInfoListStore = create<PokemonShortInfoListState>(
  (set) => ({
    pokemonShortInfoList: [],
    addNewPokemonShortInfoList: (newPokemonShortInfoList) =>
      set((state) => ({
        pokemonShortInfoList: [
          ...state.pokemonShortInfoList,
          ...newPokemonShortInfoList,
        ],
      })),
  })
);

export default usePokemonShortInfoListStore;
