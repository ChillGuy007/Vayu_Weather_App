import { motion } from "framer-motion";
import {
  Siren,
  Phone,
  FileWarning,
  MapPin,
  Shield,
  Flame,
  Stethoscope,
  Waves,
  AlertTriangle,
  ChevronRight,
  SendHorizontal,
  Navigation,
} from "lucide-react";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";

const helplines = [
  { name: "National Disaster Helpline", number: "1078", icon: AlertTriangle, color: "text-destructive" },
  { name: "Police", number: "100", icon: Shield, color: "text-accent" },
  { name: "Fire Brigade", number: "101", icon: Flame, color: "text-primary" },
  { name: "Ambulance", number: "102", icon: Stethoscope, color: "text-success" },
  { name: "Flood Control", number: "1070", icon: Waves, color: "text-accent" },
  { name: "Women Helpline", number: "1091", icon: Phone, color: "text-primary" },
];

const reliefCenters = [
  { name: "City Community Hall", distance: "1.2 km", capacity: "200 people", status: "Open" },
  { name: "Government School - Sector 5", distance: "2.8 km", capacity: "350 people", status: "Open" },
  { name: "District Sports Complex", distance: "4.1 km", capacity: "500 people", status: "Near Full" },
  { name: "Railway Station Shelter", distance: "5.5 km", capacity: "150 people", status: "Open" },
];

const Assistance = () => {
  const [complaint, setComplaint] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSOS = () => {
    // In production this would trigger actual emergency protocols
    alert("🚨 SOS Activated! Emergency services have been notified with your location.");
  };

  const handleSubmit = () => {
    if (complaint.trim() && complaintType) {
      setSubmitted(true);
      setComplaint("");
      setComplaintType("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="min-h-screen gradient-sky pb-24">
      <div className="max-w-md mx-auto px-5">
        <Navbar />

        {/* SOS Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center pt-6 pb-8"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
            Emergency SOS
          </p>
          <button
            onClick={handleSOS}
            className="relative group"
          >
            {/* Pulsing rings */}
            <div className="absolute inset-0 rounded-full bg-destructive/20 animate-ping" style={{ animationDuration: "2s" }} />
            <div className="absolute -inset-3 rounded-full bg-destructive/10 animate-ping" style={{ animationDuration: "2.5s" }} />
            {/* Button */}
            <div className="relative w-28 h-28 rounded-full bg-destructive flex flex-col items-center justify-center shadow-[0_0_40px_hsl(0_72%_51%/0.4)] group-hover:shadow-[0_0_60px_hsl(0_72%_51%/0.6)] transition-shadow">
              <Siren className="w-8 h-8 text-destructive-foreground mb-1" />
              <span className="text-destructive-foreground font-display text-sm font-bold">SOS</span>
            </div>
          </button>
          <p className="text-xs text-muted-foreground mt-4 text-center max-w-[200px]">
            Tap to alert emergency services with your current location
          </p>
        </motion.div>

        <div className="space-y-4">
          {/* Helplines */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass rounded-2xl p-4"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Emergency Helplines
            </p>
            <div className="space-y-2">
              {helplines.map((h) => (
                <a
                  key={h.number}
                  href={`tel:${h.number}`}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/30 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center">
                      <h.icon className={`w-4 h-4 ${h.color}`} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm text-foreground">{h.name}</p>
                      <p className="text-xs text-muted-foreground">{h.number}</p>
                    </div>
                  </div>
                  <Phone className="w-4 h-4 text-success group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Report / Complaint */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="glass rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <FileWarning className="w-4 h-4 text-primary" />
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Report an Issue
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-success" />
                </div>
                <p className="text-sm text-foreground font-medium">Report Submitted</p>
                <p className="text-xs text-muted-foreground mt-1">We'll address this as soon as possible.</p>
              </div>
            ) : (
              <>
                {/* Type selector */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {["Flooding", "Road Blocked", "Power Outage", "Building Damage", "Medical Emergency", "Other"].map(
                    (type) => (
                      <button
                        key={type}
                        onClick={() => setComplaintType(type)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          complaintType === type
                            ? "bg-primary/20 border-primary/40 text-primary"
                            : "border-border/50 text-muted-foreground hover:border-border"
                        }`}
                      >
                        {type}
                      </button>
                    )
                  )}
                </div>

                {/* Text area */}
                <div className="relative">
                  <textarea
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    placeholder="Describe the situation, location details..."
                    className="w-full bg-muted/30 rounded-xl p-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/50 border border-border/30 focus:border-primary/40 focus:outline-none resize-none h-20"
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={!complaint.trim() || !complaintType}
                    className="absolute bottom-3 right-3 w-7 h-7 rounded-lg bg-primary flex items-center justify-center disabled:opacity-30 hover:opacity-90 transition-opacity"
                  >
                    <SendHorizontal className="w-3.5 h-3.5 text-primary-foreground" />
                  </button>
                </div>
              </>
            )}
          </motion.div>

          {/* Relief Centers */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="glass rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Nearby Relief Centers
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {reliefCenters.map((center) => (
                <div
                  key={center.name}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/30 transition-colors group"
                >
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{center.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                        <Navigation className="w-2.5 h-2.5" /> {center.distance}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{center.capacity}</span>
                      <span
                        className={`text-[10px] font-medium ${
                          center.status === "Open" ? "text-success" : "text-primary"
                        }`}
                      >
                        {center.status}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Assistance;
