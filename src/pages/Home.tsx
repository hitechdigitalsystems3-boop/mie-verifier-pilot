import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle2, Star, TrendingUp, Users, FileText, Clock, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    {
      icon: Shield,
      title: "Credit Verification",
      description: "Comprehensive credit history and financial background checks",
      features: ["Credit Score Analysis", "Payment History", "Debt Assessment"]
    },
    {
      icon: Users,
      title: "Identity Verification",
      description: "Secure identity validation and document verification",
      features: ["ID Document Verification", "Biometric Matching", "Address Verification"]
    },
    {
      icon: FileText,
      title: "Employment Verification",
      description: "Professional background and employment history validation",
      features: ["Work History", "Reference Checks", "Qualification Verification"]
    },
    {
      icon: CheckCircle2,
      title: "Criminal Background",
      description: "Thorough criminal record and legal history screening",
      features: ["Criminal Records", "Court Records", "Watchlist Screening"]
    }
  ];

  const stats = [
    { number: "10,000+", label: "Verifications Completed" },
    { number: "99.9%", label: "Accuracy Rate" },
    { number: "24/7", label: "Support Available" },
    { number: "5 Min", label: "Average Processing" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="p-6 bg-gradient-hero rounded-3xl shadow-glow hover-lift">
                <Shield className="h-16 w-16 text-primary-foreground" />
              </div>
              <div className="absolute -top-2 -right-2 p-2 bg-accent rounded-full animate-pulse">
                <Star className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold font-display mb-6">
            <span className="brand-text">Veritas</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Professional Verification Platform
          </p>
          
          <div className="flex items-center justify-center text-lg text-muted-foreground mb-8">
            <MapPin className="h-5 w-5 mr-2" />
            <span>Analytics X • Johannesburg, South Africa</span>
          </div>
          
          <p className="text-lg md:text-xl text-foreground mb-12 max-w-3xl mx-auto">
            Trusted by enterprises across South Africa for comprehensive background verification, 
            credit assessment, and identity validation services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="hero" className="text-lg px-8 py-6" asChild>
              <Link to="/services">
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link to="/contact">
                Get Quote
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold brand-text mb-2">
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
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Our <span className="brand-text">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive verification solutions tailored for modern businesses
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover-lift shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-primary rounded-xl">
                      <service.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                  <CardDescription className="text-center">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle2 className="h-4 w-4 text-success mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
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