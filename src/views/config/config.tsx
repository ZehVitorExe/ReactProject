import React, { useState, useEffect } from 'react';
import { useConfig } from '../../contexts/configContext';
import type { UserProfile } from '../../contexts/configContext';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export const SettingsScreen: React.FC = () => {
  const { profile, theme, updateProfile, toggleTheme } = useConfig();
  
  const [formData, setFormData] = useState<UserProfile>({ ...profile });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setFormData({ ...profile });
  }, [profile]);

  const isDark = theme === 'dark';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value } as UserProfile));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const num = value === '' ? undefined : parseFloat(value);
    setFormData((prev) => ({ ...prev, [name]: num } as UserProfile));
  };

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);

    // senha apenas simbólico
    if (newPassword) {
      if (newPassword === confirmPassword) {
        setPasswordMsg('✓ Senha alterada (simulado)');
      } else {
        setPasswordMsg('Senha nova e confirmação não conferem');
      }
      // limpa campos 
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordMsg(null), 3000);
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '20px auto', padding: '0 20px', boxSizing: 'border-box' }}>
      <Card style={{ padding: 24 }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: 600 }}>Configurações</h2>

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

        <form onSubmit={handleSubmit} style={{ borderTop: '1px solid rgba(141, 153, 174, 0.2)', paddingTop: '16px' }}>
          <h3 style={{ fontSize: '14px', margin: '0 0 16px 0', color: '#8d99ae', fontWeight: 600, textTransform: 'uppercase' }}>Perfil do Usuário</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '14px' }}>
            <label style={{ fontSize: '13px', marginBottom: '6px', fontWeight: 500 }}>Nome</label>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', marginBottom: '6px', fontWeight: 500 }}>Cidade Padrão</label>
            <Input type="text" name="city" value={formData.city} onChange={handleChange} style={{ width: '100%' }} required />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '13px', marginBottom: '6px', fontWeight: 500 }}>Latitude</label>
              <Input type="number" name="lat" value={formData.lat ?? ''} onChange={handleNumberChange} step="any" style={{ width: '100%' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '13px', marginBottom: '6px', fontWeight: 500 }}>Longitude</label>
              <Input type="number" name="lon" value={formData.lon ?? ''} onChange={handleNumberChange} step="any" style={{ width: '100%' }} />
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(141, 153, 174, 0.12)', paddingTop: 12, marginBottom: 12, boxSizing: 'border-box' }}>
            <h4 style={{ margin: '8px 0', fontSize: 13, color: '#8d99ae' }}>Alterar Senha (simulado)</h4>
            <Input type="password" placeholder="Senha atual" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
            <Input type="password" placeholder="Nova senha" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
            <Input type="password" placeholder="Confirmar nova senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
            {passwordMsg && <p style={{ margin: 0, color: passwordMsg.startsWith('✓') ? '#4ade80' : '#e63946' }}>{passwordMsg}</p>}
          </div>

          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: 6 }}>
            Salvar Configurações
          </Button>

          {isSaved && (
            <p style={{ color: '#4ade80', textAlign: 'center', fontSize: '14px', marginTop: '12px', fontWeight: 'bold' }}>
              ✓ Alterações guardadas!
            </p>
          )}
        </form>
      </Card>
    </div>
  );
};
