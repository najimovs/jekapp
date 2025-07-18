'use client';

import { useState } from 'react';
import { Order } from '../../../lib/database';
import UserOrdersList from './UserOrdersList';
import NewOrderModal from './NewOrderModal';

interface OrdersClientProps {
  orders: Order[];
}

export default function OrdersClient({ orders }: OrdersClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Buyurtmalar</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Yangi buyurtma
          </button>
        </div>
        <UserOrdersList orders={orders} />
      </div>

      <NewOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}