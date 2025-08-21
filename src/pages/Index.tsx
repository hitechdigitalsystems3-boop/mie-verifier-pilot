import { AuthGuard } from '@/components/auth/AuthGuard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';

const Index = () => {
  return (
    <AuthGuard>
      <AdminDashboard />
    </AuthGuard>
  );
};

export default Index;
