import { getAuthUser } from '../../../lib/auth';
import { getOrders } from '../../../lib/database';
import { redirect } from 'next/navigation';
import OrdersClient from './OrdersClient';
import LogoutButton from '../components/LogoutButton';

export default async function OrdersPage() {
  const user = await getAuthUser();
  
  if (!user || user.role !== 'user') {
    redirect('/login');
  }

  const allOrders = getOrders();
  const userOrders = allOrders.filter(order => order.user_id === user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mening buyurtmalarim</h1>
              <p className="text-gray-600">
                Honadon: {user.apartment}-{user.room}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <LogoutButton className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <OrdersClient orders={userOrders} />
      </div>
    </div>
  );
}