import { motion } from "framer-motion";
import { CloudRain, ChevronDown } from "lucide-react";
import { useState } from "react";

const RainfallForecast = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.6 }}
      className="glass rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4"
      >
        <div className="flex items-center gap-2">
          <CloudRain className="w-4 h-4 text-accent" />
          <span className="text-sm text-foreground">Rainfall forecast</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 text-xs text-muted-foreground">
          <p>Light rain expected around 8:00 PM. Carry an umbrella.</p>
          <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-3/5 bg-accent/60 rounded-full" />
          </div>
          <div className="flex justify-between mt-1">
            <span>Now</span>
            <span>12 AM</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default RainfallForecast;
