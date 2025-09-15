import CartIcon from "./CartIcon";
import { Link, useLocation } from "react-router-dom";
import { User } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const Logo = () => (
      <div className="flex items-center gap-2">
          <img src="/images/logo2.png" alt="Hiesige Höfe Logo" className="h-24 w-28"/>
      </div>
  );

    return (
        <header
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-28 items-center justify-between gap-2">
        {isHomePage ? (
          <div className="cursor-default">
            <Logo />
          </div>
        ) : (
          <Link to="/">
            <Logo />
          </Link>
        )}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-16 w-16" asChild>
            <Link to="/profile">
              <User className="h-10 w-10" />
            </Link>
          </Button>
          <CartIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;