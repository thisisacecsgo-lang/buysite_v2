import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <AppBreadcrumb />
        <div className="flex flex-col items-center justify-center text-center pt-16">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl text-muted-foreground mb-6">Oops! Page not found</h2>
          <p className="max-w-md mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Button asChild size="lg">
            <Link to="/">Return to Homepage</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;