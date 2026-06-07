import type { WeatherResponse } from '../types/clima';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherResponse> => {
  const url = `${BASE_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Falha ao buscar os dados meteorológicos.');
  }
  
  return response.json();
};
