import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LoginView } from './views/auth/Login';

function Dashboard() {
  return <h2>Dashboard em Tempo Real</h2>;
}

function Listagem() {
  return <h2> Tela de Listagem e Busca</h2>;
}

function Configuracoes() {
  return <h2> Configurações</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginView />} />
        
        <Route path="/dashboard" element={<LayoutInterno><Dashboard /></LayoutInterno>} />
        <Route path="/listagem" element={<LayoutInterno><Listagem /></LayoutInterno>} />
        <Route path="/configuracoes" element={<LayoutInterno><Configuracoes /></LayoutInterno>} />
      </Routes>
    </BrowserRouter>
  );
}

function LayoutInterno({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '220px', backgroundColor: '#212529', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3>Menu</h3>
        <Link to="/dashboard" style={estiloLink}>📊 Dashboard</Link>
        <Link to="/listagem" style={estiloLink}>🔍 Listagem</Link>
        <Link to="/configuracoes" style={estiloLink}>⚙️ Configurações</Link>
        <hr style={{ width: '100%', borderColor: '#444' }} />
        <Link to="/" style={{ ...estiloLink, color: '#ff6b6b' }}>🚪 Sair</Link>
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
