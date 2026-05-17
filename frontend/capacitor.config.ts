import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.vayu.weather",
  appName: "Vayu Weather",
  webDir: "dist",
  server: {
    // During development you can point to the Vite dev server.
    // Comment this out for production builds.
    // url: "http://YOUR_LOCAL_IP:5173",
    // cleartext: true,
    androidScheme: "https",
  },
};

export default config;
