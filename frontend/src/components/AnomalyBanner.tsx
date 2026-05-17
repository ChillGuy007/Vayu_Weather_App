import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const AnomalyBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      <Link
        to="/spatio-temporal"
        className="group flex items-center justify-between glass rounded-2xl p-4 hover:border-primary/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Spatio-Temporal Analysis</p>
            <p className="text-xs text-muted-foreground">2 anomalies detected in your region</p>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </Link>
    </motion.div>
  );
};

export default AnomalyBanner;
