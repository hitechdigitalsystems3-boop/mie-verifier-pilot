import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send, AlertCircle } from 'lucide-react';

const VERIFICATION_TYPES = [
  { id: 'CREDIT', label: 'Credit Check', description: 'Credit history and financial standing' },
  { id: 'CRIMINAL', label: 'Criminal Record', description: 'Criminal background verification' },
  { id: 'EMPLOYMENT', label: 'Employment History', description: 'Previous employment verification' },
  { id: 'EDUCATION', label: 'Educational Qualifications', description: 'Academic credentials verification' },
  { id: 'IDENTITY', label: 'Identity Verification', description: 'ID document and identity confirmation' },
  { id: 'DIRECTORSHIP', label: 'Directorship Check', description: 'Company directorship verification' },
  { id: 'BANKRUPTCY', label: 'Bankruptcy/Sequestration', description: 'Insolvency and bankruptcy records' },
  { id: 'PROPERTY', label: 'Property Ownership', description: 'Property ownership verification' },
];

export const NewRequestForm = () => {
  const [loading, setLoading] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    clientKey: '',
    firstName: '',
    surname: '',
    idNumber: '',
    dateOfBirth: '',
    verificationTypes: [] as string[],
    additionalNotes: '',
  });

  const handleVerificationTypeChange = (typeId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      verificationTypes: checked
        ? [...prev.verificationTypes, typeId]
        : prev.verificationTypes.filter(id => id !== typeId)
    }));
  };

  const testConnection = async () => {
    setTestingConnection(true);
    try {
      const response = await supabase.functions.invoke('mie-test', {
        method: 'POST'
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (!response.data.success) {
        throw new Error(response.data.error);
      }

      toast({
        title: "Connection Successful",
        description: "MIE API connection is working properly",
      });
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.verificationTypes.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one verification type",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Format date of birth for MIE API
      const dobFormatted = new Date(formData.dateOfBirth).toISOString();

      console.log('Submitting to mie-submit function with data:', {
        clientKey: formData.clientKey,
        firstName: formData.firstName,
        surname: formData.surname,
        idNumber: formData.idNumber,
        dateOfBirth: dobFormatted,
        verificationTypes: formData.verificationTypes,
        additionalNotes: formData.additionalNotes,
      });

      const response = await supabase.functions.invoke('mie-submit', {
        body: {
          clientKey: formData.clientKey,
          firstName: formData.firstName,
          surname: formData.surname,
          idNumber: formData.idNumber,
          dateOfBirth: dobFormatted,
          verificationTypes: formData.verificationTypes,
          additionalNotes: formData.additionalNotes,
        }
      });

      console.log('Response from mie-submit:', response);

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (!response.data.success) {
        throw new Error(response.data.error);
      }

      toast({
        title: "Request Submitted",
        description: `Verification request submitted successfully. Request ID: ${response.data.requestId}`,
      });

      // Reset form
      setFormData({
        clientKey: '',
        firstName: '',
        surname: '',
        idNumber: '',
        dateOfBirth: '',
        verificationTypes: [],
        additionalNotes: '',
      });

    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Connection Test */}
      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-warning" />
            MIE API Connection
          </CardTitle>
          <CardDescription>
            Test the connection to MIE API before submitting requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={testConnection} 
            disabled={testingConnection}
            variant="outline"
            className="w-full sm:w-auto"
          >
            {testingConnection ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
            ) : null}
            Test Connection
          </Button>
        </CardContent>
      </Card>

      {/* Request Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="clientKey">Client Key *</Label>
            <Input
              id="clientKey"
              value={formData.clientKey}
              onChange={(e) => setFormData(prev => ({ ...prev, clientKey: e.target.value }))}
              placeholder="Enter client key"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="idNumber">ID Number *</Label>
            <Input
              id="idNumber"
              value={formData.idNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, idNumber: e.target.value }))}
              placeholder="Enter ID number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="surname">Surname *</Label>
            <Input
              id="surname"
              value={formData.surname}
              onChange={(e) => setFormData(prev => ({ ...prev, surname: e.target.value }))}
              placeholder="Enter surname"
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold">Verification Types *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {VERIFICATION_TYPES.map((type) => (
              <div key={type.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id={type.id}
                  checked={formData.verificationTypes.includes(type.id)}
                  onCheckedChange={(checked) => handleVerificationTypeChange(type.id, checked as boolean)}
                />
                <div className="space-y-1 leading-none">
                  <Label
                    htmlFor={type.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type.label}
                  </Label>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalNotes">Additional Notes</Label>
          <Textarea
            id="additionalNotes"
            value={formData.additionalNotes}
            onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
            placeholder="Any additional information or special requirements..."
            rows={3}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full" variant="hero">
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          ) : (
            <Send className="h-4 w-4 mr-2" />
          )}
          Submit Verification Request
        </Button>
      </form>
    </div>
  );
};