import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { NewRequestForm } from './NewRequestForm';
import { RequestsTable } from './RequestsTable';
import { ResultsTable } from './ResultsTable';
import { Shield, FileText, CheckCircle2, LogOut, Settings, MapPin, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductionBanner } from '@/components/production/ProductionBanner';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('new-request');
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 bg-gradient-hero rounded-xl shadow-elegant hover-lift">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 p-1 bg-accent rounded-full">
                  <Star className="h-2 w-2 text-accent-foreground" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold font-display">
                  <span className="brand-text">Veritas</span>
                </h1>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>Analytics X • Johannesburg</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 mr-2 text-success" />
                <span>Dashboard</span>
              </div>
              <Button onClick={handleSignOut} variant="outline" size="sm" className="hover-lift">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <ProductionBanner />
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold font-display mb-2">Live Production Dashboard</h2>
          <p className="text-muted-foreground">Manage live verification requests and view comprehensive production reports</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-2/3 xl:w-1/2 h-12 p-1 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="new-request" className="flex items-center space-x-2 h-10 font-medium">
              <FileText className="h-4 w-4" />
              <span>New Request</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center space-x-2 h-10 font-medium">
              <Settings className="h-4 w-4" />
              <span>Requests</span>
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center space-x-2 h-10 font-medium">
              <CheckCircle2 className="h-4 w-4" />
              <span>Results</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new-request" className="space-y-6">
            <Card className="shadow-elegant hover-lift border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Submit New Live Verification Request
                </CardTitle>
                <CardDescription>
                  Create comprehensive production verification requests with multiple validation types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NewRequestForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card className="shadow-elegant hover-lift border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-processing" />
                  Live Verification Requests
                </CardTitle>
                <CardDescription>
                  Real-time monitoring and status tracking of all production verification requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RequestsTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card className="shadow-elegant hover-lift border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-success" />
                  Production Verification Results & Reports
                </CardTitle>
                <CardDescription>
                  Comprehensive live results with detailed reports and downloadable production documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResultsTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};