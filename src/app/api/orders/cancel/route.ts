import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatus } from '../../../../../lib/database';
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

    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { message: 'Order ID is required' },
        { status: 400 }
      );
    }

    const success = updateOrderStatus(orderId, 'cancelled');

    if (!success) {
      return NextResponse.json(
        { message: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Cancel order error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}