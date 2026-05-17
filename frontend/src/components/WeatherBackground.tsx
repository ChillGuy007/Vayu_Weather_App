import { motion } from "framer-motion";
import { useMemo } from "react";

type WeatherType = "sunny" | "cloudy" | "rainy" | "stormy" | "snowy" | "partly-cloudy";

interface WeatherBackgroundProps {
  weather?: WeatherType;
}

const Raindrop = ({ delay, x, speed }: { delay: number; x: number; speed: number }) => (
  <motion.div
    className="absolute w-[2px] rounded-full bg-accent/40"
    style={{ left: `${x}%`, top: -20, height: 18 + Math.random() * 10 }}
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: "110vh", opacity: [0, 0.8, 0.8, 0] }}
    transition={{
      duration: speed,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

const HeavyRaindrop = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    className="absolute w-[3px] rounded-full bg-accent/50"
    style={{ left: `${x}%`, top: -30, height: 24 }}
    initial={{ y: -30, opacity: 0 }}
    animate={{ y: "110vh", opacity: [0, 0.9, 0.9, 0] }}
    transition={{
      duration: 0.6 + Math.random() * 0.3,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

const RainSplash = ({ x, delay }: { x: number; delay: number }) => (
  <motion.div
    className="absolute bottom-[10%]"
    style={{ left: `${x}%` }}
    animate={{
      scale: [0, 1.5, 0],
      opacity: [0, 0.4, 0],
    }}
    transition={{
      duration: 0.4,
      delay,
      repeat: Infinity,
      repeatDelay: 1 + Math.random() * 2,
    }}
  >
    <div className="w-2 h-1 rounded-full bg-accent/20" />
  </motion.div>
);

const Snowflake = ({ delay, x, size }: { delay: number; x: number; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-foreground/30"
    style={{ left: `${x}%`, width: size, height: size }}
    initial={{ y: -10, opacity: 0 }}
    animate={{
      y: "105vh",
      x: [0, 20, -15, 12, 0],
      opacity: [0, 0.7, 0.7, 0],
    }}
    transition={{
      duration: 5 + Math.random() * 4,
      delay,
      repeat: Infinity,
      ease: "linear",
      x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    }}
  />
);

const SnowDrift = ({ delay, y }: { delay: number; y: number }) => (
  <motion.div
    className="absolute w-full"
    style={{ top: `${y}%` }}
    animate={{ opacity: [0, 0.06, 0], x: [-20, 40, -20] }}
    transition={{ duration: 12, delay, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
  </motion.div>
);

const SunRay = ({ angle, delay }: { angle: number; delay: number }) => (
  <motion.div
    className="absolute top-[-10%] left-1/2 origin-bottom"
    style={{ rotate: `${angle}deg` }}
  >
    <motion.div
      className="w-[2px] h-[280px] bg-gradient-to-b from-primary/30 to-transparent"
      animate={{ opacity: [0.15, 0.5, 0.15], scaleY: [0.7, 1.2, 0.7] }}
      transition={{ duration: 3 + Math.random() * 2, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

const SunGlare = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute top-[5%] left-[45%] w-3 h-3 rounded-full bg-primary/40"
    animate={{
      scale: [0.5, 1.5, 0.5],
      opacity: [0.2, 0.6, 0.2],
    }}
    transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const FloatingCloud = ({ x, y, scale, delay, dark }: { x: number; y: number; scale: number; delay: number; dark?: boolean }) => (
  <motion.div
    className="absolute"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{ x: [0, 50, 0], opacity: dark ? [0.1, 0.2, 0.1] : [0.08, 0.16, 0.08] }}
    transition={{ duration: 18 + delay * 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <div
      className={`${dark ? "bg-foreground/[0.12]" : "bg-foreground/[0.08]"} rounded-full blur-2xl`}
      style={{ width: 140 * scale, height: 55 * scale }}
    />
  </motion.div>
);

const StormCloud = ({ x, y, scale, delay }: { x: number; y: number; scale: number; delay: number }) => (
  <motion.div
    className="absolute"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{ x: [0, 25, 0], opacity: [0.15, 0.3, 0.15] }}
    transition={{ duration: 12 + delay * 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <div
      className="bg-foreground/[0.18] rounded-full blur-3xl"
      style={{ width: 180 * scale, height: 70 * scale }}
    />
  </motion.div>
);

const LightningBolt = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: "10%" }}
    animate={{ opacity: [0, 0, 1, 0.3, 0.8, 0, 0, 0, 0, 0, 0, 0, 0, 0] }}
    transition={{ duration: 8, delay, repeat: Infinity, ease: "linear" }}
  >
    <svg width="20" height="120" viewBox="0 0 20 120" className="text-primary/60">
      <path
        d="M10 0 L6 45 L14 42 L4 120 L10 60 L3 63 Z"
        fill="currentColor"
      />
    </svg>
  </motion.div>
);

const LightningFlash = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute inset-0 bg-foreground/8 pointer-events-none"
    animate={{ opacity: [0, 0, 1, 0, 0.7, 0, 0, 0, 0, 0, 0, 0] }}
    transition={{ duration: 6, delay, repeat: Infinity, ease: "linear" }}
  />
);

const FogLayer = ({ y, delay }: { y: number; delay: number }) => (
  <motion.div
    className="absolute w-full"
    style={{ top: `${y}%` }}
    animate={{ x: [-100, 100, -100], opacity: [0.03, 0.08, 0.03] }}
    transition={{ duration: 25 + delay * 5, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="h-16 bg-gradient-to-r from-transparent via-foreground/[0.06] to-transparent blur-xl" />
  </motion.div>
);

const FloatingParticle = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-primary/20"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{
      y: [0, -30, 0],
      x: [0, 10, -5, 0],
      opacity: [0, 0.4, 0],
    }}
    transition={{
      duration: 6 + Math.random() * 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const WeatherBackground = ({ weather = "partly-cloudy" }: WeatherBackgroundProps) => {
  const raindrops = useMemo(
    () => Array.from({ length: 60 }, (_, i) => ({ id: i, x: Math.random() * 100, delay: Math.random() * 2, speed: 0.9 + Math.random() * 0.5 })),
    []
  );
  const heavyDrops = useMemo(
    () => Array.from({ length: 25 }, (_, i) => ({ id: i, x: Math.random() * 100, delay: Math.random() * 1.5 })),
    []
  );
  const splashes = useMemo(
    () => Array.from({ length: 12 }, (_, i) => ({ id: i, x: Math.random() * 100, delay: Math.random() * 3 })),
    []
  );
  const snowflakes = useMemo(
    () => Array.from({ length: 45 }, (_, i) => ({ id: i, x: Math.random() * 100, delay: Math.random() * 5, size: 2 + Math.random() * 5 })),
    []
  );
  const snowDrifts = useMemo(
    () => Array.from({ length: 4 }, (_, i) => ({ id: i, y: 20 + i * 20, delay: i * 3 })),
    []
  );
  const sunRays = useMemo(
    () => Array.from({ length: 12 }, (_, i) => ({ id: i, angle: -50 + i * 9, delay: i * 0.2 })),
    []
  );
  const sunGlares = useMemo(
    () => Array.from({ length: 3 }, (_, i) => ({ id: i, delay: i * 1.5 })),
    []
  );
  const clouds = useMemo(
    () => Array.from({ length: 6 }, (_, i) => ({ id: i, x: Math.random() * 80, y: 5 + Math.random() * 30, scale: 0.8 + Math.random() * 1.8, delay: i })),
    []
  );
  const stormClouds = useMemo(
    () => Array.from({ length: 4 }, (_, i) => ({ id: i, x: Math.random() * 70, y: 3 + Math.random() * 20, scale: 1 + Math.random() * 1.2, delay: i * 2 })),
    []
  );
  const fogLayers = useMemo(
    () => Array.from({ length: 4 }, (_, i) => ({ id: i, y: 20 + i * 18, delay: i })),
    []
  );
  const particles = useMemo(
    () => Array.from({ length: 15 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, delay: Math.random() * 6 })),
    []
  );
  const lightningBolts = useMemo(
    () => [{ id: 0, x: 25, delay: 1 }, { id: 1, x: 65, delay: 4.5 }, { id: 2, x: 45, delay: 7 }],
    []
  );

  const gradients: Record<WeatherType, string> = {
    sunny: "from-[hsl(36,60%,15%)] via-[hsl(25,40%,10%)] to-[hsl(220,30%,8%)]",
    "partly-cloudy": "from-[hsl(215,40%,16%)] via-[hsl(220,30%,10%)] to-[hsl(220,25%,8%)]",
    cloudy: "from-[hsl(215,20%,14%)] via-[hsl(218,18%,10%)] to-[hsl(220,20%,7%)]",
    rainy: "from-[hsl(210,30%,12%)] via-[hsl(215,25%,8%)] to-[hsl(220,30%,6%)]",
    stormy: "from-[hsl(230,25%,10%)] via-[hsl(225,20%,6%)] to-[hsl(220,25%,4%)]",
    snowy: "from-[hsl(210,15%,18%)] via-[hsl(215,12%,12%)] to-[hsl(220,15%,8%)]",
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-b ${gradients[weather]}`}
        key={weather}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Ambient floating particles (all weathers) */}
      {particles.map((p) => (
        <FloatingParticle key={p.id} {...p} />
      ))}

      {/* ===== SUNNY ===== */}
      {weather === "sunny" && (
        <>
          <motion.div
            className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(ellipse, hsl(36 90% 55% / 0.2) 0%, hsl(36 80% 50% / 0.08) 40%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {sunRays.map((r) => <SunRay key={r.id} angle={r.angle} delay={r.delay} />)}
          {sunGlares.map((g) => <SunGlare key={g.id} delay={g.delay} />)}
          {/* Heat shimmer */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[30%]"
            style={{ background: "linear-gradient(to top, hsl(36 60% 50% / 0.06), transparent)" }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* ===== PARTLY CLOUDY ===== */}
      {weather === "partly-cloudy" && (
        <>
          <motion.div
            className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(ellipse, hsl(36 90% 55% / 0.12) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          {sunRays.slice(0, 6).map((r) => <SunRay key={r.id} angle={r.angle} delay={r.delay} />)}
          {clouds.map((c) => <FloatingCloud key={c.id} {...c} />)}
        </>
      )}

      {/* ===== CLOUDY ===== */}
      {weather === "cloudy" && (
        <>
          {clouds.map((c) => <FloatingCloud key={c.id} {...c} dark />)}
          {fogLayers.map((f) => <FogLayer key={f.id} {...f} />)}
        </>
      )}

      {/* ===== RAINY ===== */}
      {(weather === "rainy" || weather === "stormy") && (
        <>
          {clouds.map((c) => <FloatingCloud key={c.id} {...c} dark />)}
          {raindrops.map((d) => <Raindrop key={d.id} x={d.x} delay={d.delay} speed={d.speed} />)}
          {splashes.map((s) => <RainSplash key={s.id} x={s.x} delay={s.delay} />)}
          {/* Rain mist at bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[15%]"
            style={{ background: "linear-gradient(to top, hsl(210 30% 50% / 0.08), transparent)" }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* ===== STORMY (extras) ===== */}
      {weather === "stormy" && (
        <>
          {stormClouds.map((c) => <StormCloud key={c.id} {...c} />)}
          {heavyDrops.map((d) => <HeavyRaindrop key={d.id} x={d.x} delay={d.delay} />)}
          {lightningBolts.map((b) => <LightningBolt key={b.id} x={b.x} delay={b.delay} />)}
          <LightningFlash delay={0} />
          <LightningFlash delay={3.5} />
          <LightningFlash delay={7} />
        </>
      )}

      {/* ===== SNOWY ===== */}
      {weather === "snowy" && (
        <>
          {snowflakes.map((s) => <Snowflake key={s.id} {...s} />)}
          {snowDrifts.map((d) => <SnowDrift key={d.id} {...d} />)}
          {fogLayers.slice(0, 2).map((f) => <FogLayer key={f.id} {...f} />)}
          {/* Snow glow */}
          <motion.div
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full"
            style={{ background: "radial-gradient(ellipse, hsl(210 20% 80% / 0.06) 0%, transparent 70%)" }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
    </div>
  );
};

export default WeatherBackground;
