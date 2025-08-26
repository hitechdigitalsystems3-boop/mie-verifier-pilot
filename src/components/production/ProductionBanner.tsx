import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const ProductionBanner = () => {
  return (
    <Alert className="border-success bg-success/10 mb-6">
      <CheckCircle2 className="h-4 w-4 text-success" />
      <AlertDescription className="text-success-foreground font-medium">
        <strong>Production Environment Active</strong> - All requests are now being processed through MIE's live production API. 
        Data will be stored in real production databases and may incur charges.
      </AlertDescription>
    </Alert>
  );
};