import React, { useMemo, useState } from 'react';
import { useConfig } from '../../contexts/configContext';
import { usePokemons } from '../../hooks/usePokemons';
import type { Pokemon } from '../../types/pokemon';
import { Input } from '../../components/Input';
import { PokemonCard } from '../../components/PokemonCard';
import { Pagination } from '../../components/Pagination';

export const ListScreen: React.FC = () => {
  const { theme } = useConfig();
  const isDark = theme === 'dark';

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { pokemons, loading, error, hasMore } = usePokemons(page, pageSize);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pokemons;
    return pokemons.filter((p) => p.name.toLowerCase().includes(q));
  }, [pokemons, query]);

  if (loading) return <p>Carregando pokémons...</p>;
  if (error) return <p style={{ color: 'crimson' }}>Erro: {error}</p>;

  return (
    <div className="container">
      <h2>Lista de Pokémons</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginTop: 12 }}>
        <Input aria-label="Buscar pokémon por nome" placeholder="Buscar por nome..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ flex: '1 1 300px', maxWidth: 480 }} />
      </div>

      <div className="grid" style={{ marginTop: 12 }}>
        {filtered.map((p: Pokemon) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>

      <Pagination page={page} onPageChange={setPage} hasMore={hasMore} />
    </div>
  );
};
