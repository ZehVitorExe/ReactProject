import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { LoginView } from './views/auth/Login';
import { WeatherDashboard } from './views/dash/dashboard';
import { SettingsScreen } from './views/config/config';

function Listagem() {
  return <h2>Tela de Listagem e Busca</h2>;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('@weatherApp:token') === 'true';
  });

  // Função para simular o Login
  const login = () => {
    localStorage.setItem('@weatherApp:token', 'true');
    setIsAuthenticated(true);
  };
  

  // Função para fazer o Logout
  const logout = () => {
    localStorage.removeItem('@weatherApp:token');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginView onLogin={login} />} 
        />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <LayoutInterno onLogout={logout}><WeatherDashboard/></LayoutInterno>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/listagem" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <LayoutInterno onLogout={logout}><Listagem /></LayoutInterno>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/configuracoes" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <LayoutInterno onLogout={logout}><SettingsScreen /></LayoutInterno>
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

function ProtectedRoute({ isAuthenticated, children }: ProtectedRouteProps) {
  if (!isAuthenticated) {
    // Redireciona para o login 
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

interface LayoutInternoProps {
  children: React.ReactNode;
  onLogout: () => void;
}

function LayoutInterno({ children, onLogout }: LayoutInternoProps) {
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault(); // Impede o link de disparar navegação padrão por href
    onLogout();         // Limpa os tokens  e localStorage
    navigate('/', { replace: true }); // Redireciona para login
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '220px', backgroundColor: '#212529', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3>Menu</h3>
        <Link to="/dashboard" style={estiloLink}>📊 Dashboard</Link>
        <Link to="/listagem" style={estiloLink}>🔍 Listagem</Link>
        <Link to="/configuracoes" style={estiloLink}>⚙️ Configurações</Link>
        <hr style={{ width: '100%', borderColor: '#444' }} />
        <button onClick={handleLogout} style={estiloBotaoSair}>
          🚪 Sair
        </button>
      </aside>
      <main style={{ flex: 1, padding: '30px', backgroundColor: '#f8f9fa' }}>
        {children}
      </main>
    </div>
  );
}

const estiloLink = {
  color: '#cfd4da',
  textDecoration: 'none',
  padding: '10px',
  display: 'block',
  borderRadius: '4px'
};

const estiloBotaoSair: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#ff6b6b',
  padding: '10px',
  display: 'block',
  borderRadius: '4px',
  textAlign: 'left',
  width: '100%',
  fontSize: '16px',
  cursor: 'pointer',
  fontFamily: 'inherit'
};
