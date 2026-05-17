import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { isNativePlatform } from "@/hooks/use-platform";
import Landing from "./pages/Landing.tsx";
import Index from "./pages/Index.tsx";
import SpatioTemporal from "./pages/SpatioTemporal.tsx";
import Assistance from "./pages/Assistance.tsx";
import SettingsPage from "./pages/Settings.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

/**
 * On native (Capacitor / Android) the landing page is skipped —
 * the user goes straight to the weather dashboard.
 * On web the full landing page is shown.
 */
const PlatformHome = () => {
  if (isNativePlatform()) {
    return <Navigate to="/home" replace />;
  }
  return <Landing />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PlatformHome />} />
          <Route path="/home" element={<Index />} />
          <Route path="/spatio-temporal" element={<SpatioTemporal />} />
          <Route path="/assistance" element={<Assistance />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

