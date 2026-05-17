import { Home, Activity, ShieldAlert } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/spatio-temporal", label: "Analysis", icon: Activity },
  { to: "/assistance", label: "Assistance", icon: ShieldAlert },
];

const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto">
        <div className="mx-3 mb-3 glass-strong rounded-2xl flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const active = pathname === tab.to || (tab.to === "/home" && pathname === "/home");
            return (
              <Link
                key={tab.to}
                to={tab.to}
                className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-colors ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-5 h-5" strokeWidth={active ? 2.2 : 1.5} />
                <span className="text-[10px] font-medium">{tab.label}</span>
                {active && (
                  <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
