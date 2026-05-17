import { motion } from "framer-motion";
import { Cloud, Droplets, Wind, Eye } from "lucide-react";

const WeatherHero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex flex-col items-center pt-12 pb-8"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] gradient-glow pointer-events-none" />

      {/* Weather icon */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative mb-4"
      >
        <Cloud className="w-20 h-20 text-muted-foreground/60" strokeWidth={1.2} />
        <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full" />
      </motion.div>

      {/* Location */}
      <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-1">
        New Delhi
      </p>

      {/* Temperature */}
      <h2 className="font-display text-8xl md:text-9xl font-light tracking-tighter text-foreground leading-none">
        32°
      </h2>

      <p className="text-muted-foreground mt-1 text-sm">
        Partly Cloudy
      </p>

      {/* High / Low */}
      <div className="flex gap-4 mt-3 text-sm">
        <span className="text-foreground/80">H: 36°</span>
        <span className="text-foreground/80">L: 24°</span>
      </div>

      {/* Quick stats */}
      <div className="flex gap-6 mt-8">
        {[
          { icon: Wind, label: "Wind", value: "12 km/h" },
          { icon: Droplets, label: "Humidity", value: "58%" },
          { icon: Eye, label: "Visibility", value: "10 km" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1">
            <stat.icon className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">{stat.label}</span>
            <span className="text-sm font-medium text-foreground">{stat.value}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default WeatherHero;
