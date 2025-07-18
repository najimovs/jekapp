import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatus, getOrders } from '../../../../../lib/database';
import { getAuthUser } from '../../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    
    if (!user || user.role !== 'user') {
      return NextResponse.json(
        { message: 'User access required' },
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

    // Check if the order belongs to the user
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
      return NextResponse.json(
        { message: 'Order not found' },
        { status: 404 }
      );
    }

    if (order.user_id !== user.id) {
      return NextResponse.json(
        { message: 'You can only close your own orders' },
        { status: 403 }
      );
    }

    const success = updateOrderStatus(orderId, 'closed');

    if (!success) {
      return NextResponse.json(
        { message: 'Failed to close order' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Order closed successfully' });
  } catch (error) {
    console.error('Close order error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}