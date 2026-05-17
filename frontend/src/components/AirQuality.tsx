import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const AirQuality = () => {
  const aqi = 120;
  const level = "Moderate";
  const pct = Math.min((aqi / 500) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.6 }}
      className="glass rounded-2xl p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Air Quality</p>
        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
      <p className="font-display text-2xl font-semibold text-foreground">
        {level} <span className="text-muted-foreground text-lg">{aqi}</span>
      </p>
      <p className="text-xs text-muted-foreground mt-1 mb-3">
        Everyone may experience some irritation. Children and elderly should limit outdoor activity.
      </p>
      {/* AQI gradient bar */}
      <div className="relative h-1.5 rounded-full overflow-hidden bg-muted">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: "100%",
            background: "linear-gradient(to right, hsl(152 60% 45%), hsl(60 80% 50%), hsl(36 90% 55%), hsl(0 72% 51%), hsl(280 60% 40%))",
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-foreground border-2 border-background"
          style={{ left: `${pct}%` }}
        />
      </div>
    </motion.div>
  );
};

export default AirQuality;
