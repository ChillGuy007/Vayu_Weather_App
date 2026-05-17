import { motion } from "framer-motion";
import { Sun, Cloud, CloudRain, CloudSun, CloudLightning } from "lucide-react";

const days = [
  { day: "Mon", Icon: Sun, high: 36, low: 24 },
  { day: "Tue", Icon: CloudSun, high: 34, low: 23 },
  { day: "Wed", Icon: Cloud, high: 31, low: 22 },
  { day: "Thu", Icon: CloudRain, high: 28, low: 21 },
  { day: "Fri", Icon: CloudLightning, high: 27, low: 20 },
  { day: "Sat", Icon: CloudRain, high: 29, low: 21 },
  { day: "Sun", Icon: Sun, high: 33, low: 23 },
];

const WeeklyForecast = () => {
  const maxHigh = Math.max(...days.map((d) => d.high));
  const minLow = Math.min(...days.map((d) => d.low));
  const range = maxHigh - minLow;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.6 }}
      className="glass rounded-2xl p-4"
    >
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
        7-Day Forecast
      </p>
      <div className="space-y-3">
        {days.map((d, i) => {
          const leftPct = ((d.low - minLow) / range) * 100;
          const widthPct = ((d.high - d.low) / range) * 100;
          return (
            <div key={i} className="flex items-center gap-3">
              <span className="w-8 text-sm text-muted-foreground">{d.day}</span>
              <d.Icon className="w-4 h-4 text-primary/70 shrink-0" strokeWidth={1.5} />
              <span className="w-8 text-right text-sm text-muted-foreground">{d.low}°</span>
              <div className="flex-1 h-1 rounded-full bg-muted relative mx-2">
                <div
                  className="absolute h-full rounded-full bg-gradient-to-r from-accent to-primary"
                  style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                />
              </div>
              <span className="w-8 text-sm text-foreground">{d.high}°</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default WeeklyForecast;
