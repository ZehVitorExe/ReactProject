import React from 'react';
import { useWeather } from '../../hooks/usaClimahook';

export const WeatherDashboard: React.FC = () => {
  const { data, loading, error } = useWeather(-29.959, -51.707);
  if (loading) return <div style={styles.center}>Carregando dados do clima...</div>;
  if (error) return <div style={{ ...styles.center, color: '#e63946' }}>Erro: {error}</div>;
  if (!data) return null;

  return (
    <div style={styles.container}>
      <div style={styles.mainCard}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>São Jeronimo</h2>
            <p style={styles.subtitle}>Clima Atual</p>
          </div>
          <span style={styles.weatherIcon}>☀️</span>
        </div>

        <div style={styles.tempContainer}>
          <h1 style={styles.temperature}>{data.current.temperature_2m}°C</h1>
        </div>

        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>💨 Vento</span>
            <span style={styles.infoValue}>{data.current.wind_speed_10m} km/h</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>🕒 Atualizado</span>
            <span style={styles.infoValue}>
              {new Date(data.current.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {/* Seção Secundária: Previsão Horária */}
      <div style={styles.forecastContainer}>
        <h3 style={styles.sectionTitle}>Próximas Horas</h3>
        <div style={styles.hourlyScroll}>
          {data.hourly.time.slice(0, 6).map((time, index) => (
            <div key={time} style={styles.hourlyCard}>
              <span style={styles.hourlyTime}>
                {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span style={styles.hourlyIcon}>🌤️</span>
              <span style={styles.hourlyTemp}>{data.hourly.temperature_2m[index]}°C</span>
              <span style={styles.hourlyHumidity}>💧 {data.hourly.relative_humidity_2m[index]}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Estilos rápidos inline para manter o exemplo auto-contido e limpo
const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    maxWidth: '450px',
    margin: '40px auto',
    padding: '0 20px',
    color: '#2b2d42',
  },
  center: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '16px',
  },
  mainCard: {
    background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
    borderRadius: '20px',
    padding: '24px',
    color: '#ffffff',
    boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
    marginBottom: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    margin: 0,
    fontSize: '28px',
    fontWeight: 600,
  },
  subtitle: {
    margin: '4px 0 0 0',
    opacity: 0.8,
    fontSize: '14px',
  },
  weatherIcon: {
    fontSize: '44px',
  },
  tempContainer: {
    margin: '24px 0',
  },
  temperature: {
    margin: 0,
    fontSize: '56px',
    fontWeight: 300,
    letterSpacing: '-2px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    borderTop: '1px solid rgba(255,255,255,0.2)',
    paddingTop: '16px',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  infoLabel: {
    fontSize: '12px',
    opacity: 0.8,
    marginBottom: '4px',
  },
  infoValue: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  forecastContainer: {
    marginTop: '10px',
  },
  sectionTitle: {
    fontSize: '18px',
    margin: '0 0 12px 4px',
    fontWeight: 600,
  },
  hourlyScroll: {
    display: 'flex',
    gap: '12px',
    overflowX: 'auto',
    paddingBottom: '8px',
  },
  hourlyCard: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '12px 16px',
    minWidth: '70px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    border: '1px solid #f0f0f0',
  },
  hourlyTime: {
    fontSize: '12px',
    color: '#8d99ae',
    fontWeight: 500,
  },
  hourlyIcon: {
    fontSize: '20px',
    margin: '6px 0',
  },
  hourlyTemp: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#2b2d42',
  },
  hourlyHumidity: {
    fontSize: '11px',
    color: '#4a90e2',
    marginTop: '4px',
  },
};
