export interface WeatherCurrent {
  time: string;
  temperature_2m: number;
  wind_speed_10m: number;
}

export interface WeatherHourly {
  time: string[];
  wind_speed_10m: number[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: Record<string, string>;
  current: WeatherCurrent;
  hourly_units: Record<string, string>;
  hourly: WeatherHourly;
}
