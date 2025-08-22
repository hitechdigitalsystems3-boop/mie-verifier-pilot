import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, MapPin, Star } from 'lucide-react';
import VeritasIcon from '@/components/ui/veritas-icon';

export const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Signed in successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Account created successfully! Please check your email for verification.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const AuthForm = ({ isSignUp = false }: { isSignUp?: boolean }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (isSignUp) {
        handleSignUp(email, password);
      } else {
        handleSignIn(email, password);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading} variant="hero" size="lg">
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          ) : null}
          {isSignUp ? 'Create Account' : 'Sign In'}
        </Button>
      </form>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="p-4 bg-gradient-hero rounded-2xl shadow-glow hover-lift">
                <VeritasIcon size={40} className="text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 p-1 bg-accent rounded-full">
                <Star className="h-3 w-3 text-accent-foreground" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold font-display mb-2">
            <span className="brand-text">Veritas</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-1">by Analytics X</p>
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Johannesburg, South Africa</span>
          </div>
          <p className="text-muted-foreground mt-3">Professional verification platform</p>
        </div>

        <Card className="shadow-elegant hover-lift border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold">Welcome Back</CardTitle>
            <CardDescription>
              Access your verification dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Create Account</TabsTrigger>
              </TabsList>
              <TabsContent value="signin" className="mt-6">
                <AuthForm />
              </TabsContent>
              <TabsContent value="signup" className="mt-6">
                <AuthForm isSignUp />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-8 text-center space-y-3">
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 mr-2 text-success" />
            Enterprise-grade security & encryption
          </div>
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Analytics X. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};