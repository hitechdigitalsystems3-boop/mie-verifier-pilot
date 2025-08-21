import { AuthGuard } from '@/components/auth/AuthGuard';
import { AdminDashboard as AdminDashboardComponent } from '@/components/dashboard/AdminDashboard';

const AdminDashboard = () => {
  return (
    <AuthGuard>
      <AdminDashboardComponent />
    </AuthGuard>
  );
};

export default AdminDashboard;