import Dexie from 'dexie';

import {
  Pokemon,
  PokedexPokemonEntry,
  PokemonShortInfo,
  PokemonLocationAreaEncounter,
  PokemonAbility,
  PokemonMove,
  Type,
  PokemonSpecies,
  EvolutionChain,
} from '../lib/pokemon/types';

class AppIDB extends Dexie {
  pokemonEntries!: Dexie.Table<PokedexPokemonEntry, string>;

  pokemonShortInfoList!: Dexie.Table<PokemonShortInfo, number>;

  pokemons!: Dexie.Table<Pokemon, number>;

  pokemonLocationAreaEncounters!: Dexie.Table<
    PokemonLocationAreaEncounter[],
    number
  >;

  pokemonAbilities!: Dexie.Table<PokemonAbility, string>;

  pokemonMoves!: Dexie.Table<PokemonMove, string>;

  pokemonTypes!: Dexie.Table<Type, string>;

  pokemonSpecies!: Dexie.Table<PokemonSpecies, number>;

  pokemonEvolutionChain!: Dexie.Table<EvolutionChain, number>;

  constructor() {
    super('AppDB');

    this.version(1).stores({
      pokemonEntries: 'entry_number, pokemon_species.name',
      pokemonShortInfoList: 'entry_number, name',
      pokemons: '&, name, height, weight',
      pokemonLocationAreaEncounters: '&',
      pokemonAbilities: 'name, id, is_main_series',
      pokemonMoves: 'name, type.name, damage_class.name',
      pokemonTypes: 'name',
      pokemonSpecies: '&',
      pokemonEvolutionChain: '&',
    });
  }
}

const idb = new AppIDB();

export default idb;
