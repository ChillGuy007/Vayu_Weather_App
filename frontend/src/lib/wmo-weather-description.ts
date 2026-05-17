/**
 * Maps WMO Weather Interpretation Codes (0–99) to human-readable descriptions.
 * Reference: https://open-meteo.com/en/docs#weathervariables
 *
 * These descriptions are intentionally worded so that `getWeatherType()`
 * in `use-weather-type.ts` can match on keywords like "rain", "thunder",
 * "snow", "cloud", "clear", etc.
 */

const WMO_DESCRIPTIONS: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Freezing light drizzle",
  57: "Freezing dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Freezing light rain",
  67: "Freezing heavy rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

/**
 * Convert a WMO weather code to a textual description.
 * Falls back to "Partly cloudy" for unknown codes.
 */
export function wmoCodeToDescription(code: number): string {
  return WMO_DESCRIPTIONS[code] ?? "Partly cloudy";
}
