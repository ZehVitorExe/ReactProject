import { useEffect, useRef, useState, useCallback } from 'react';
import type { Pokemon } from '../types/pokemon';
import { getPokemons } from '../services/PokemonService';

export function usePokemons(page = 1, pageSize = 20, pollInterval = 0) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pollRef = useRef<number | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const data = await getPokemons(page, pageSize);
      setPokemons(data);
      setError(null);
    } catch (e: Error | unknown) {
      setError(e instanceof Error ? e.message : 'Falha ao buscar pokemons');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    setLoading(true);
    fetchData();

    if (pollInterval > 0) {
      pollRef.current = window.setInterval(fetchData, pollInterval);
    }

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [fetchData, pollInterval]);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  const hasMore = pokemons.length === pageSize;

  return { pokemons, loading, error, refresh, hasMore } as const;
}
