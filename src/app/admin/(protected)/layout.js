import Link from 'next/link';
import { getSession } from '@/lib/auth';
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';

export default async function AdminLayout({ children }) {
  const session = await getSession();

  if (session?.user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">403 - Forbidden</h1>
          <p className="text-gray-600 mb-8">You are not authorized to view this page.</p>
          <Link href="/admin/login" className="text-blue-600 hover:text-blue-500 font-medium">
            Login as Admin
          </Link>
        </div>
      </div>
    );
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
