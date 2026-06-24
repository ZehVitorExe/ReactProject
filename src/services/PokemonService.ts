import { MOCK_POKEMONS, createMockSSE } from '../mocks/pokemonsMock';
import type { Pokemon } from '../types/pokemon';

const API_URL = '/api/pokemons';
const SSE_URL = '/api/pokemons/stream';

export async function getPokemons(page = 1, pageSize = 20): Promise<Pokemon[]> {
  const LIMIT = pageSize;
  const offset = (page - 1) * pageSize;

  try {
    const listRes = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`);
    if (listRes.ok) {
      const listJson = await listRes.json();
      const entries: Array<{ name: string; url: string }> = listJson.results || [];

      const details = await Promise.all(entries.map(async (e) => {
        try {
          const r = await fetch(e.url);
          if (!r.ok) return null;
          const d = await r.json();
          const image = (d.sprites?.other?.['official-artwork']?.front_default) || d.sprites?.front_default || '';
          const types: string[] = (d.types || []).map((t: any) => t.type?.name).filter(Boolean);
          const hp = Math.floor(50 + Math.random() * 100); // hp randomizado entre 50 e 150
          return { id: d.id, name: d.name, types, hp, image } as Pokemon;
        } catch (e) {
            console.error('Erro ao buscar detalhes do pokémon', e);
          return null;
        }
      }));

      const pokes = details.filter(Boolean) as Pokemon[];
      if (pokes.length > 0) return pokes;
    }
  } catch (err) {
    console.warn('PokeAPI inacessível ou falha ao buscar — tentando backend local', err);
  }

  try {
    const res = await fetch(API_URL + `?limit=${LIMIT}&offset=${offset}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const contentType = res.headers.get('content-type') || '';
    if (contentType.indexOf('application/json') === -1) {
      return Promise.resolve(MOCK_POKEMONS.slice(offset, offset + LIMIT));
    }

    try {
      const json = await res.json();
      if (Array.isArray(json)) return json;
      if (Array.isArray(json.items)) return json.items;
      return MOCK_POKEMONS.slice(offset, offset + LIMIT);
    } catch (err) {
      console.warn('Falha parseando JSON pokemons do backend — usando mock', err);
      return Promise.resolve(MOCK_POKEMONS.slice(offset, offset + LIMIT));
    }
  } catch (e) {
    console.warn('Falha ao buscar pokemons do backend — usando mock', e);
    return Promise.resolve(MOCK_POKEMONS.slice(offset, offset + LIMIT));
  }
}

export function connectPokemonsSSE(onData: (d: Pokemon[] | Pokemon) => void): EventSource | null {
  try {
    const es = new EventSource(SSE_URL);
    es.onmessage = (ev) => {
      try {
        const parsed = JSON.parse(ev.data) as Pokemon[] | Pokemon;
        onData(parsed);
      } catch (err) {
        console.error('Erro parseando SSE pokemons', err);
      }
    };
    es.onerror = (ev) => {
      console.warn('SSE pokemons erro', ev);
    };
    return es;
  } catch (e) {
    console.warn('EventSource não disponível — usando mock SSE', e);
    return (createMockSSE(onData) as unknown) as EventSource;
  }
}

export async function getPokemonById(id: number): Promise<Pokemon | null> {
  // try pokeapi
  try {
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (r.ok) {
      const d = await r.json();
      const image = (d.sprites?.other?.['official-artwork']?.front_default) || d.sprites?.front_default || '';
      const types: string[] = (d.types || []).map((t: any) => t.type?.name).filter(Boolean);
      const hp = Math.floor(50 + Math.random() * 100);
      return { id: d.id, name: d.name, types, hp, image } as Pokemon;
    }
  } catch (e) {
    console.warn('Erro ao buscar pokémon pela PokeAPI', e);
  }

  // fallback pro mock
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (res.ok) {
      const json = await res.json();
      if (json) return json as Pokemon;
    }
  } catch (e) {
    console.warn('Erro ao buscar pokémon pelo backend local', e);
  }

  const found = MOCK_POKEMONS.find((p) => p.id === id) || null;
  return found;
}

export async function getPokemonSpeciesDescription(id: number): Promise<string | null> {
  try {
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    if (!r.ok) return null;
    const json = await r.json();
    const entries: Array<{ flavor_text: string; language: { name: string } }> = json.flavor_text_entries || [];
    const pt = entries.find((e) => e.language?.name === 'pt');
    const en = entries.find((e) => e.language?.name === 'en');
    const chosen = pt || en || entries[0];
    if (!chosen) return null;
    return chosen.flavor_text.replace(/\n|\f/gu, ' ').trim();
  } catch (e) {
    console.warn('Erro ao buscar species do pokémon', e);
    return null;
  }
}
