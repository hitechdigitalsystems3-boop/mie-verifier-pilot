import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail, Clock, Star, Send, Building2, Users, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });
      setLoading(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our verification experts",
      info: "+27 11 123 4567",
      subInfo: "Available 24/7"
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Get detailed information and quotes",
      info: "info@veritas.co.za",
      subInfo: "Response within 4 hours"
    },
    {
      icon: MapPin,
      title: "Visit Our Office",
      description: "Meet us at our Johannesburg headquarters",
      info: "Sandton City Centre, Level 12",
      subInfo: "Johannesburg, South Africa"
    },
    {
      icon: Clock,
      title: "Business Hours",
      description: "When you can reach us",
      info: "Mon - Fri: 8:00 AM - 6:00 PM",
      subInfo: "Sat: 9:00 AM - 2:00 PM"
    }
  ];

  const services = [
    "Credit Verification",
    "Identity Verification", 
    "Employment Verification",
    "Criminal Background Checks",
    "Enterprise Solutions",
    "Custom Integration",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="p-6 bg-gradient-hero rounded-3xl shadow-glow">
                <MessageSquare className="h-16 w-16 text-primary-foreground" />
              </div>
              <div className="absolute -top-2 -right-2 p-2 bg-accent rounded-full">
                <Star className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
            Contact <span className="brand-text">Veritas</span>
          </h1>
          
          <p className="text-xl text-foreground max-w-4xl mx-auto mb-8">
            Ready to transform your verification process? Get in touch with our team of experts 
            for personalized solutions and competitive pricing.
          </p>
          
          <div className="flex items-center justify-center text-lg text-muted-foreground">
            <MapPin className="h-5 w-5 mr-2" />
            <span>Analytics X • Johannesburg, South Africa</span>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="hover-lift shadow-elegant border-0 bg-card/80 backdrop-blur-sm text-center">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-primary rounded-xl">
                      <info.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{info.description}</p>
                  <p className="font-semibold text-foreground">{info.info}</p>
                  <p className="text-sm text-muted-foreground">{info.subInfo}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Send className="h-6 w-6 mr-3 text-primary" />
                  Get in Touch
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours 
                  with a personalized quote and consultation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        required
                        className="transition-all focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        required
                        className="transition-all focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      required
                      className="transition-all focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+27 11 123 4567"
                      className="transition-all focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      placeholder="Your Company Ltd"
                      className="transition-all focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service Interest</Label>
                    <Select>
                      <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service, index) => (
                          <SelectItem key={index} value={service.toLowerCase().replace(/\s+/g, '-')}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your verification needs, expected volume, and any specific requirements..."
                      rows={5}
                      required
                      className="transition-all focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg" 
                    variant="hero"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Send className="h-5 w-5 mr-2" />
                    )}
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <div className="space-y-8">
              <Card className="shadow-elegant border-0 bg-gradient-primary text-primary-foreground">
                <CardContent className="p-8">
                  <Building2 className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Enterprise Solutions</h3>
                  <p className="mb-6 opacity-90">
                    Need custom verification workflows, high-volume processing, or 
                    specialized integration? Our enterprise team can create tailored 
                    solutions for your organization.
                  </p>
                  <Button variant="outline" className="text-primary bg-primary-foreground hover:bg-primary-foreground/90">
                    Schedule Enterprise Consultation
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-6 w-6 mr-3 text-accent" />
                    Why Choose Veritas?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <div className="p-1 bg-success/20 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold">Local Expertise</h4>
                      <p className="text-sm text-muted-foreground">
                        Deep understanding of South African verification requirements
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-1 bg-success/20 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold">Fast Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        Most verifications completed within 24 hours
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-1 bg-success/20 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold">Secure & Compliant</h4>
                      <p className="text-sm text-muted-foreground">
                        POPIA compliant with enterprise-grade security
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-1 bg-success/20 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold">24/7 Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Round-the-clock customer support and assistance
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elegant border-0 bg-gradient-accent text-accent-foreground">
                <CardContent className="p-8 text-center">
                  <Clock className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Quick Response Guarantee</h3>
                  <p className="opacity-90">
                    We respond to all inquiries within 4 hours during business hours, 
                    and within 24 hours on weekends.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;