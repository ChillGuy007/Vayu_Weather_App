import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, TrendingUp, MapPin, Clock, ShieldAlert, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const anomalies = [
  {
    id: 1,
    title: "Temperature Surge",
    location: "Central Delhi",
    time: "2 hours ago",
    severity: "high",
    description: "Temperature deviated +4.2°C above seasonal average with rapid onset.",
    delta: "+4.2°C",
    indicates: "Urban Heat Island intensification",
    risks: ["Heatwave conditions", "Heat stroke risk", "Crop stress & wilting", "Increased energy demand"],
    disasterPotential: "Prolonged surges signal emerging heatwave events. Combined with low humidity, this can trigger drought conditions and wildfire risk in surrounding areas.",
  },
  {
    id: 2,
    title: "Humidity Drop",
    location: "South Delhi",
    time: "5 hours ago",
    severity: "medium",
    description: "Relative humidity dropped 22% in under 3 hours, unusual for the region.",
    delta: "-22%",
    indicates: "Dry air mass intrusion",
    risks: ["Wildfire ignition risk", "Respiratory issues", "Static discharge events", "Soil moisture depletion"],
    disasterPotential: "Rapid humidity drops preceding dust storms or dry thunderstorms. In arid-adjacent regions, this pattern correlates with desertification acceleration.",
  },
  {
    id: 3,
    title: "Wind Pattern Shift",
    location: "NCR Region",
    time: "1 day ago",
    severity: "low",
    description: "Wind direction reversed 180° with speed increase, correlating with dust event.",
    delta: "180°",
    indicates: "Mesoscale convective disruption",
    risks: ["Dust storms", "Sudden temperature change", "Aviation hazards", "Pollutant redistribution"],
    disasterPotential: "Abrupt wind reversals often precede severe convective storms, including squall lines and tornadoes. They also indicate frontal boundary passage linked to flash flooding.",
  },
];

const severityColors: Record<string, string> = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-primary/15 text-primary border-primary/30",
  low: "bg-accent/15 text-accent border-accent/30",
};

const SpatioTemporal = () => {
  return (
    <div className="min-h-screen gradient-sky pb-24">
      <div className="max-w-2xl mx-auto px-5">
        {/* Header */}
        <nav className="flex items-center gap-3 py-4">
          <Link
            to="/"
            className="w-9 h-9 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-display text-lg font-semibold text-foreground">
              Spatio-Temporal Analysis
            </h1>
            <p className="text-xs text-muted-foreground">Weather anomaly detection</p>
          </div>
        </nav>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-6 mb-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 gradient-glow opacity-50" />
          <div className="relative">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
              Regional Anomaly Map
            </p>
            {/* Stylized grid representing spatial data */}
            <div className="grid grid-cols-8 gap-1 aspect-[2/1]">
              {Array.from({ length: 48 }).map((_, i) => {
                const intensity = Math.random();
                const isAnomaly = intensity > 0.85;
                return (
                  <div
                    key={i}
                    className={`rounded-sm transition-colors ${
                      isAnomaly
                        ? "bg-primary/60 animate-pulse-soft"
                        : intensity > 0.5
                        ? "bg-accent/20"
                        : "bg-muted/30"
                    }`}
                  />
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-sm bg-muted/30" /> Normal
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-sm bg-accent/20" /> Elevated
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-sm bg-primary/60" /> Anomaly
              </span>
            </div>
          </div>
        </motion.div>

        {/* Anomaly list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-3 pb-12"
        >
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Detected Anomalies
          </p>
          {anomalies.map((a) => (
            <div key={a.id} className="glass rounded-2xl p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-medium text-foreground">{a.title}</h3>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${severityColors[a.severity]}`}
                >
                  {a.severity}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {a.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {a.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {a.time}
                </span>
                <span className="flex items-center gap-1 text-primary font-medium">
                  <TrendingUp className="w-3 h-3" /> {a.delta}
                </span>
              </div>

              {/* What it indicates */}
              <div className="border-t border-border/30 pt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-accent" />
                  <p className="text-xs font-medium text-foreground">Indicates: {a.indicates}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {a.risks.map((risk) => (
                    <span
                      key={risk}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20"
                    >
                      {risk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Disaster potential */}
              <div className="bg-muted/20 rounded-xl p-3 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-3 h-3 text-primary" />
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-primary">
                    Climate & Disaster Risk
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {a.disasterPotential}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default SpatioTemporal;
