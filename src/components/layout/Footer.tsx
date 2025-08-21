import { Link } from 'react-router-dom';
import { Shield, MapPin, Phone, Mail, Star, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  const services = [
    { name: 'Credit Verification', href: '/services#credit' },
    { name: 'Identity Verification', href: '/services#identity' },
    { name: 'Employment Verification', href: '/services#employment' },
    { name: 'Criminal Background', href: '/services#criminal' },
  ];

  const legal = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'POPIA Compliance', href: '/popia' },
    { name: 'Security', href: '/security' },
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="p-3 bg-gradient-hero rounded-xl shadow-soft">
                  <Shield className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 p-1 bg-accent rounded-full">
                  <Star className="h-3 w-3 text-accent-foreground" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold font-display brand-text">
                  Veritas
                </div>
                <div className="text-sm text-muted-foreground">
                  by Analytics X
                </div>
              </div>
            </Link>
            
            <p className="text-muted-foreground">
              South Africa's leading verification platform, providing comprehensive 
              background checks and identity validation services for modern businesses.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Sandton City Centre, Johannesburg</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                <span>+27 11 123 4567</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@veritas.co.za</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Legal & Compliance</h3>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                POPIA compliant verification services with enterprise-grade security.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Analytics X. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link 
              to="/admin" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Admin Portal
            </Link>
            <Link 
              to="/contact" 
              className="text-sm text-primary hover:text-primary-dark transition-colors font-medium"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;