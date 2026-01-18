import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    {
      label: "About",
      href: "#about",
    },
    {
      label: "Services",
      href: "#services",
    },
    {
      label: "Projects",
      href: "#projects",
    },
    {
      label: "Team",
      href: "#team",
    },
    {
      label: "Contact",
      href: "#contact",
    },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div>
            <img src="/logohead.svg" alt="SequenceIT" className="w-50 h-20 rounded-lg"/>
          </div>
          
          {/* <a href="#" className="flex items-center gap-2">

            
            
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-xl">
                ​ovi
              </span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              S​equenceIT
            </span>
          </a> */}

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="default" size="default">
              {/* Get a Quote */}
              <a
                key='contact'
                href="#contact"
                className="text-white hover:text-white transition-colors font-medium"
              >
                Get a Quote
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button variant="default" className="mt-2">
              {/* Get a Quote */}
                <a
                  key='contact'
                  href="#contact"
                  className="text-white hover:text-white transition-colors font-medium"
                >
                  Get a Quote
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
