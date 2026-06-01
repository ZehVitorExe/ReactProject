import React, { useState } from 'react';
import type { LoginFormData, UsuarioLogado } from '../types/auth.ts';

export function Login() {
  // Inicializa o estado usando a interface criada
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    senha: '',
  });
  
  const [erro, setErro] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null);

  // Tipando o evento de mudança do Input genérico
  const lidarMudancaInput = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evento.target;
    setFormData((dadosAnteriores) => ({
      ...dadosAnteriores,
      [name]: value,
    }));
  };

  // Tipando o evento de envio do Formulário
  const lidarEnvioFormulario = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setErro(null);

    // Validação básica simples
    if (!formData.email || !formData.senha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Simulação de requisição para API (Substitua pelo seu fetch/axios)
      if (formData.email === 'user@teste.com' && formData.senha === '123456') {
        const respostaSimulada: UsuarioLogado = {
          id: '1',
          nome: 'Fulano de Tal',
          email: formData.email,
          token: 'seu-jwt-token-aqui',
        };
        
        setUsuario(respostaSimulada);
        localStorage.setItem('token', respostaSimulada.token); // Salva a sessão
      } else {
        setErro('E-mail ou senha incorretos.');
      }
    } catch (err) {
      setErro('Erro de conexão com o servidor: ' + err);
    }
  };

  if (usuario) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Bem-vindo, {usuario.nome}!</h2>
        <p>Você está autenticado com sucesso.</p>
        <button onClick={() => setUsuario(null)}>Sair</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Acessar Conta</h2>
      
      {erro && <p style={{ color: 'red', fontWeight: 'bold' }}>{erro}</p>}

      <form onSubmit={lidarEnvioFormulario}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={lidarMudancaInput}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="senha" style={{ display: 'block', marginBottom: '5px' }}>Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={lidarMudancaInput}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}
