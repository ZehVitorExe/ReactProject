import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  city: string;
}

export type AppTheme = 'light' | 'dark';

interface ConfigContextType {
  profile: UserProfile;
  theme: AppTheme;
  updateProfile: (newProfile: UserProfile) => void;
  toggleTheme: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

const DEFAULT_PROFILE: UserProfile = {
  name: 'Usuário',
  email: 'usuario@email.com',
  city: 'Berlim',
};

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('@weatherApp:profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [theme, setTheme] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem('@weatherApp:theme');
      return (saved as AppTheme) === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('@weatherApp:theme', theme);
      const root = window.document.documentElement;
      if (theme === 'dark') {
        root.style.backgroundColor = '#1a1a2e';
        root.style.color = '#f7f9fc';
      } else {
        root.style.backgroundColor = '#f7f9fc';
        root.style.color = '#2b2d42';
      }
    } catch (e) {
      console.error("Falha ao salvar tema no LocalStorage", e);
    }
  }, [theme]);

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem('@weatherApp:profile', JSON.stringify(newProfile));
    } catch (e) {
      console.error("Falha ao salvar perfil no LocalStorage", e);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ConfigContext.Provider value={{ profile, theme, updateProfile, toggleTheme }}>
      {children}
    </ConfigContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useConfig = () => {
  const context = useContext(ConfigContext);
  // Se o hook for usado fora do Provider, ele retorna um objeto dummy seguro em vez de crashar a tela
  if (!context) {
    console.warn("useConfig foi chamado fora de um ConfigProvider. Retornando valores padrão.");
    return {
      profile: DEFAULT_PROFILE,
      theme: 'light' as AppTheme,
      updateProfile: () => {},
      toggleTheme: () => {}
    };
  }
  return context;
};
