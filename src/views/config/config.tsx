import React, { useState, useEffect } from 'react';
import { useConfig } from '../../contexts/configContext';
import type { UserProfile } from '../../contexts/configContext';

export const SettingsScreen: React.FC = () => {
  const { profile, theme, updateProfile, toggleTheme } = useConfig();
  
  const [formData, setFormData] = useState<UserProfile>({ ...profile });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
 //   setFormData({ ...profile });
  }, [profile]);

  const isDark = theme === 'dark';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div style={{ fontFamily: '"Segoe UI", Roboto, sans-serif', maxWidth: '450px', margin: '20px auto', padding: '0 20px' }}>
      <div style={{
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        backgroundColor: isDark ? '#161625' : '#ffffff',
        color: isDark ? '#f7f9fc' : '#2b2d42',
        border: isDark ? '1px solid #2d2d44' : '1px solid #e2e8f0',
      }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: 600 }}>Configurações</h2>

        {/* Seção de Aparência */}
        <div style={{ borderTop: '1px solid rgba(141, 153, 174, 0.2)', paddingTop: '16px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', margin: '0 0 16px 0', color: '#8d99ae', fontWeight: 600, textTransform: 'uppercase' }}>Aparência</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '15px' }}>
            <span>Modo Escuro (Dark Mode)</span>
<button 
  type="button"
  onClick={() => toggleTheme()} // Executa a função do contexto diretamente
  style={{ 
    width: '50px',
    height: '26px',
    borderRadius: '15px',
    border: 'none',
    padding: '3px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease',
    backgroundColor: theme === 'dark' ? '#4ade80' : '#cbd5e1',
    justifyContent: theme === 'dark' ? 'flex-end' : 'flex-start'
  }}
>
  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
</button>

          </div>
        </div>

        {/* Formulário de Perfil */}
        <form onSubmit={handleSubmit} style={{ borderTop: '1px solid rgba(141, 153, 174, 0.2)', paddingTop: '16px' }}>
          <h3 style={{ fontSize: '14px', margin: '0 0 16px 0', color: '#8d99ae', fontWeight: 600, textTransform: 'uppercase' }}>Perfil do Usuário</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '14px' }}>
            <label style={{ fontSize: '13px', marginBottom: '6px', fontWeight: 500 }}>Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: isDark ? '#22223b' : '#f8fafc',
                color: isDark ? '#ffffff' : '#2b2d42',
                border: isDark ? '1px solid #4a4a6a' : '1px solid #cbd5e1',
              }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '14px' }}>
            <label style={{ fontSize: '13px', marginBottom: '6px', fontWeight: 500 }}>E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: isDark ? '#22223b' : '#f8fafc',
                color: isDark ? '#ffffff' : '#2b2d42',
                border: isDark ? '1px solid #4a4a6a' : '1px solid #cbd5e1',
              }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', marginBottom: '6px', fontWeight: 500 }}>Cidade Padrão</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: isDark ? '#22223b' : '#f8fafc',
                color: isDark ? '#ffffff' : '#2b2d42',
                border: isDark ? '1px solid #4a4a6a' : '1px solid #cbd5e1',
              }}
              required
            />
          </div>

          <button 
            type="submit" 
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#4a90e2',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Salvar Configurações
          </button>

          {isSaved && (
            <p style={{ color: '#4ade80', textAlign: 'center', fontSize: '14px', marginTop: '12px', fontWeight: 'bold' }}>
              ✓ Alterações guardadas!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
