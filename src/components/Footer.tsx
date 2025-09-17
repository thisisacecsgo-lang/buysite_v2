import { Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 mt-12">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img
                  src="/images/logo2.png"
                  alt="Hiesige Höfe Logo"
                  className="h-20 w-27"
              />
            </Link>
            <p className="text-muted-foreground text-sm mt-2">
              Regional Produce Delivered to You
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" state={{ category: "all" }} className="text-muted-foreground hover:text-primary">All Products</Link></li>
              <li><Link to="/" state={{ category: "Fruits and berries" }} className="text-muted-foreground hover:text-primary">Fruits & Berries</Link></li>
              <li><Link to="/" state={{ category: "Vegetables" }} className="text-muted-foreground hover:text-primary">Vegetables</Link></li>
              <li><Link to="/" state={{ category: "Bakery" }} className="text-muted-foreground hover:text-primary">Bakery</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary">Our Story</Link></li>
              <li><Link to="/sellers" className="text-muted-foreground hover:text-primary">Our Sellers</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary"><Github className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Hiesige Höfe. All Rights Reserved.</p>

        </div>
      </div>
    </footer>
  );
};