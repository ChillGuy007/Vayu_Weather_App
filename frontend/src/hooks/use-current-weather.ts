import { useQuery } from "@tanstack/react-query";
import { wmoCodeToDescription } from "@/lib/wmo-weather-description";

/** Default coordinates — New Delhi */
const DEFAULT_LAT = 28.6139;
const DEFAULT_LON = 77.209;

interface OpenMeteoCurrentWeather {
  temperature: number;
  windspeed: number;
  weathercode: number;
}

interface OpenMeteoResponse {
  current_weather: OpenMeteoCurrentWeather;
}

export interface CurrentWeather {
  /** Human-readable description, e.g. "Slight rain" */
  description: string;
  /** Raw WMO weather code */
  weatherCode: number;
  /** Temperature in °C */
  temperature: number;
  /** Wind speed in km/h */
  windSpeed: number;
}

async function fetchCurrentWeather(
  lat: number,
  lon: number
): Promise<CurrentWeather> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Open-Meteo error: ${res.status}`);
  const data: OpenMeteoResponse = await res.json();
  const cw = data.current_weather;
  return {
    description: wmoCodeToDescription(cw.weathercode),
    weatherCode: cw.weathercode,
    temperature: cw.temperature,
    windSpeed: cw.windspeed,
  };
}

/**
 * React hook that fetches the current weather conditions from Open-Meteo.
 *
 * Defaults to New Delhi (28.61 N, 77.21 E). Results are cached for 10 minutes
 * via React Query.
 */
export function useCurrentWeather(
  lat: number = DEFAULT_LAT,
  lon: number = DEFAULT_LON
) {
  return useQuery<CurrentWeather>({
    queryKey: ["currentWeather", lat, lon],
    queryFn: () => fetchCurrentWeather(lat, lon),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
}
