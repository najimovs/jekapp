import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUsers } from '../../../../../lib/database';
import { getAuthUser } from '../../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Admin access required' },
        { status: 403 }
      );
    }

    const { apartment, room, password } = await request.json();

    if (!apartment || !room || !password) {
      return NextResponse.json(
        { message: 'Apartment, room, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const username = `${apartment}_${room}`;
    
    // Check if user already exists
    const existingUsers = getUsers();
    const existingUser = existingUsers.find(u => u.username === username);
    
    if (existingUser) {
      return NextResponse.json(
        { message: 'Bu honadon uchun foydalanuvchi allaqachon mavjud' },
        { status: 400 }
      );
    }

    const newUser = createUser(username, password, apartment, room);

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        apartment: newUser.apartment,
        room: newUser.room,
      },
    });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}