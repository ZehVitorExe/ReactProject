import { useState, useEffect } from 'react';
import type { WeatherResponse } from '../types/clima';
import { fetchWeatherData } from '../services/OpenMeteorService';

export const useWeather = (lat: number, lon: number) => {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(null);
        const weatherData = await fetchWeatherData(lat, lon);
        setData(weatherData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido.');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [lat, lon]);

  return { data, loading, error };
};
