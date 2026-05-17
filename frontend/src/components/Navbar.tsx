import { MapPin, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-1 py-4">
      <Link to="/home" className="flex items-center gap-2">
        <span className="font-display text-xl font-semibold text-gradient">vayu</span>
      </Link>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <MapPin className="w-3.5 h-3.5" />
          <span>New Delhi</span>
        </button>
        <Link to="/settings" className="text-muted-foreground hover:text-foreground transition-colors">
          <Settings className="w-4 h-4" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
