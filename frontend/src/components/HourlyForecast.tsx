import { motion } from "framer-motion";
import { Cloud, Sun, CloudRain, CloudSun } from "lucide-react";

const hours = [
  { time: "Now", temp: "32°", Icon: CloudSun },
  { time: "2 PM", temp: "33°", Icon: Sun },
  { time: "3 PM", temp: "34°", Icon: Sun },
  { time: "4 PM", temp: "33°", Icon: CloudSun },
  { time: "5 PM", temp: "31°", Icon: Cloud },
  { time: "6 PM", temp: "29°", Icon: CloudRain },
  { time: "7 PM", temp: "27°", Icon: CloudRain },
  { time: "8 PM", temp: "26°", Icon: Cloud },
];

const HourlyForecast = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="glass rounded-2xl p-4"
    >
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
        Hourly Forecast
      </p>
      <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
        {hours.map((h, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 min-w-[48px]"
          >
            <span className="text-xs text-muted-foreground">{h.time}</span>
            <h.Icon className="w-5 h-5 text-primary/80" strokeWidth={1.5} />
            <span className="text-sm font-medium text-foreground">{h.temp}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default HourlyForecast;
