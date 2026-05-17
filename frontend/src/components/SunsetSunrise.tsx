import { motion } from "framer-motion";
import { Sunset, Sunrise } from "lucide-react";

const SunsetSunrise = () => {
  const sunsetTime = "5:49 PM";
  const sunriseTime = "5:35 AM";
  // Approximate arc position (0-100)
  const progress = 75;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.75, duration: 0.6 }}
      className="glass rounded-2xl p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <Sunset className="w-4 h-4 text-primary" />
          <span className="text-[10px] text-muted-foreground">Sunset</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-muted-foreground">Sunrise</span>
          <Sunrise className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Arc visualization */}
      <div className="relative h-12 mb-3">
        <svg viewBox="0 0 200 50" className="w-full h-full" preserveAspectRatio="none">
          {/* Background arc */}
          <path
            d="M 10 45 Q 100 -10 190 45"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <path
            d="M 10 45 Q 100 -10 190 45"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="220"
            strokeDashoffset={220 - (220 * progress) / 100}
          />
          {/* Sun dot */}
          <circle
            cx={10 + (180 * progress) / 100}
            cy={45 - Math.sin((progress / 100) * Math.PI) * 50}
            r="4"
            fill="hsl(var(--primary))"
          />
        </svg>
      </div>

      <div className="flex justify-between">
        <span className="font-display text-sm font-semibold text-foreground">{sunsetTime}</span>
        <span className="font-display text-sm font-semibold text-foreground">{sunriseTime}</span>
      </div>
    </motion.div>
  );
};

export default SunsetSunrise;
