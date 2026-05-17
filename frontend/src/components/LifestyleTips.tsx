import { motion } from "framer-motion";
import { ArrowRight, Flower2, Sun, Droplet, CarFront, Dumbbell, AlertTriangle, Backpack, Bug } from "lucide-react";

const tips = [
  { icon: Flower2, label: "Low pollen count" },
  { icon: Sun, label: "Moderate UV index" },
  { icon: Droplet, label: "Use oil-control products" },
  { icon: CarFront, label: "Not suitable for car washing" },
  { icon: Dumbbell, label: "Suitable for indoor workouts" },
  { icon: AlertTriangle, label: "Slippery road" },
  { icon: Backpack, label: "Not suitable for a trip" },
  { icon: Bug, label: "Some mosquitoes" },
];

const LifestyleTips = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.6 }}
      className="glass rounded-2xl p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Lifestyle Tips</p>
        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {tips.map((tip) => (
          <div key={tip.label} className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
              <tip.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
            </div>
            <span className="text-[10px] text-muted-foreground leading-tight">{tip.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default LifestyleTips;
