/**
 * Platform detection utilities for Capacitor native vs. web browser.
 * Capacitor injects a `Capacitor` object on `window` when running inside
 * a native WebView (Android / iOS).
 */

export const isNativePlatform = (): boolean => {
  return !!(window as any).Capacitor?.isNativePlatform;
};

export const getPlatform = (): "android" | "ios" | "web" => {
  const cap = (window as any).Capacitor;
  if (cap?.getPlatform) return cap.getPlatform();
  if (cap?.isNativePlatform) return "android"; // fallback
  return "web";
};
