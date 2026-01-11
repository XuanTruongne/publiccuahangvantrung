import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const navLinks = [{
  name: "Trang chủ",
  path: "/"
}, {
  name: "Về chúng tôi",
  path: "/about"
}, {
  name: "Sản phẩm",
  path: "/products"
}, {
  name: "Dịch vụ",
  path: "/services"
}, {
  name: "Tin tức",
  path: "/blog"
}, {
  name: "Liên hệ",
  path: "/contact"
}];
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "bg-background/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4")}>
      <div className="container-custom bg-white/[0.28] py-[15px] my-0">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center group-hover:scale-105 transition-transform">
              <Wrench className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl leading-none text-primary font-bold">
                VĂN TRUNG
              </span>
              <span className="text-xs text-primary">
                Thiết bị xây dựng
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => <Link key={link.path} to={link.path} className={cn("px-4 py-2 text-sm font-medium rounded-md transition-colors", location.pathname === link.path ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-primary/5")}>
                {link.name}
              </Link>)}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:0123456789" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>0819 516 052 </span>
            </a>
            <Button asChild>
              <Link to="/contact">Liên hệ ngay</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-foreground hover:text-primary transition-colors" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn("lg:hidden overflow-hidden transition-all duration-300", isMobileMenuOpen ? "max-h-96 mt-4" : "max-h-0")}>
          <nav className="flex flex-col gap-1 py-4 border-t border-border">
            {navLinks.map(link => <Link key={link.path} to={link.path} className={cn("px-4 py-3 text-sm font-medium rounded-md transition-colors", location.pathname === link.path ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-primary/5")}>
                {link.name}
              </Link>)}
            <div className="mt-4 pt-4 border-t border-border">
              <a href="tel:0123456789" className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>0123 456 789</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>;
}