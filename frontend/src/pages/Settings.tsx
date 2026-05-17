import { motion } from "framer-motion";
import { ArrowLeft, Sun, Moon, Bell, Globe, Thermometer, MapPin, ChevronRight, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return !document.documentElement.classList.contains("light-mode");
  });
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState("New Delhi");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
    }
  }, [darkMode]);

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"}`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-transform ${
          on ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
        style={{ backgroundColor: on ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))" }}
      />
    </button>
  );

  return (
    <div className="min-h-screen gradient-sky pb-24">
      <div className="max-w-md mx-auto px-5">
        {/* Header */}
        <nav className="flex items-center gap-3 py-4">
          <Link
            to="/"
            className="w-9 h-9 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-lg font-semibold text-foreground">Settings</h1>
        </nav>

        <div className="space-y-4 mt-4">
          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-4"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Appearance</p>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="w-4 h-4 text-primary" />
                ) : (
                  <Sun className="w-4 h-4 text-primary" />
                )}
                <div>
                  <p className="text-sm text-foreground">Dark Mode</p>
                  <p className="text-xs text-muted-foreground">{darkMode ? "On" : "Off"}</p>
                </div>
              </div>
              <Toggle on={darkMode} onToggle={() => setDarkMode(!darkMode)} />
            </div>
          </motion.div>

          {/* Units */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="glass rounded-2xl p-4"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Units</p>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Thermometer className="w-4 h-4 text-accent" />
                <p className="text-sm text-foreground">Temperature</p>
              </div>
              <div className="flex gap-1 bg-muted/50 rounded-lg p-0.5">
                {(["C", "F"] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`text-xs px-3 py-1 rounded-md transition-all ${
                      unit === u
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    °{u}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass rounded-2xl p-4"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Notifications</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm text-foreground">Weather Alerts</p>
                    <p className="text-xs text-muted-foreground">Severe weather notifications</p>
                  </div>
                </div>
                <Toggle on={notifications} onToggle={() => setNotifications(!notifications)} />
              </div>
            </div>
          </motion.div>

          {/* General */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="glass rounded-2xl p-4"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">General</p>
            <div className="space-y-1">
              {[
                { icon: MapPin, label: "Default Location", value: location },
                { icon: Globe, label: "Language", value: "English" },
                { icon: Info, label: "About Vayu", value: "v1.0" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-2.5 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm text-foreground">{item.label}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">{item.value}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
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

export default SettingsPage;
