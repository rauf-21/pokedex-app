import axios from 'axios';

import idb from '../../idb/app-idb';

import {
  NameWithURL,
  PokedexType,
  Pokedex,
  Pokemon,
  PokemonShortInfo,
  PokemonLocationAreaEncounter,
  PokemonAbility,
  PokemonMove,
  Type,
  PokemonSpecies,
  EvolutionChain,
  PokemonType,
} from './types';

const BASE_URL = 'https://pokeapi.co/api/v2';

export function extractIdFromUrl(url: NameWithURL['url']) {
  const [id] = url.match(/\/[0-9]+\/$/gi)!;

  return parseInt(id.replace(/\//gi, ''), 10);
}

export async function getPokedex(pokedexType: PokedexType = 'national') {
  const { data: result } = await axios.get<Pokedex>(
    `${BASE_URL}/pokedex/${pokedexType}`
  );

  return result;
}

export async function getPokemonEntries(pokedexType: PokedexType = 'national') {
  const cachedPokemonEntries = await idb.pokemonEntries.toArray();

  if (cachedPokemonEntries.length === 0) {
    const pokedex = await getPokedex(pokedexType);

    await idb.pokemonEntries.bulkPut(pokedex.pokemon_entries);

    await getPokemonEntries(pokedexType);
  }

  return cachedPokemonEntries;
}

export async function getPokemon(entryNumber: number) {
  const cachedPokemon = await idb.pokemons.get(entryNumber);

  if (cachedPokemon === undefined) {
    const { data: pokemon } = await axios.get<Pokemon>(
      `${BASE_URL}/pokemon/${entryNumber}`
    );

    await idb.pokemons.put(pokemon, entryNumber);

    return pokemon;
  }

  return cachedPokemon;
}

export async function getPokemonType(name: string) {
  const cachedPokemonType = await idb.pokemonTypes.get(name);

  if (cachedPokemonType === undefined) {
    const { data: pokemonType } = await axios.get<Type>(
      `${BASE_URL}/type/${name}`
    );

    await idb.pokemonTypes.put(pokemonType, name);

    return pokemonType;
  }

  return cachedPokemonType;
}

export async function getFilteredPokemonEntries({
  searchTerm,
  types,
}: {
  searchTerm: string;
  types: PokemonType[];
}) {
  const searchTermRe = new RegExp(`${searchTerm}`, 'gi');
  const pokemonEntriesBySearchTerm = await idb.pokemonEntries
    .filter((pokemonEntry) =>
      searchTermRe.test(pokemonEntry.pokemon_species.name)
    )
    .toArray();
  const pokemonEntriesByTypes = (
    await Promise.all(
      types.map(async (type) => {
        const pokemonEntriesByType = await getPokemonType(type);

        return pokemonEntriesByType.pokemon.map((typePokemon) => ({
          entry_number: extractIdFromUrl(typePokemon.pokemon.url),
          pokemon_species: typePokemon.pokemon,
        }));
      })
    )
  ).flat();

  return [...pokemonEntriesBySearchTerm, ...pokemonEntriesByTypes].filter(
    (v, i, a) =>
      a.findIndex(
        (v2) => v2.pokemon_species.name === v.pokemon_species.name
      ) === i
  );
}

export async function getTotalPokemon() {
  const cachedTotalPokemonEntries = await idb.pokemonEntries.count();

  if (cachedTotalPokemonEntries === 0) {
    const pokemonEntries = await getPokemonEntries();

    return pokemonEntries.length;
  }

  return cachedTotalPokemonEntries;
}

export async function getPokemonShortInfo(entryNumber: number) {
  const cachedPokemonShortInfo = await idb.pokemonShortInfoList.get(
    entryNumber
  );

  if (cachedPokemonShortInfo === undefined) {
    const pokemon = await getPokemon(entryNumber);
    const pokemonShortInfo: PokemonShortInfo = {
      entry_number: entryNumber,
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
      types: pokemon.types,
    };

    await idb.pokemonShortInfoList.put(pokemonShortInfo, entryNumber);

    return pokemonShortInfo;
  }

  return cachedPokemonShortInfo;
}

export async function getPokemonShortInfoList(
  pokedexType: PokedexType = 'national',
  offset = 0,
  limit = 10
) {
  const cachedPokemonShortInfoList = await idb.pokemonShortInfoList.toArray();
  const totalPokemon = await getTotalPokemon();

  if (
    cachedPokemonShortInfoList.length === 0 ||
    cachedPokemonShortInfoList.length < totalPokemon
  ) {
    const pokemonEntries = await getPokemonEntries(pokedexType);
    const pokemonShortInfoList = await Promise.all(
      pokemonEntries
        .filter(
          ({ entry_number }) =>
            entry_number >= offset + 1 && entry_number <= offset + limit
        )
        .map(async ({ entry_number }) => {
          const pokemonShortInfo = await getPokemonShortInfo(entry_number);

          return pokemonShortInfo;
        })
    );

    await idb.pokemonShortInfoList.bulkPut(pokemonShortInfoList);

    return pokemonShortInfoList;
  }

  return cachedPokemonShortInfoList.filter(
    ({ entry_number }) =>
      entry_number >= offset + 1 && entry_number <= offset + limit
  );
}

export async function getPokemonLocationAreaEncounters(entryNumber: number) {
  const cachedPokemonLocationAreaEncounters =
    await idb.pokemonLocationAreaEncounters.get(entryNumber);

  if (cachedPokemonLocationAreaEncounters === undefined) {
    const { data: pokemonLocationAreaEncounters } = await axios.get<
      PokemonLocationAreaEncounter[]
    >(`${BASE_URL}/pokemon/${entryNumber}/encounters`);

    await idb.pokemonLocationAreaEncounters.put(
      pokemonLocationAreaEncounters,
      entryNumber
    );

    return pokemonLocationAreaEncounters;
  }

  return cachedPokemonLocationAreaEncounters;
}

export async function getPokemonAbility(name: string) {
  const cachedPokemonAbility = await idb.pokemonAbilities.get(name);

  if (cachedPokemonAbility === undefined) {
    const { data: pokemonAbility } = await axios.get<PokemonAbility>(
      `${BASE_URL}/ability/${name}`
    );

    await idb.pokemonAbilities.put(pokemonAbility, name);

    return pokemonAbility;
  }

  return cachedPokemonAbility;
}

export async function getPokemonMove(name: string) {
  const cachedPokemonMove = await idb.pokemonMoves.get(name);

  if (cachedPokemonMove === undefined) {
    const { data: pokemonMove } = await axios.get<PokemonMove>(
      `${BASE_URL}/move/${name}`
    );

    await idb.pokemonMoves.put(pokemonMove, name);

    return pokemonMove;
  }

  return cachedPokemonMove;
}

export async function getPokemonSpecies(entryNumber: number) {
  const cachedPokemonSpecies = await idb.pokemonSpecies.get(entryNumber);

  if (cachedPokemonSpecies === undefined) {
    const { data: pokemonSpecies } = await axios.get<PokemonSpecies>(
      `${BASE_URL}/pokemon-species/${entryNumber}`
    );

    await idb.pokemonSpecies.put(pokemonSpecies, entryNumber);

    return pokemonSpecies;
  }

  return cachedPokemonSpecies;
}

export async function getPokemonEvolutionChain(id: number) {
  const cachedPokemonEvolutionChain = await idb.pokemonEvolutionChain.get(id);

  if (cachedPokemonEvolutionChain === undefined) {
    const { data: pokemonEvolutionChain } = await axios.get<EvolutionChain>(
      `${BASE_URL}/evolution-chain/${id}`
    );

    await idb.pokemonEvolutionChain.put(pokemonEvolutionChain, id);

    return pokemonEvolutionChain;
  }

  return cachedPokemonEvolutionChain;
}

export default {
  getPokedex,
  getPokemonEntries,
  getPokemon,
  getTotalPokemon,
  getPokemonShortInfo,
  getPokemonShortInfoList,
  getPokemonLocationAreaEncounters,
  getPokemonAbility,
  getPokemonType,
  getPokemonSpecies,
  getPokemonEvolutionChain,
  extractIdFromUrl,
};
