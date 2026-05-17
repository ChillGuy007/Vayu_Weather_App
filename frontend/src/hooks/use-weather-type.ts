/**
 * Maps a weather description string (e.g. from OpenWeatherMap / Open-Meteo)
 * to a `WeatherType` used for background animations.
 */

export type WeatherType =
  | "sunny"
  | "cloudy"
  | "rainy"
  | "stormy"
  | "snowy"
  | "partly-cloudy";

/**
 * Derive the visual weather type from a textual weather description.
 *
 * The function checks for keywords in the description and returns the
 * first matching type. Order matters — more specific patterns (stormy,
 * snowy) are checked before generic ones (cloudy).
 */
export function getWeatherType(description?: string): WeatherType {
  if (!description) return "partly-cloudy";

  const d = description.toLowerCase();

  // Stormy — check first because storms also have rain
  if (
    d.includes("thunder") ||
    d.includes("storm") ||
    d.includes("squall") ||
    d.includes("tornado")
  ) {
    return "stormy";
  }

  // Snowy
  if (
    d.includes("snow") ||
    d.includes("sleet") ||
    d.includes("blizzard") ||
    d.includes("ice") ||
    d.includes("freezing")
  ) {
    return "snowy";
  }

  // Rainy
  if (
    d.includes("rain") ||
    d.includes("drizzle") ||
    d.includes("shower")
  ) {
    return "rainy";
  }

  // Partly cloudy
  if (
    d.includes("partly") ||
    d.includes("few clouds") ||
    d.includes("scattered")
  ) {
    return "partly-cloudy";
  }

  // Cloudy
  if (
    d.includes("cloud") ||
    d.includes("overcast") ||
    d.includes("mist") ||
    d.includes("fog") ||
    d.includes("haze") ||
    d.includes("smoke")
  ) {
    return "cloudy";
  }

  // Sunny / clear
  if (
    d.includes("clear") ||
    d.includes("sun") ||
    d.includes("fair")
  ) {
    return "sunny";
  }

  return "partly-cloudy";
}
