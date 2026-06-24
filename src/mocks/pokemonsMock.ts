import type { Pokemon } from '../types/pokemon';

export const MOCK_POKEMONS: Pokemon[] = [
  { id: 1, name: 'Bulbasaur', types: ['Grass', 'Poison'], hp: 45, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
  { id: 4, name: 'Charmander', types: ['Fire'], hp: 39, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
  { id: 7, name: 'Squirtle', types: ['Water'], hp: 44, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' }, 
  { id: 1, name: 'Bulbasaur', types: ['Grass', 'Poison'], hp: 45, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
  { id: 4, name: 'Charmander', types: ['Fire'], hp: 39, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
  { id: 7, name: 'Squirtle', types: ['Water'], hp: 44, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' }, 
  { id: 1, name: 'Bulbasaur', types: ['Grass', 'Poison'], hp: 45, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
  { id: 4, name: 'Charmander', types: ['Fire'], hp: 39, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
  { id: 7, name: 'Squirtle', types: ['Water'], hp: 44, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' }, 
  { id: 25, name: 'Pikachu', types: ['Electric'], hp: 35, image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' }
];

export function createMockSSE(onData: (d: Pokemon[] | Pokemon) => void) {
  onData(MOCK_POKEMONS);

  const interval = window.setInterval(() => {
    // simula alteração aleatória no HP de um pokemon
    const copy = MOCK_POKEMONS.map((p) => ({ ...p }));
    const idx = Math.floor(Math.random() * copy.length);
    const delta = Math.floor(Math.random() * 7) - 3;
    copy[idx].hp = Math.max(1, Math.min(100, copy[idx].hp + delta));
    // envia um único objeto atualizado
    onData(copy[idx]);
  }, 4000);

  return {
    close() {
      clearInterval(interval);
    }
  } as const;
}
