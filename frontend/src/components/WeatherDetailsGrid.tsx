import { motion } from "framer-motion";
import { Sun, Thermometer, Droplets, Wind, Gauge, Eye } from "lucide-react";

const stats = [
  { icon: Sun, label: "UV", value: "0", sub: "Very weak" },
  { icon: Thermometer, label: "Feels like", value: "28°", sub: "" },
  { icon: Droplets, label: "Humidity", value: "82%", sub: "" },
  { icon: Wind, label: "S wind", value: "5 mph", sub: "" },
  { icon: Gauge, label: "Air pressure", value: "1008 hPa", sub: "" },
  { icon: Eye, label: "Visibility", value: "2 km", sub: "" },
];

const WeatherDetailsGrid = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: 0.6 }}
      className="grid grid-cols-3 gap-3"
    >
      {stats.map((s) => (
        <div key={s.label} className="glass rounded-2xl p-3 flex flex-col gap-1.5">
          <s.icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
          <span className="text-[10px] text-muted-foreground">{s.label}</span>
          <span className="font-display text-base font-semibold text-foreground leading-tight">
            {s.value}
          </span>
          {s.sub && <span className="text-[10px] text-muted-foreground">{s.sub}</span>}
        </div>
      ))}
    </motion.div>
  );
};

export default WeatherDetailsGrid;
