import { getAuthUser } from '../../../lib/auth';
import { redirect } from 'next/navigation';
import CreateUserForm from './CreateUserForm';

export default async function CreateUserPage() {
  const user = await getAuthUser();
  
  if (!user || user.role !== 'admin') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Yangi foydalanuvchi</h1>
              <p className="text-gray-600">Honadon uchun yangi foydalanuvchi yaratish</p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/users"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Honadonlar
              </a>
              <a
                href="/dashboard"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Dashboard
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

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <CreateUserForm />
        </div>
      </div>
    </div>
  );
}