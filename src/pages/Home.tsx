import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle2, Star, TrendingUp, Users, FileText, Clock, MapPin, Phone, Mail, ArrowRight, Sparkles, Award, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const services = [
    {
      icon: Shield,
      title: "Credit Verification",
      description: "AI-powered credit analysis with real-time risk assessment",
      features: ["Credit Score Analysis", "Payment History", "Debt Assessment", "Risk Profiling"],
      color: "from-blue-500 to-cyan-500",
      delay: "0ms"
    },
    {
      icon: Users,
      title: "Identity Verification",
      description: "Biometric validation with military-grade security protocols",
      features: ["Biometric Matching", "Document Verification", "Liveness Detection", "Multi-factor Auth"],
      color: "from-purple-500 to-pink-500",
      delay: "100ms"
    },
    {
      icon: FileText,
      title: "Employment Verification",
      description: "Professional background validation with global database access",
      features: ["Work History", "Reference Checks", "Qualification Verification", "Performance Analytics"],
      color: "from-green-500 to-emerald-500",
      delay: "200ms"
    },
    {
      icon: CheckCircle2,
      title: "Criminal Background",
      description: "Comprehensive screening with international criminal databases",
      features: ["Criminal Records", "Court Records", "Watchlist Screening", "Real-time Monitoring"],
      color: "from-orange-500 to-red-500",
      delay: "300ms"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Verifications Completed", icon: Award, color: "text-primary" },
    { number: "99.98%", label: "Accuracy Rate", icon: Sparkles, color: "text-accent" },
    { number: "24/7", label: "Support Available", icon: Globe, color: "text-tertiary" },
    { number: "2 Min", label: "Average Processing", icon: Zap, color: "text-warning" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.1), transparent 40%)`
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-premium rounded-full opacity-30 float-animation"></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-luxury rounded-full opacity-25 animate-pulse"></div>

      {/* Hero Section - Optimized for Laptop */}
      <section className="relative py-16 px-4 overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="relative pulse-premium">
              <div className="p-6 bg-gradient-hero rounded-2xl shadow-luxury hover-glow">
                <Shield className="h-14 w-14 text-primary-foreground" />
              </div>
              <div className="absolute -top-2 -right-2 p-2 bg-gradient-youthful rounded-full animate-bounce">
                <Star className="h-5 w-5 text-accent-foreground" />
              </div>
              <div className="absolute -bottom-1 -left-1 p-1.5 bg-gradient-luxury rounded-full">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-6 tracking-tight">
            <span className="brand-text drop-shadow-lg">Veritas</span>
          </h1>
          
          <div className="mb-6">
            <p className="text-xl md:text-2xl luxury-text mb-2 font-light">
              The Future of Verification
            </p>
            <p className="text-base md:text-lg text-muted-foreground/80">
              Powered by Advanced AI & Machine Learning
            </p>
          </div>
          
          <div className="flex items-center justify-center text-sm md:text-base text-muted-foreground mb-8 glass-card inline-flex px-4 py-2 rounded-full">
            <MapPin className="h-4 w-4 mr-2 text-accent" />
            <span>Analytics X • Johannesburg, South Africa</span>
            <div className="ml-2 w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
          </div>
          
          <p className="text-lg md:text-xl text-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Trusted by <span className="luxury-text font-semibold">500+ enterprises</span> across Africa for 
            next-generation verification and AI-powered risk assessment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="youthful" className="text-lg px-8 py-6 group" asChild>
              <Link to="/services">
                <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Explore Solutions
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="glass" className="text-lg px-8 py-6 group" asChild>
              <Link to="/contact">
                <Award className="mr-2 h-5 w-5" />
                Get Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-luxury opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-primary rounded-2xl shadow-luxury group-hover:scale-110 transition-luxury">
                    <stat.icon className={`h-8 w-8 text-primary-foreground`} />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold brand-text mb-2 group-hover:scale-105 transition-luxury">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-glass"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold font-display mb-8">
              Our <span className="luxury-text">Premium</span> <span className="brand-text">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Next-generation verification solutions powered by AI, machine learning, 
              and advanced biometric technologies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="premium-card group relative overflow-hidden"
                style={{ animationDelay: service.delay }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <CardHeader className="text-center relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-gradient-luxury rounded-2xl shadow-luxury group-hover:scale-110 group-hover:rotate-3 transition-luxury">
                      <service.icon className="h-10 w-10 text-primary-foreground" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-center text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div className="p-1 bg-success/20 rounded-full mr-3">
                          <CheckCircle2 className="h-3 w-3 text-success" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <Button variant="ghost" size="sm" className="w-full group/btn">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                Why Choose <span className="brand-text">Veritas</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We combine cutting-edge technology with local expertise to deliver 
                unparalleled verification services across South Africa.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-2 bg-gradient-accent rounded-lg mr-4">
                    <TrendingUp className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Lightning Fast Processing</h3>
                    <p className="text-muted-foreground">
                      Get verification results in minutes, not days. Our automated 
                      systems ensure rapid processing without compromising accuracy.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-gradient-primary rounded-lg mr-4">
                    <Shield className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
                    <p className="text-muted-foreground">
                      Bank-grade encryption and compliance with POPIA regulations 
                      ensure your data remains secure and confidential.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-gradient-accent rounded-lg mr-4">
                    <Clock className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                    <p className="text-muted-foreground">
                      Our dedicated support team is available around the clock 
                      to assist with your verification needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Card className="hover-lift shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Verified Results</h3>
                    <p className="text-sm text-muted-foreground">
                      Multi-source verification for maximum accuracy
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="hover-lift shadow-elegant border-0 bg-card/80 backdrop-blur-sm mt-8">
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Expert Team</h3>
                    <p className="text-sm text-muted-foreground">
                      Experienced professionals ensuring quality
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="hover-lift shadow-elegant border-0 bg-card/80 backdrop-blur-sm -mt-4">
                  <CardContent className="p-6 text-center">
                    <FileText className="h-12 w-12 text-accent mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Detailed Reports</h3>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive documentation and insights
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="hover-lift shadow-elegant border-0 bg-card/80 backdrop-blur-sm mt-4">
                  <CardContent className="p-6 text-center">
                    <MapPin className="h-12 w-12 text-processing mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Local Expertise</h3>
                    <p className="text-sm text-muted-foreground">
                      Deep understanding of South African market
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Ready to Get <span className="brand-text">Started</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join hundreds of businesses who trust Veritas for their verification needs. 
            Contact us today for a personalized consultation.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="hover-lift shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-muted-foreground mb-4">Speak with our experts</p>
                <p className="font-semibold">+27 11 123 4567</p>
              </CardContent>
            </Card>
            
            <Card className="hover-lift shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Mail className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-muted-foreground mb-4">Get detailed information</p>
                <p className="font-semibold">info@veritas.co.za</p>
              </CardContent>
            </Card>
            
            <Card className="hover-lift shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <MapPin className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                <p className="text-muted-foreground mb-4">Our Johannesburg office</p>
                <p className="font-semibold">Sandton City Centre</p>
              </CardContent>
            </Card>
          </div>
          
          <Button size="lg" variant="hero" className="text-lg px-12 py-6" asChild>
            <Link to="/contact">
              Start Your Verification Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;