export type PokedexType =
  | 'national'
  | 'kanto'
  | 'original-johto'
  | 'hoenn'
  | 'original-sinnoh'
  | 'unova'
  | 'original-unova';

export type PokemonType =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy';

export type PokemonGameVersion =
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'gold'
  | 'silver'
  | 'crystal'
  | 'firered'
  | 'leafgreen'
  | 'ruby'
  | 'sapphire'
  | 'emerald'
  | 'pearl'
  | 'diamond'
  | 'platinum'
  | 'heartgold'
  | 'soulsilver'
  | 'black'
  | 'white'
  | 'black-2'
  | 'white-2'
  | 'x'
  | 'y'
  | 'sun'
  | 'moon'
  | 'ultra-sun'
  | 'ultra-moon';

export type PokemonGameSeries =
  | 'red-blue'
  | 'yellow'
  | 'gold-silver'
  | 'crystal'
  | 'ruby-sapphire'
  | 'emerald'
  | 'firered-leafgreen'
  | 'diamond-pearl'
  | 'platinum'
  | 'heartgold-soulsilver'
  | 'black-white'
  | 'black-2-white-2'
  | 'x-y'
  | 'omega-ruby-alpha-sapphire'
  | 'sun-moon'
  | 'ultra-sun-ultra-moon'
  | 'sword-shield'
  | 'lets-go-pikachu-lets-go-eevee'
  | 'xd'
  | 'colosseum';

export type MoveLearnMethod = 'level-up' | 'egg' | 'machine' | 'tutor';

export type MoveCategory = 'physical' | 'special' | 'status';

export interface NameWithURL<T = string> {
  name: T;
  url: string;
}

export interface PokedexPokemonEntry {
  entry_number: number;
  pokemon_species: NameWithURL;
}

export interface PokedexDescription {
  description: string;
  language: NameWithURL;
}

export interface OtherName {
  language: NameWithURL;
  name: string;
}

export interface Pokedex {
  descriptions: PokedexDescription[];
  id: number;
  is_main_series: boolean;
  name: PokedexType;
  names: OtherName[];
  pokemon_entries: PokedexPokemonEntry[];
  region: NameWithURL;
  version_groups: NameWithURL[];
}

export interface PokemonFlavorTextEntry {
  flavor_text: string;
  language: NameWithURL;
  version: NameWithURL;
}

export interface PokemonGenus {
  genus: string;
  language: NameWithURL;
}

export interface PokemonPalParkEncounter {
  area: NameWithURL;
  base_score: number;
  rate: number;
}

export interface PokemonPokedexNumber {
  entry_number: number;
  pokedex: NameWithURL;
}

export interface PokemonVariety {
  is_default: boolean;
  pokemon: NameWithURL;
}

export interface PokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  color: NameWithURL;
  egg_groups: NameWithURL[];
  evolution_chain: {
    url: string;
  };
  evolves_from_species: NameWithURL[];
  flavor_text_entries: PokemonFlavorTextEntry[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: PokemonGenus[];
  generation: NameWithURL;
  growth_rate: NameWithURL;
  habitat: NameWithURL;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: OtherName[];
  order: number;
  pal_park_encounters: PokemonPalParkEncounter[];
  pokedex_numbers: PokemonPokedexNumber[];
  shape: NameWithURL;
  varieties: PokemonVariety[];
}

export interface PokemonOwnAbility {
  ability: NameWithURL;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonGameIndex {
  game_index: 325;
  version: NameWithURL;
}

export interface PokemonHeldItemRarity {
  rarity: number;
  version: NameWithURL;
}

export interface PokemonHeldItem {
  item: NameWithURL;
  version_details: PokemonHeldItemRarity[];
}

export interface PokemonMoveVersionGroup {
  level_learned_at: number;
  move_learn_method: NameWithURL<MoveLearnMethod>;
  version_group: NameWithURL<PokemonGameSeries>;
}

export interface PokemonOwnMove {
  move: NameWithURL;
  version_group_details: PokemonMoveVersionGroup[];
}

export interface PokemonOwnType {
  slot: number;
  type: NameWithURL<PokemonType>;
}

export interface PokemonPastType {
  generation: NameWithURL;
  types: PokemonOwnType[];
}

export interface PokemonDefaultSprite {
  back_default: string;
  back_female?: string;
  back_shiny: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny: string;
  front_shiny_female?: string;
}

export type PokemonDreamWorldSprite = Partial<
  Pick<PokemonDefaultSprite, 'front_default' | 'front_female'>
> & {
  front_default: string;
};

export type PokemonHomeSprite = Partial<
  Pick<
    PokemonDefaultSprite,
    'front_default' | 'front_female' | 'front_shiny' | 'front_shiny_female'
  >
> & {
  front_default: string;
  front_shiny: string;
};

export type PokemonOfficialArtworkSprite = Pick<
  PokemonDefaultSprite,
  'front_default'
>;

export type PokemonGen1Sprite = Partial<
  Pick<PokemonDefaultSprite, 'back_default' | 'front_default'> & {
    back_gray: string;
    back_transparent: string;
    front_gray: string;
    front_transparent: string;
  }
>;

export type PokemonCrystalGen2Sprite = Partial<
  Pick<
    PokemonDefaultSprite,
    'back_default' | 'back_shiny' | 'front_default' | 'front_shiny'
  > & {
    back_shiny_transparent: string;
    back_transparent: string;
    front_shiny_transparent: string;
    front_transparent: string;
  }
>;

export type PokemonGen2Sprite = Partial<
  Pick<
    PokemonDefaultSprite,
    'back_default' | 'back_shiny' | 'front_default' | 'front_shiny'
  > & {
    front_transparent: string;
  }
>;

export type PokemonEmeraldGen3Sprite = Partial<
  Pick<PokemonDefaultSprite, 'front_default' | 'front_shiny'>
>;

export type PokemonGen3Sprite = Partial<
  Pick<
    PokemonDefaultSprite,
    'back_default' | 'back_shiny' | 'front_default' | 'front_shiny'
  >
>;

export type PokemonGen4Sprite = Partial<PokemonDefaultSprite>;

export type PokemonGen5Sprite = Partial<
  PokemonDefaultSprite & {
    animated: Partial<PokemonDefaultSprite>;
  }
>;

export type PokemonGen6Sprite = Partial<
  Pick<
    PokemonDefaultSprite,
    'front_default' | 'front_female' | 'front_shiny' | 'front_shiny_female'
  >
>;

export type PokemonGen7Icon = Partial<
  Pick<PokemonDefaultSprite, 'front_default' | 'front_female'>
>;

export type PokemonGen7Sprite = Partial<
  Pick<
    PokemonDefaultSprite,
    'front_default' | 'front_female' | 'front_shiny' | 'front_shiny_female'
  >
>;

export type PokemonGen8Icon = PokemonGen7Icon;

export type PokemonSprites = PokemonDefaultSprite & {
  other: {
    'dream_world': PokemonDreamWorldSprite;
    'home': PokemonHomeSprite;
    'official-artwork': PokemonOfficialArtworkSprite;
  };
  versions: {
    'generation-i': {
      'red-blue': PokemonGen1Sprite;
      'yellow': PokemonGen1Sprite;
    };
    'generation-ii': {
      crystal: PokemonCrystalGen2Sprite;
      gold: PokemonGen2Sprite;
      silver: PokemonGen2Sprite;
    };
    'generation-iii': {
      'emerald': PokemonEmeraldGen3Sprite;
      'firered-leafgreen': PokemonGen3Sprite;
      'ruby-sapphire': PokemonGen3Sprite;
    };
    'generation-iv': {
      'diamond-pearl': PokemonGen4Sprite;
      'heartgold-soulsilver': PokemonGen4Sprite;
      'platinum': PokemonGen4Sprite;
    };
    'generation-v': {
      'black-white': PokemonGen5Sprite;
    };
    'generation-vi': {
      'omegaruby-alphasapphire': PokemonGen6Sprite;
      'x-z': PokemonGen6Sprite;
    };
    'generation-vii': {
      'icons': PokemonGen7Icon;
      'ultra-sun-ultra-moon': PokemonGen7Sprite;
    };
    'generation-viii': {
      icons: PokemonGen8Icon;
    };
  };
};

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NameWithURL<
    'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed'
  >;
}

export interface Pokemon {
  abilities: PokemonOwnAbility[];
  base_experience: number;
  forms: NameWithURL[];
  game_indices: PokemonGameIndex[];
  height: number;
  held_items: PokemonHeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonOwnMove[];
  name: string;
  order: number;
  past_types: PokemonPastType[];
  species: NameWithURL;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonOwnType[];
  weight: number;
}

export interface PokemonShortInfo {
  entry_number: number;
  name: Pokemon['name'];
  sprite: NonNullable<Pokemon['sprites']['front_default']>;
  types: PokemonOwnType[];
}

export interface PokemonEncounterDetail {
  chance: number;
  condition_values: NameWithURL[];
  max_level: number;
  min_level: number;
  method: NameWithURL;
}

export interface PokemonVersionEncounterDetail {
  version: NameWithURL<PokemonGameVersion>;
  max_chance: number;
  encounter_details: PokemonEncounterDetail[];
}

export interface PokemonLocationAreaEncounter {
  location_area: NameWithURL;
  version_details: PokemonVersionEncounterDetail[];
}

export interface PokemonEffect {
  effect: string;
  language: NameWithURL;
}

export interface VerboseEffect extends PokemonEffect {
  short_effect: string;
}

export interface AbilityFlavorText
  extends Omit<PokemonFlavorTextEntry, 'version'> {
  version_group: NameWithURL;
}

export interface AbilityEffectChange {
  effect_entries: PokemonEffect[];
  version_group: NameWithURL;
}

export interface AbilityPokemon extends Omit<PokemonOwnAbility, 'ability'> {
  pokemon: NameWithURL;
}

export interface PokemonAbility {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: NameWithURL;
  names: OtherName[];
  effect_entries: VerboseEffect[];
  effect_changes: any[];
  flavor_text_entries: AbilityFlavorText[];
  pokemon: AbilityPokemon[];
}

export interface ContestComboDetail {
  use_before: Partial<NameWithURL>;
  use_after: Partial<NameWithURL>;
}

export interface ContestComboSets {
  normal: ContestComboDetail;
  super: ContestComboDetail;
}

export interface MoveFlavorText extends AbilityFlavorText {}

export interface MachineVersionDetail {
  machine: {
    url: string;
  };
  version_group: NameWithURL;
}

export interface MoveMetaData {
  ailment: NameWithURL;
  category: NameWithURL;
  min_hits: number;
  max_hits: number;
  min_turns: number;
  max_turns: number;
  drain: number;
  healing: number;
  crit_rate: number;
  ailment_chance: number;
  flinch_chance: number;
  stat_chance: number;
}

export interface PastMoveStatValues {
  accuracy: number;
  effect_change: number;
  power: number;
  pp: number;
  effect_entries: VerboseEffect[];
  type: NameWithURL;
  version_group: NameWithURL;
}

export interface MoveStatChange {
  change: number;
  stat: NameWithURL;
}

export interface PokemonMove {
  id: number;
  name: string;
  accuracy: number;
  effect_chance: number;
  pp: number;
  priority: number;
  power: number;
  content_combos: ContestComboSets;
  contest_type: NameWithURL;
  contest_effect: {
    url: string;
  };
  damage_class: NameWithURL<MoveCategory>;
  effect_entries: VerboseEffect[];
  effect_changes: AbilityEffectChange[];
  learned_by_pokemon: NameWithURL[];
  flavor_text_entries: MoveFlavorText[];
  generation: NameWithURL;
  machines: MachineVersionDetail[];
  meta: MoveMetaData;
  names: OtherName[];
  past_values: PastMoveStatValues[];
  stat_changes: MoveStatChange;
  super_contest_effect: {
    url: string;
  };
  target: NameWithURL;
  type: NameWithURL<PokemonType>;
}

export interface PokemonOwnMoveDetail {
  name: string;
  move_learn_method: NameWithURL;
  level_learned_at: number;
  accuracy: number;
  power: number;
  pp: number;
  damage_class: NameWithURL<MoveCategory>;
  effect_entries: VerboseEffect;
  type: NameWithURL<PokemonType>;
}

export interface TypeRelations {
  no_damage_to: NameWithURL<PokemonType>[];
  half_damage_to: NameWithURL<PokemonType>[];
  double_damage_to: NameWithURL<PokemonType>[];
  no_damage_from: NameWithURL<PokemonType>[];
  half_damage_from: NameWithURL<PokemonType>[];
  double_damage_from: NameWithURL<PokemonType>[];
}

export interface TypeRelationsPast {
  generation: NameWithURL;
  damage_relations: TypeRelations;
}

export interface TypePokemon {
  slot: number;
  pokemon: NameWithURL;
}

export interface Type {
  id: number;
  name: string;
  damage_relations: TypeRelations;
  past_damage_relations: TypeRelationsPast[];
  game_indices: PokemonGameIndex[];
  move_damage_class: NameWithURL<MoveCategory>;
  names: OtherName[];
  pokemon: TypePokemon[];
  moves: NameWithURL;
}

export interface EvolutionDetail {
  item: NameWithURL;
  trigger: NameWithURL;
  gender: number;
  held_item: NameWithURL;
  known_move: NameWithURL;
  known_move_type: NameWithURL;
  location: NameWithURL;
  min_level: number;
  min_happiness: number;
  min_beauty: number;
  min_affection: number;
  need_overworld_rain: boolean;
  party_species: NameWithURL;
  party_type: NameWithURL;
  relative_physical_stats: number;
  time_of_day: 'day' | 'night';
  trade_species: NameWithURL;
  turn_upside_down: boolean;
}

export interface ChainLink {
  is_baby: boolean;
  species: NameWithURL;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

export interface EvolutionChain {
  id: number;
  baby_trigger_item: NameWithURL;
  chain: ChainLink;
}
