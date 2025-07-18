import { getAuthUser } from '../../../lib/auth';
import { getOrders } from '../../../lib/database';
import { redirect } from 'next/navigation';
import OrdersList from './OrdersList';
import LogoutButton from '../components/LogoutButton';

export default async function DashboardPage() {
  const user = await getAuthUser();
  
  if (!user || user.role !== 'admin') {
    redirect('/login');
  }

  const orders = getOrders();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Barcha buyurtmalarni boshqarish</p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/users"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Honadonlar
              </a>
              <LogoutButton className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Buyurtmalar</h2>
          </div>
          <OrdersList orders={orders} />
        </div>
      </div>
    </div>
  );
}