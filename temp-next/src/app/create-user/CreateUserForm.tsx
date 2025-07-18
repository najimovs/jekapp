'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateUserForm() {
  const [apartment, setApartment] = useState('');
  const [room, setRoom] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Parollar mos kelmaydi');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Parol kamida 6 ta belgidan iborat bo&apos;lishi kerak');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apartment: parseInt(apartment),
          room: parseInt(room),
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(`Foydalanuvchi muvaffaqiyatli yaratildi! Login: ${data.username}`);
        setApartment('');
        setRoom('');
        setPassword('');
        setConfirmPassword('');
        
        setTimeout(() => {
          router.push('/users');
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.message || 'Foydalanuvchi yaratishda xatolik');
      }
    } catch {
      setError('Foydalanuvchi yaratishda xatolik');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Yangi honadon qo&apos;shish
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-2">
            Apartment raqami
          </label>
          <input
            type="number"
            id="apartment"
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="21"
            min="1"
          />
        </div>

        <div>
          <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-2">
            Honadon raqami
          </label>
          <input
            type="number"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="169"
            min="1"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Parol
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Kamida 6 ta belgi"
          minLength={6}
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Parolni tasdiqlash
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Parolni qayta kiriting"
          minLength={6}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 text-blue-600 px-4 py-3 rounded-lg">
        <p className="text-sm">
          <strong>Eslatma:</strong> Login avtomatik ravishda apartment_room formatida yaratiladi.
          Masalan: {apartment && room ? `${apartment}_${room}` : "apartment_room"}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Yaratilmoqda...' : 'Foydalanuvchi yaratish'}
        </button>
        
        <button
          type="button"
          onClick={() => router.push('/users')}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Bekor qilish
        </button>
      </div>
    </form>
  );
}