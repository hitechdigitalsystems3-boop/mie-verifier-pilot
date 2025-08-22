import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Star, ArrowRight } from 'lucide-react';
import VeritasIcon from '@/components/ui/veritas-icon';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`${
            mobile 
              ? 'block px-3 py-2 text-lg font-medium' 
              : 'text-sm font-medium transition-colors hover:text-primary'
          } ${
            isActive(item.href)
              ? 'text-primary font-semibold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => mobile && setIsOpen(false)}
        >
          {item.name}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover-lift">
            <div className="relative">
              <div className="p-2 bg-gradient-hero rounded-lg shadow-soft">
                <VeritasIcon size={24} className="text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 p-1 bg-accent rounded-full">
                <Star className="h-2 w-2 text-accent-foreground" />
              </div>
            </div>
            <div>
              <div className="text-xl font-bold font-display brand-text">
                Veritas
              </div>
              <div className="text-xs text-muted-foreground">
                by Analytics X
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <NavLinks />
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin">
                  Sign In
                </Link>
              </Button>
              <Button variant="hero" size="sm" asChild>
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-card/95 backdrop-blur-sm">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Logo */}
                  <Link to="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
                    <div className="relative">
                      <div className="p-2 bg-gradient-hero rounded-lg shadow-soft">
                        <VeritasIcon size={24} className="text-primary-foreground" />
                      </div>
                      <div className="absolute -top-1 -right-1 p-1 bg-accent rounded-full">
                        <Star className="h-2 w-2 text-accent-foreground" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold font-display brand-text">
                        Veritas
                      </div>
                      <div className="text-xs text-muted-foreground">
                        by Analytics X
                      </div>
                    </div>
                  </Link>

                  {/* Mobile Navigation */}
                  <div className="flex flex-col space-y-2">
                    <NavLinks mobile />
                  </div>

                  {/* Mobile CTA Buttons */}
                  <div className="flex flex-col space-y-3 pt-6 border-t">
                    <Button variant="ghost" size="sm" asChild className="justify-start">
                      <Link to="/admin" onClick={() => setIsOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button variant="hero" size="sm" asChild className="justify-center">
                      <Link to="/contact" onClick={() => setIsOpen(false)}>
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;