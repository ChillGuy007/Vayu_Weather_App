import Navbar from "@/components/Navbar";
import WeatherHero from "@/components/WeatherHero";
import RainfallForecast from "@/components/RainfallForecast";
import HourlyForecast from "@/components/HourlyForecast";
import WeeklyForecast from "@/components/WeeklyForecast";
import AirQuality from "@/components/AirQuality";
import WeatherDetailsGrid from "@/components/WeatherDetailsGrid";
import SunsetSunrise from "@/components/SunsetSunrise";
import LifestyleTips from "@/components/LifestyleTips";
import AnomalyBanner from "@/components/AnomalyBanner";
import WeatherBackground from "@/components/WeatherBackground";
import BottomNav from "@/components/BottomNav";
import { getWeatherType } from "@/hooks/use-weather-type";
import { useCurrentWeather } from "@/hooks/use-current-weather";

const Index = () => {
  // Fetch live weather from Open-Meteo and auto-detect the weather type.
  const { data: currentWeather } = useCurrentWeather();
  const weather = getWeatherType(currentWeather?.description);

  return (
    <div className={`min-h-screen relative pb-24 weather-${weather} transition-colors duration-700`}>
      <WeatherBackground weather={weather} />
      <div className="relative z-10 max-w-md mx-auto px-5">
        <Navbar />

        <WeatherHero />

        <div className="space-y-4 pb-12">
          <RainfallForecast />
          <HourlyForecast />
          <WeeklyForecast />

          {/* 15-day button */}
          <button className="w-full glass rounded-2xl py-3 text-sm font-medium text-foreground hover:bg-card/80 transition-colors">
            15-day weather forecast
          </button>

          <AirQuality />
          <WeatherDetailsGrid />
          <SunsetSunrise />
          <LifestyleTips />
          <AnomalyBanner />
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Index;
