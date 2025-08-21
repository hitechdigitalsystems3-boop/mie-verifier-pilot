import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, Search, Download, Eye, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface VerificationResult {
  id: string;
  request_id: string;
  verification_type: string;
  result_code: string | null;
  result_description: string | null;
  supplier: string | null;
  risk_level: string | null;
  completed_at: string;
  extended_info: any;
  pdf_report_url: string | null;
  verification_requests: {
    first_name: string;
    surname: string;
    id_number: string;
  };
}

export const ResultsTable = () => {
  const [results, setResults] = useState<VerificationResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const fetchResults = async () => {
    try {
      const { data, error } = await supabase
        .from('verification_results')
        .select(`
          *,
          verification_requests (
            first_name,
            surname,
            id_number
          )
        `)
        .order('completed_at', { ascending: false });

      if (error) throw error;

      setResults(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch results: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();

    // Set up real-time subscription
    const channel = supabase
      .channel('results-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'verification_results'
        },
        () => fetchResults()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredResults = results.filter(result =>
    result.verification_requests?.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.verification_requests?.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.verification_requests?.id_number.includes(searchTerm) ||
    result.verification_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.supplier?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskBadge = (riskLevel: string | null) => {
    if (!riskLevel) return null;
    
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return <Badge variant="success">Low Risk</Badge>;
      case 'medium':
        return <Badge variant="warning">Medium Risk</Badge>;
      case 'high':
        return <Badge variant="destructive">High Risk</Badge>;
      default:
        return <Badge variant="secondary">{riskLevel}</Badge>;
    }
  };

  const handleDownloadPDF = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Refresh */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, type, or supplier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={fetchResults} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>ID Number</TableHead>
              <TableHead>Verification Type</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Completed</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No verification results found
                </TableCell>
              </TableRow>
            ) : (
              filteredResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">
                    {result.verification_requests?.first_name} {result.verification_requests?.surname}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {result.verification_requests?.id_number}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{result.verification_type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {result.result_code && (
                        <div className="font-mono text-sm">{result.result_code}</div>
                      )}
                      {result.result_description && (
                        <div className="text-sm text-muted-foreground">
                          {result.result_description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {result.supplier && (
                      <Badge variant="outline">{result.supplier}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {getRiskBadge(result.risk_level)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(result.completed_at), { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {/* View Details Dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Verification Result Details</DialogTitle>
                            <DialogDescription>
                              Detailed information for {result.verification_type} verification
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold">Name</h4>
                                <p>{result.verification_requests?.first_name} {result.verification_requests?.surname}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">ID Number</h4>
                                <p className="font-mono">{result.verification_requests?.id_number}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Verification Type</h4>
                                <p>{result.verification_type}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Result Code</h4>
                                <p className="font-mono">{result.result_code || 'N/A'}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Supplier</h4>
                                <p>{result.supplier || 'N/A'}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Risk Level</h4>
                                <div>{getRiskBadge(result.risk_level) || 'N/A'}</div>
                              </div>
                            </div>
                            
                            {result.result_description && (
                              <div>
                                <h4 className="font-semibold">Description</h4>
                                <p className="text-sm text-muted-foreground">{result.result_description}</p>
                              </div>
                            )}

                            {result.extended_info && (
                              <div>
                                <h4 className="font-semibold">Extended Information</h4>
                                <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-40">
                                  {JSON.stringify(result.extended_info, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Download PDF */}
                      {result.pdf_report_url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadPDF(
                            result.pdf_report_url!,
                            `${result.verification_type}_${result.verification_requests?.id_number}.pdf`
                          )}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};