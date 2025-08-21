import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, FileText, CheckCircle2, CreditCard, Building2, Clock, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: "credit",
      icon: CreditCard,
      title: "Credit Verification",
      description: "Comprehensive credit assessment and financial background validation",
      features: [
        "Full credit history analysis",
        "Payment behavior assessment",
        "Debt-to-income ratio evaluation",
        "Credit score validation",
        "Banking relationship verification",
        "Financial risk assessment"
      ],
      benefits: [
        "Reduce financial risk",
        "Make informed lending decisions",
        "Comply with regulatory requirements",
        "Prevent fraud and defaults"
      ],
      price: "From R250 per check"
    },
    {
      id: "identity",
      icon: Users,
      title: "Identity Verification",
      description: "Secure identity validation using multiple verification sources",
      features: [
        "ID document authentication",
        "Biometric verification",
        "Address confirmation",
        "Phone number validation",
        "Email verification",
        "Liveness detection"
      ],
      benefits: [
        "Prevent identity fraud",
        "Ensure KYC compliance",
        "Streamline onboarding",
        "Enhance security"
      ],
      price: "From R150 per check"
    },
    {
      id: "employment",
      icon: FileText,
      title: "Employment Verification",
      description: "Professional background and employment history validation",
      features: [
        "Employment history verification",
        "Reference checks",
        "Qualification validation",
        "Professional license verification",
        "Salary confirmation",
        "Performance history"
      ],
      benefits: [
        "Hire with confidence",
        "Reduce hiring risks",
        "Verify credentials",
        "Ensure workplace safety"
      ],
      price: "From R300 per check"
    },
    {
      id: "criminal",
      icon: Shield,
      title: "Criminal Background",
      description: "Thorough criminal record and legal history screening",
      features: [
        "Criminal record checks",
        "Court record searches",
        "Watchlist screening",
        "Sanctions checking",
        "PEP (Politically Exposed Person) screening",
        "Ongoing monitoring"
      ],
      benefits: [
        "Ensure workplace safety",
        "Protect company reputation",
        "Comply with regulations",
        "Mitigate legal risks"
      ],
      price: "From R200 per check"
    }
  ];

  const packages = [
    {
      name: "Starter",
      price: "R1,500",
      period: "per month",
      description: "Perfect for small businesses and startups",
      features: [
        "Up to 50 verifications/month",
        "Basic identity & credit checks",
        "Email support",
        "Standard reporting",
        "48-hour turnaround"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "R4,500",
      period: "per month",
      description: "Ideal for growing companies",
      features: [
        "Up to 200 verifications/month",
        "All verification types",
        "Priority phone support",
        "Advanced reporting & analytics",
        "24-hour turnaround",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations with high volume needs",
      features: [
        "Unlimited verifications",
        "Custom verification workflows",
        "Dedicated account manager",
        "Real-time API integration",
        "SLA guarantees",
        "Custom reporting dashboard"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="p-6 bg-gradient-hero rounded-3xl shadow-glow">
                <CheckCircle2 className="h-16 w-16 text-primary-foreground" />
              </div>
              <div className="absolute -top-2 -right-2 p-2 bg-accent rounded-full">
                <Star className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
            Our <span className="brand-text">Services</span>
          </h1>
          
          <p className="text-xl text-foreground max-w-4xl mx-auto mb-8">
            Comprehensive verification solutions designed to meet the diverse needs 
            of modern South African businesses.
          </p>
          
          <Button size="lg" variant="hero" className="text-lg px-8 py-6" asChild>
            <Link to="/contact">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="credit" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1 bg-card/50 backdrop-blur-sm">
              {services.map((service) => (
                <TabsTrigger 
                  key={service.id} 
                  value={service.id} 
                  className="flex flex-col items-center space-y-2 h-auto py-4 px-2"
                >
                  <service.icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{service.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {services.map((service) => (
              <TabsContent key={service.id} value={service.id} className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-gradient-primary rounded-xl mr-4">
                          <service.icon className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{service.title}</CardTitle>
                          <CardDescription className="text-lg">
                            {service.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">What's Included:</h3>
                        <ul className="space-y-2">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-success mr-3" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary">
                            {service.price}
                          </span>
                          <Button variant="accent" asChild>
                            <Link to="/contact">
                              Get Quote
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-xl">Key Benefits</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {service.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <div className="p-1 bg-success/20 rounded-full mr-3 mt-1">
                                <CheckCircle2 className="h-3 w-3 text-success" />
                              </div>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="shadow-elegant border-0 bg-gradient-accent text-accent-foreground">
                      <CardContent className="p-6 text-center">
                        <Clock className="h-12 w-12 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
                        <p className="opacity-90">
                          Most {service.title.toLowerCase()} requests are completed 
                          within 24 hours of submission.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-6">
              Choose Your <span className="brand-text">Plan</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing options to suit businesses of all sizes, 
              from startups to large enterprises.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card 
                key={index} 
                className={`hover-lift shadow-elegant border-0 bg-card/80 backdrop-blur-sm relative ${
                  pkg.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-primary">
                      {pkg.price}
                    </div>
                    <div className="text-muted-foreground">
                      {pkg.period}
                    </div>
                  </div>
                  <CardDescription className="text-center">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-success mr-3" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={pkg.popular ? "hero" : "outline"} 
                    className="w-full" 
                    size="lg"
                    asChild
                  >
                    <Link to="/contact">
                      {pkg.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold font-display mb-6">
              Ready to <span className="brand-text">Transform</span> Your Verification Process?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join hundreds of South African businesses who trust Veritas for their 
              verification needs. Get started today with a personalized consultation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="hero" className="text-lg px-8 py-6" asChild>
                <Link to="/contact">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link to="/admin">
                  Admin Portal
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;