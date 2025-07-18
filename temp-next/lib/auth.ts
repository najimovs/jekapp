import { cookies } from 'next/headers';
import { User } from './database';

export async function setAuthCookie(user: User): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('auth-user', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });
}

export async function getAuthUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('auth-user');
    if (!authCookie) return null;
    return JSON.parse(authCookie.value);
  } catch {
    return null;
  }
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('auth-user');
}

export async function requireAuth(): Promise<User> {
  const user = await getAuthUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await requireAuth();
  if (user.role !== 'admin') {
    throw new Error('Admin access required');
  }
  return user;
}