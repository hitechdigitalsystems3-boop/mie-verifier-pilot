import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, TrendingUp, Award, MapPin, Clock, CheckCircle2, Star } from 'lucide-react';

const About = () => {
  const milestones = [
    { year: "2020", title: "Company Founded", description: "Analytics X established in Johannesburg" },
    { year: "2021", title: "Veritas Platform Launch", description: "Revolutionary verification platform goes live" },
    { year: "2022", title: "10,000+ Verifications", description: "Reached significant milestone in successful verifications" },
    { year: "2023", title: "Enterprise Growth", description: "Expanded to serve major enterprises across SA" },
    { year: "2024", title: "AI Integration", description: "Advanced AI capabilities for faster processing" }
  ];

  const team = [
    { 
      name: "Sarah Mitchell", 
      role: "CEO & Founder", 
      description: "Former fintech executive with 15+ years in verification services",
      icon: Users
    },
    { 
      name: "Michael Chen", 
      role: "CTO", 
      description: "Tech visionary specializing in secure verification systems",
      icon: Shield
    },
    { 
      name: "Priya Patel", 
      role: "Head of Operations", 
      description: "Expert in compliance and regulatory frameworks",
      icon: CheckCircle2
    },
    { 
      name: "David Kruger", 
      role: "Head of Sales", 
      description: "Building relationships with enterprises across Africa",
      icon: TrendingUp
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We prioritize data protection and privacy in every verification process"
    },
    {
      icon: CheckCircle2,
      title: "Accuracy",
      description: "Our commitment to precision ensures reliable results every time"
    },
    {
      icon: Clock,
      title: "Speed",
      description: "Fast processing without compromising on thoroughness or quality"
    },
    {
      icon: Users,
      title: "Trust",
      description: "Building lasting relationships through transparency and reliability"
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
                <Shield className="h-16 w-16 text-primary-foreground" />
              </div>
              <div className="absolute -top-2 -right-2 p-2 bg-accent rounded-full">
                <Star className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
            About <span className="brand-text">Veritas</span>
          </h1>
          
          <div className="flex items-center justify-center text-lg text-muted-foreground mb-8">
            <MapPin className="h-5 w-5 mr-2" />
            <span>Analytics X • Johannesburg, South Africa</span>
          </div>
          
          <p className="text-xl text-foreground max-w-4xl mx-auto">
            We're revolutionizing the verification industry in South Africa with cutting-edge 
            technology and unwavering commitment to accuracy, security, and speed.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold font-display mb-6">
                Our <span className="brand-text">Mission</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                To provide South African businesses with the most reliable, secure, and 
                efficient verification services, enabling informed decision-making and 
                fostering trust in the digital economy.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe that proper verification is the foundation of trust in business 
                relationships, and we're committed to making it accessible, affordable, 
                and accurate for companies of all sizes.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <Card key={index} className="hover-lift shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-6">
              Our <span className="brand-text">Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From startup to industry leader, here's how we've grown to become 
              South Africa's trusted verification partner.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-primary"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <Card className="hover-lift shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-primary">
                          {milestone.year}
                        </CardTitle>
                        <CardDescription className="text-lg font-semibold text-foreground">
                          {milestone.title}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-6 h-6 bg-gradient-primary rounded-full border-4 border-background"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-6">
              Meet Our <span className="brand-text">Team</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate professionals behind Veritas, bringing decades of 
              combined experience in technology, finance, and verification services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hover-lift shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-primary rounded-2xl">
                      <member.icon className="h-12 w-12 text-primary-foreground" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-semibold">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold font-display mb-6">
            Our <span className="brand-text">Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Numbers that reflect our commitment to excellence and the trust 
            our clients place in our services.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold brand-text mb-2">10,000+</div>
              <div className="text-muted-foreground font-medium">Verifications Completed</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold brand-text mb-2">500+</div>
              <div className="text-muted-foreground font-medium">Enterprise Clients</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold brand-text mb-2">99.9%</div>
              <div className="text-muted-foreground font-medium">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold brand-text mb-2">24/7</div>
              <div className="text-muted-foreground font-medium">Support Available</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;