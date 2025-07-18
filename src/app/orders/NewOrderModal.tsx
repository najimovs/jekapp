'use client';

import { useState } from 'react';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewOrderModal({ isOpen, onClose }: NewOrderModalProps) {
  const [orderType, setOrderType] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderType,
          description,
        }),
      });

      if (response.ok) {
        setOrderType('');
        setDescription('');
        onClose();
        window.location.reload();
      } else {
        alert('Buyurtma berishda xatolik');
      }
    } catch {
      alert('Buyurtma berishda xatolik');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Yangi buyurtma</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="order-type" className="block text-sm font-medium text-gray-700 mb-2">
              Buyurtma turi
            </label>
            <select
              id="order-type"
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Turni tanlang</option>
              <option value="elektrik">Elektrik</option>
              <option value="santexnik">Santexnik</option>
              <option value="usta">Usta</option>
              <option value="vahokzo">Vahokzo</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Izoh
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Muammoni batafsil yozing..."
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Yuborilmoqda...' : 'Buyurtma berish'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Bekor qilish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}