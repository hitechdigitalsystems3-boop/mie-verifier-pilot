import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { NewRequestForm } from './NewRequestForm';
import { RequestsTable } from './RequestsTable';
import { ResultsTable } from './ResultsTable';
import { Shield, FileText, CheckCircle2, LogOut, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
      <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-elegant">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">MIE Verifier</h1>
                <p className="text-sm text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-1/2">
            <TabsTrigger value="new-request" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>New Request</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Requests</span>
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Results</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new-request" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Submit New Verification Request</CardTitle>
                <CardDescription>
                  Enter the details for a new verification request to be processed by MIE
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NewRequestForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Verification Requests</CardTitle>
                <CardDescription>
                  Monitor the status of all verification requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RequestsTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Verification Results</CardTitle>
                <CardDescription>
                  View detailed results and download PDF reports
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