import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginViewProps {
  onLogin?: () => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const lidarComEnvio = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setErro('');


    if (email === 'admin@teste.com' && senha === '123456') {
      // mock
      if (onLogin) {
        onLogin();
      } else {
        localStorage.setItem('@weatherApp:token', 'true');
      }
      navigate('/dashboard');
    } else {
      setErro('E-mail ou senha incorretos! (Use: admin@teste.com / 123456)');
    }
  };


  return (
    <div style={{ maxWidth: '350px', margin: '100px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}> Acessar Conta</h2>
      
      {erro && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center', fontWeight: 'bold' }}>{erro}</p>}

      <form onSubmit={lidarComEnvio}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>E-mail:</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="senha" style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Senha:</label>
          <input
            type="password"
            id="senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
