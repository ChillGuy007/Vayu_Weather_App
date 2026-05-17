import { useState } from "react";
import { getWeatherType } from "@/hooks/use-weather-type";
import { useCurrentWeather } from "@/hooks/use-current-weather";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Cloud, CloudSun, Sun, CloudRain, CloudLightning, Snowflake,
  Wind, Droplets, Eye, ArrowRight, Zap, MapPin,
  Thermometer, Gauge, Sunset, Sunrise,
  CloudRain as CloudRainIcon, ChevronDown,
  Flower2, Droplet, CarFront, Dumbbell, AlertTriangle as AlertTriangleIcon2, Backpack, Bug,
  Activity, AlertTriangle, TrendingUp, Clock, ShieldAlert, Flame,
  Siren, Phone, FileWarning, Shield,
  Stethoscope, Waves, ChevronRight, SendHorizontal, Navigation,
  Menu, X,
} from "lucide-react";
import WeatherBackground from "@/components/WeatherBackground";



const hours = [
  { time: "Now", temp: "32°", Icon: CloudSun },
  { time: "2 PM", temp: "33°", Icon: Sun },
  { time: "3 PM", temp: "34°", Icon: Sun },
  { time: "4 PM", temp: "33°", Icon: CloudSun },
  { time: "5 PM", temp: "31°", Icon: Cloud },
  { time: "6 PM", temp: "29°", Icon: CloudRain },
  { time: "7 PM", temp: "27°", Icon: CloudRain },
  { time: "8 PM", temp: "26°", Icon: Cloud },
];

const days = [
  { day: "Mon", Icon: Sun, high: 36, low: 24 },
  { day: "Tue", Icon: CloudSun, high: 34, low: 23 },
  { day: "Wed", Icon: Cloud, high: 31, low: 22 },
  { day: "Thu", Icon: CloudRain, high: 28, low: 21 },
  { day: "Fri", Icon: CloudLightning, high: 27, low: 20 },
  { day: "Sat", Icon: CloudRain, high: 29, low: 21 },
  { day: "Sun", Icon: Sun, high: 33, low: 23 },
];

const detailStats = [
  { icon: Sun, label: "UV", value: "0", sub: "Very weak" },
  { icon: Thermometer, label: "Feels like", value: "28°", sub: "" },
  { icon: Droplets, label: "Humidity", value: "82%", sub: "" },
  { icon: Wind, label: "S wind", value: "5 mph", sub: "" },
  { icon: Gauge, label: "Air pressure", value: "1008 hPa", sub: "" },
  { icon: Eye, label: "Visibility", value: "2 km", sub: "" },
];

const lifestyleTips = [
  { icon: Flower2, label: "Low pollen count" },
  { icon: Sun, label: "Moderate UV index" },
  { icon: Droplet, label: "Use oil-control products" },
  { icon: CarFront, label: "Not suitable for car washing" },
  { icon: Dumbbell, label: "Suitable for indoor workouts" },
  { icon: AlertTriangleIcon2, label: "Slippery road" },
  { icon: Backpack, label: "Not suitable for a trip" },
  { icon: Bug, label: "Some mosquitoes" },
];

const anomalies = [
  {
    id: 1, title: "Temperature Surge", location: "Central Delhi", time: "2 hours ago",
    severity: "high", description: "Temperature deviated +4.2°C above seasonal average.",
    delta: "+4.2°C", indicates: "Urban Heat Island intensification",
    risks: ["Heatwave conditions", "Heat stroke risk", "Crop stress"],
    disasterPotential: "Prolonged surges signal emerging heatwave events.",
  },
  {
    id: 2, title: "Humidity Drop", location: "South Delhi", time: "5 hours ago",
    severity: "medium", description: "Relative humidity dropped 22% in under 3 hours.",
    delta: "-22%", indicates: "Dry air mass intrusion",
    risks: ["Wildfire ignition risk", "Respiratory issues", "Soil moisture depletion"],
    disasterPotential: "Rapid humidity drops preceding dust storms or dry thunderstorms.",
  },
  {
    id: 3, title: "Wind Pattern Shift", location: "NCR Region", time: "1 day ago",
    severity: "low", description: "Wind direction reversed 180° with speed increase.",
    delta: "180°", indicates: "Mesoscale convective disruption",
    risks: ["Dust storms", "Sudden temperature change", "Aviation hazards"],
    disasterPotential: "Abrupt wind reversals often precede severe convective storms.",
  },
];

const severityColors: Record<string, string> = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-primary/15 text-primary border-primary/30",
  low: "bg-accent/15 text-accent border-accent/30",
};

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
];

const SectionTitle = ({ children, sub }: { children: React.ReactNode; sub?: string }) => (
  <div className="text-center mb-12">
    <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">{children}</h2>
    {sub && <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{sub}</p>}
  </div>
);

const Landing = () => {
  // Fetch live weather and auto-detect the weather type
  const { data: currentWeather } = useCurrentWeather();
  const weather = getWeatherType(currentWeather?.description);
  const [rainfallOpen, setRainfallOpen] = useState(false);
  const [complaint, setComplaint] = useState("");
  const [complaintType, setComplaintType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const maxHigh = Math.max(...days.map((d) => d.high));
  const minLow = Math.min(...days.map((d) => d.low));
  const range = maxHigh - minLow;

  const handleSubmit = () => {
    if (complaint.trim() && complaintType) {
      setSubmitted(true);
      setComplaint("");
      setComplaintType("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className={`min-h-screen relative weather-${weather} transition-colors duration-700`}>
      <WeatherBackground weather={weather} />

      <div className="relative z-10">
        {/* ─── NAVBAR ─── */}
        <nav className="sticky top-0 z-50 glass-strong border-b border-border/30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <span className="font-display text-2xl font-semibold text-gradient">vayu</span>
            <div className="hidden md:flex items-center gap-8">
              <a href="#weather" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Weather</a>
              <a href="#analysis" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Analysis</a>
              <a href="#assistance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Assistance</a>
              <Link to="/home" className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                Open App
              </Link>
            </div>
            <button className="md:hidden text-foreground" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          {mobileMenu && (
            <div className="md:hidden px-6 pb-4 space-y-3">
              <a href="#weather" className="block text-sm text-muted-foreground" onClick={() => setMobileMenu(false)}>Weather</a>
              <a href="#analysis" className="block text-sm text-muted-foreground" onClick={() => setMobileMenu(false)}>Analysis</a>
              <a href="#assistance" className="block text-sm text-muted-foreground" onClick={() => setMobileMenu(false)}>Assistance</a>
              <Link to="/home" className="block text-sm text-primary font-medium" onClick={() => setMobileMenu(false)}>Open App</Link>
            </div>
          )}
        </nav>

        {/* ─── HERO ─── */}
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-muted-foreground mb-8">
              <Zap className="w-3 h-3 text-primary" />
              Spatio-Temporal Weather Anomaly Detection
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Weather Intelligence<br /><span className="text-gradient">Redefined</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              Real-time forecasts, anomaly detection, and disaster assistance — all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#weather" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                Explore Dashboard <ArrowRight className="w-4 h-4" />
              </a>
              <Link to="/home" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass text-foreground font-medium hover:bg-card/80 transition-colors">
                Open Mobile App
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ─── WEATHER DASHBOARD ─── */}
        <section id="weather" className="max-w-7xl mx-auto px-6 pb-24 scroll-mt-20">
          <SectionTitle sub="Live weather data with interactive forecasts and detailed metrics.">
            Current Weather
          </SectionTitle>



          {/* Main weather hero + sidebar */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Hero card */}
            <div className="lg:col-span-1 glass-strong rounded-3xl p-8 flex flex-col items-center justify-center text-center">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="mb-4">
                <Cloud className="w-20 h-20 text-muted-foreground/60" strokeWidth={1.2} />
              </motion.div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> New Delhi
              </p>
              <p className="font-display text-8xl font-light tracking-tighter text-foreground leading-none">32°</p>
              <p className="text-muted-foreground mt-1 text-sm">Partly Cloudy</p>
              <div className="flex gap-4 mt-3 text-sm">
                <span className="text-foreground/80">H: 36°</span>
                <span className="text-foreground/80">L: 24°</span>
              </div>
              <div className="flex gap-6 mt-6">
                {[
                  { icon: Wind, label: "Wind", value: "12 km/h" },
                  { icon: Droplets, label: "Humidity", value: "58%" },
                  { icon: Eye, label: "Visibility", value: "10 km" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-1">
                    <s.icon className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                    <span className="text-sm font-medium text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column: hourly + weekly */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hourly */}
              <div className="glass rounded-2xl p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Hourly Forecast</p>
                <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
                  {hours.map((h, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 min-w-[52px]">
                      <span className="text-xs text-muted-foreground">{h.time}</span>
                      <h.Icon className="w-5 h-5 text-primary/80" strokeWidth={1.5} />
                      <span className="text-sm font-medium text-foreground">{h.temp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly */}
              <div className="glass rounded-2xl p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">7-Day Forecast</p>
                <div className="space-y-3">
                  {days.map((d, i) => {
                    const leftPct = ((d.low - minLow) / range) * 100;
                    const widthPct = ((d.high - d.low) / range) * 100;
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-8 text-sm text-muted-foreground">{d.day}</span>
                        <d.Icon className="w-4 h-4 text-primary/70 shrink-0" strokeWidth={1.5} />
                        <span className="w-8 text-right text-sm text-muted-foreground">{d.low}°</span>
                        <div className="flex-1 h-1 rounded-full bg-muted relative mx-2">
                          <div className="absolute h-full rounded-full bg-gradient-to-r from-accent to-primary" style={{ left: `${leftPct}%`, width: `${widthPct}%` }} />
                        </div>
                        <span className="w-8 text-sm text-foreground">{d.high}°</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row: details grid + air quality + sunset + rainfall + lifestyle */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Details grid */}
            <div className="glass rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Weather Details</p>
              <div className="grid grid-cols-3 gap-3">
                {detailStats.map((s) => (
                  <div key={s.label} className="bg-muted/20 rounded-xl p-3 flex flex-col gap-1.5">
                    <s.icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
                    <span className="text-[10px] text-muted-foreground">{s.label}</span>
                    <span className="font-display text-base font-semibold text-foreground leading-tight">{s.value}</span>
                    {s.sub && <span className="text-[10px] text-muted-foreground">{s.sub}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Air Quality + Sunset */}
            <div className="space-y-6">
              {/* Air Quality */}
              <div className="glass rounded-2xl p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Air Quality</p>
                <p className="font-display text-2xl font-semibold text-foreground">
                  Moderate <span className="text-muted-foreground text-lg">120</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1 mb-3">
                  Everyone may experience some irritation.
                </p>
                <div className="relative h-1.5 rounded-full overflow-hidden bg-muted">
                  <div className="absolute inset-y-0 left-0 rounded-full" style={{
                    width: "100%",
                    background: "linear-gradient(to right, hsl(152 60% 45%), hsl(60 80% 50%), hsl(36 90% 55%), hsl(0 72% 51%), hsl(280 60% 40%))",
                  }} />
                  <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-foreground border-2 border-background" style={{ left: "24%" }} />
                </div>
              </div>

              {/* Sunset/Sunrise */}
              <div className="glass rounded-2xl p-5">
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
                <div className="relative h-12 mb-3">
                  <svg viewBox="0 0 200 50" className="w-full h-full" preserveAspectRatio="none">
                    <path d="M 10 45 Q 100 -10 190 45" fill="none" stroke="hsl(var(--muted))" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 10 45 Q 100 -10 190 45" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeDasharray="220" strokeDashoffset={220 - (220 * 75) / 100} />
                    <circle cx={10 + (180 * 75) / 100} cy={45 - Math.sin((75 / 100) * Math.PI) * 50} r="4" fill="hsl(var(--primary))" />
                  </svg>
                </div>
                <div className="flex justify-between">
                  <span className="font-display text-sm font-semibold text-foreground">5:49 PM</span>
                  <span className="font-display text-sm font-semibold text-foreground">5:35 AM</span>
                </div>
              </div>
            </div>

            {/* Rainfall + Lifestyle */}
            <div className="space-y-6">
              {/* Rainfall */}
              <div className="glass rounded-2xl overflow-hidden">
                <button onClick={() => setRainfallOpen(!rainfallOpen)} className="w-full flex items-center justify-between p-5">
                  <div className="flex items-center gap-2">
                    <CloudRainIcon className="w-4 h-4 text-accent" />
                    <span className="text-sm text-foreground">Rainfall Forecast</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${rainfallOpen ? "rotate-180" : ""}`} />
                </button>
                {rainfallOpen && (
                  <div className="px-5 pb-5 text-xs text-muted-foreground">
                    <p>Light rain expected around 8:00 PM.</p>
                    <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-3/5 bg-accent/60 rounded-full" />
                    </div>
                    <div className="flex justify-between mt-1"><span>Now</span><span>12 AM</span></div>
                  </div>
                )}
              </div>

              {/* Lifestyle */}
              <div className="glass rounded-2xl p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Lifestyle Tips</p>
                <div className="grid grid-cols-4 gap-3">
                  {lifestyleTips.map((tip) => (
                    <div key={tip.label} className="flex flex-col items-center gap-2 text-center">
                      <div className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center">
                        <tip.icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] text-muted-foreground leading-tight">{tip.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ANALYSIS SECTION ─── */}
        <section id="analysis" className="max-w-7xl mx-auto px-6 pb-24 scroll-mt-20">
          <SectionTitle sub="Spatio-temporal anomaly detection identifies climate risks before they escalate.">
            Anomaly Analysis
          </SectionTitle>

          {/* Map + anomalies */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Map */}
            <div className="glass rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 gradient-glow opacity-50" />
              <div className="relative">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Regional Anomaly Map</p>
                <div className="grid grid-cols-10 gap-1 aspect-[2/1]">
                  {Array.from({ length: 60 }).map((_, i) => {
                    const intensity = Math.sin(i * 0.5) * 0.5 + 0.5;
                    const isAnomaly = intensity > 0.85;
                    return (
                      <div key={i} className={`rounded-sm transition-colors ${
                        isAnomaly ? "bg-primary/60 animate-pulse-soft" : intensity > 0.5 ? "bg-accent/20" : "bg-muted/30"
                      }`} />
                    );
                  })}
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-muted/30" /> Normal</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-accent/20" /> Elevated</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-primary/60" /> Anomaly</span>
                </div>
              </div>
            </div>

            {/* Anomaly cards */}
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Detected Anomalies</p>
              {anomalies.map((a) => (
                <div key={a.id} className="glass rounded-2xl p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-primary" />
                      <h3 className="text-sm font-medium text-foreground">{a.title}</h3>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${severityColors[a.severity]}`}>{a.severity}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{a.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {a.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {a.time}</span>
                    <span className="flex items-center gap-1 text-primary font-medium"><TrendingUp className="w-3 h-3" /> {a.delta}</span>
                  </div>
                  <div className="border-t border-border/30 pt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-3.5 h-3.5 text-accent" />
                      <p className="text-xs font-medium text-foreground">Indicates: {a.indicates}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {a.risks.map((risk) => (
                        <span key={risk} className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20">{risk}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-muted/20 rounded-xl p-3 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-3 h-3 text-primary" />
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-primary">Climate & Disaster Risk</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{a.disasterPotential}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ASSISTANCE SECTION ─── */}
        <section id="assistance" className="max-w-7xl mx-auto px-6 pb-24 scroll-mt-20">
          <SectionTitle sub="Emergency SOS, helplines, report issues, and find nearby relief centers.">
            Disaster Assistance
          </SectionTitle>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* SOS */}
            <div className="glass-strong rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Emergency SOS</p>
              <button
                onClick={() => alert("🚨 SOS Activated! Emergency services have been notified.")}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-full bg-destructive/20 animate-ping" style={{ animationDuration: "2s" }} />
                <div className="absolute -inset-3 rounded-full bg-destructive/10 animate-ping" style={{ animationDuration: "2.5s" }} />
                <div className="relative w-28 h-28 rounded-full bg-destructive flex flex-col items-center justify-center shadow-[0_0_40px_hsl(0_72%_51%/0.4)] group-hover:shadow-[0_0_60px_hsl(0_72%_51%/0.6)] transition-shadow">
                  <Siren className="w-8 h-8 text-destructive-foreground mb-1" />
                  <span className="text-destructive-foreground font-display text-sm font-bold">SOS</span>
                </div>
              </button>
              <p className="text-xs text-muted-foreground mt-4 max-w-[200px]">
                Tap to alert emergency services with your current location
              </p>
            </div>

            {/* Helplines */}
            <div className="glass rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Emergency Helplines</p>
              <div className="space-y-2">
                {helplines.map((h) => (
                  <a key={h.number} href={`tel:${h.number}`} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/30 transition-colors group">
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
            </div>

            {/* Report + Relief */}
            <div className="space-y-6">
              {/* Report */}
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FileWarning className="w-4 h-4 text-primary" />
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Report an Issue</p>
                </div>
                {submitted ? (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-6 h-6 text-success" />
                    </div>
                    <p className="text-sm text-foreground font-medium">Report Submitted</p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {["Flooding", "Road Blocked", "Power Outage", "Building Damage", "Other"].map((type) => (
                        <button key={type} onClick={() => setComplaintType(type)} className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          complaintType === type ? "bg-primary/20 border-primary/40 text-primary" : "border-border/50 text-muted-foreground hover:border-border"
                        }`}>{type}</button>
                      ))}
                    </div>
                    <div className="relative">
                      <textarea value={complaint} onChange={(e) => setComplaint(e.target.value)} placeholder="Describe the situation..." className="w-full bg-muted/30 rounded-xl p-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/50 border border-border/30 focus:border-primary/40 focus:outline-none resize-none h-20" />
                      <button onClick={handleSubmit} disabled={!complaint.trim() || !complaintType} className="absolute bottom-3 right-3 w-7 h-7 rounded-lg bg-primary flex items-center justify-center disabled:opacity-30">
                        <SendHorizontal className="w-3.5 h-3.5 text-primary-foreground" />
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Relief Centers */}
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-accent" />
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Nearby Relief Centers</p>
                </div>
                <div className="space-y-2">
                  {reliefCenters.map((center) => (
                    <div key={center.name} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/30 transition-colors">
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{center.name}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><Navigation className="w-2.5 h-2.5" /> {center.distance}</span>
                          <span className="text-[10px] text-muted-foreground">{center.capacity}</span>
                          <span className={`text-[10px] font-medium ${center.status === "Open" ? "text-success" : "text-primary"}`}>{center.status}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="max-w-7xl mx-auto px-6 pb-8">
          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-display text-lg font-semibold text-gradient">vayu</span>
            <p className="text-xs text-muted-foreground">© 2026 Vayu Weather. Spatio-Temporal Anomaly Detection.</p>
            <div className="flex gap-6">
              <Link to="/home" className="text-xs text-muted-foreground hover:text-foreground transition-colors">App</Link>
              <a href="#weather" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Weather</a>
              <a href="#analysis" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Analysis</a>
              <a href="#assistance" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Assistance</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
