'use client';

import { User } from '../../../lib/database';

interface UsersListProps {
  users: User[];
}

export default function UsersList({ users }: UsersListProps) {
  if (users.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p className="text-lg mb-4">Hozircha honadonlar yo&apos;q</p>
        <p className="text-sm">Yangi honadon qo&apos;shish uchun yuqoridagi &quot;Yangi honadon&quot; tugmasini bosing</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Login
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Apartment
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Honadon
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Manzil
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Yaratilgan
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {user.username}
                </div>
                <div className="text-sm text-gray-500">
                  ID: {user.id}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.apartment}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.room}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.apartment}-apartment, {user.room}-honadon
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Ro&apos;yxatga olingan
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}