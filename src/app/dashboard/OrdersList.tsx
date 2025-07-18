'use client';

import { useState } from 'react';
import { Order } from '../../../lib/database';

interface OrdersListProps {
  orders: Order[];
}

export default function OrdersList({ orders: initialOrders }: OrdersListProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [loading, setLoading] = useState<string | null>(null);

  const exportToCSV = () => {
    const headers = ['ID', 'Foydalanuvchi', 'Turi', 'Izoh', 'Sana', 'Holati'];
    const csvData = [
      headers.join(','),
      ...orders.map(order => [
        order.id,
        order.user_id,
        getOrderTypeText(order.order_type),
        `"${order.description.replace(/"/g, '""')}"`, // Escape quotes
        new Date(order.order_date).toLocaleDateString('uz-UZ'),
        getStatusText(order.status)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `buyurtmalar_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('Bu buyurtmani bekor qilishni xohlaysizmi?')) {
      return;
    }

    setLoading(orderId);
    try {
      const response = await fetch('/api/orders/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      if (response.ok) {
        setOrders(orders.map(order => 
          order.id === orderId 
            ? { ...order, status: 'cancelled' as const }
            : order
        ));
      } else {
        alert('Buyurtmani bekor qilishda xatolik');
      }
    } catch {
      alert('Buyurtmani bekor qilishda xatolik');
    } finally {
      setLoading(null);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'open':
        return 'Ochiq';
      case 'closed':
        return 'Yopilgan';
      case 'cancelled':
        return 'Bekor qilingan';
      default:
        return status;
    }
  };

  const getOrderTypeText = (type: Order['order_type']) => {
    switch (type) {
      case 'elektrik':
        return 'Elektrik';
      case 'santexnik':
        return 'Santexnik';
      case 'usta':
        return 'Usta';
      case 'vahokzo':
        return 'Vahokzo';
      default:
        return type;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        Hozircha buyurtmalar yo&apos;q
      </div>
    );
  }

  return (
    <div>
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Jami {orders.length} ta buyurtma
        </div>
        <button
          onClick={exportToCSV}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          CSV Export
        </button>
      </div>
      <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Buyurtma ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Foydalanuvchi
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Turi
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Izoh
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sana
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Holati
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Harakatlar
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{order.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.user_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {getOrderTypeText(order.order_type)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                {order.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(order.order_date).toLocaleDateString('uz-UZ')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.status === 'open' && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    disabled={loading === order.id}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                  >
                    {loading === order.id ? 'Yuklanmoqda...' : 'Bekor qilish'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}