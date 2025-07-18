import { getAuthUser } from '../../../lib/auth';
import { getUsers } from '../../../lib/database';
import { redirect } from 'next/navigation';
import UsersList from './UsersList';

export default async function UsersPage() {
  const user = await getAuthUser();
  
  if (!user || user.role !== 'admin') {
    redirect('/login');
  }

  const users = getUsers();
  const regularUsers = users.filter(u => u.role === 'user');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Honadonlar</h1>
              <p className="text-gray-600">Ro&apos;yxatga olingan honadonlar</p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/dashboard"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Dashboard
              </a>
              <a
                href="/create-user"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Yangi honadon
              </a>
              <form action="/api/auth/logout" method="POST" className="inline">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Chiqish
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Honadonlar ({regularUsers.length})
            </h2>
          </div>
          <UsersList users={regularUsers} />
        </div>
      </div>
    </div>
  );
}