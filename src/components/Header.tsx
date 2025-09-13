import { Leaf } from "lucide-react";
import CartIcon from "./CartIcon";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const Logo = () => (
      <div className="flex items-center gap-2">
          <img src="/images/logo2.png" alt="MySite Logo" className="h-15 w-16"/>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground whitespace-nowrap">
              Hiesige Höfe
          </h1>
      </div>
  );

    return (
        <header
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between gap-2">
        {isHomePage ? (
          <div className="cursor-default">
            <Logo />
          </div>
        ) : (
          <Link to="/">
            <Logo />
          </Link>
        )}
        <CartIcon />
      </div>
    </header>
  );
};

export default Header;