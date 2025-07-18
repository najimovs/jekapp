'use client';

interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({ className = "" }: LogoutButtonProps) {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={className}
    >
      Chiqish
    </button>
  );
}