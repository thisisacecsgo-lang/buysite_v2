import CartIcon from "./CartIcon";
import { Link, useLocation } from "react-router-dom";
import { User, ChefHat } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const Logo = () => (
      <div className="flex items-center gap-2">
          <img src="/images/logo2.png" alt="Hiesige Höfe Logo" className="h-16"/>
      </div>
  );

    return (
        <header
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between gap-2">
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
          <Button variant="ghost" size="icon" className="h-12 w-12" asChild>
            <Link to="/recipes">
              <ChefHat className="h-12 w-12" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-12 w-12" asChild>
            <Link to="/profile">
              <User className="h-12 w-12" />
            </Link>
          </Button>
          <CartIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;