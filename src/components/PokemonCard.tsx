import React from 'react';
import type { Pokemon } from '../types/pokemon';
import { Card } from './Card';
import { Link } from 'react-router-dom';

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  return (
    <Link to={`/pokemon/${pokemon.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={pokemon.image} alt={pokemon.name} style={{ width: 160, height: 160, objectFit: 'contain', maxWidth: '100%' }} />
        <h3 style={{ margin: '8px 0 4px 0' }}>{pokemon.name}</h3>
        <p style={{ margin: 0, color: 'var(--muted)' }}>{pokemon.types.join(', ')}</p>
        <div style={{ marginTop: 8, width: '100%', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="hp-track">
            <div className="hp-fill" style={{ width: `${Math.min(100, pokemon.hp)}%`, background: pokemon.hp > 50 ? '#4ade80' : '#f59e0b' }} />
          </div>
          <span style={{ fontWeight: 600 }}>{pokemon.hp} HP</span>
        </div>
      </Card>
    </Link>
  );
};

export default PokemonCard;
