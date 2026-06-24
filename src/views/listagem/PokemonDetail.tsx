import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonById, getPokemonSpeciesDescription } from '../../services/PokemonService';
import type { Pokemon } from '../../types/pokemon';
import { Card } from '../../components/Card';

export const PokemonDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const p = await getPokemonById(Number(id));
        if (!mounted) return;
        if (!p) {
          setError('Pokémon não encontrado');
        } else {
          setPokemon(p);
          // fetch species description
          try {
            const desc = await getPokemonSpeciesDescription(p.id);
            if (mounted && desc) setDescription(desc);
          } catch (e) {
            console.error('Erro ao buscar descrição do pokémon', e);
          }
        }
      } catch (e) {
        setError('Falha ao carregar o Pokémon '+  e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    void load();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: 40 }}>Carregando...</div>;
  if (error) return <div style={{ textAlign: 'center', color: '#e63946', marginTop: 40 }}>{error}</div>;
  if (!pokemon) return null;

  return (
    <div style={{ maxWidth: 700, margin: '24px auto' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>← Voltar</button>
      <Card style={{ display: 'flex', gap: 20, padding: 24 }}>
        <div style={{ width: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={pokemon.image} alt={pokemon.name} style={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ marginTop: 0, textTransform: 'capitalize' }}>{pokemon.name}</h2>
          <p style={{ color: 'var(--muted)' }}><strong>Tipos:</strong> {pokemon.types.join(', ')}</p>
          <p><strong>HP:</strong> {pokemon.hp}</p>

          <div style={{ marginTop: 12 }}>
            <h4>Descrição</h4>
            <p style={{ color: '#444' }}>{description ?? 'Descrição não disponível.'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PokemonDetail;
