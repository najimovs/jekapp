import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '../../../../../lib/database';
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

    const { orderType, description } = await request.json();

    if (!orderType || !description) {
      return NextResponse.json(
        { message: 'Order type and description are required' },
        { status: 400 }
      );
    }

    const validOrderTypes = ['elektrik', 'santexnik', 'usta', 'vahokzo'];
    if (!validOrderTypes.includes(orderType)) {
      return NextResponse.json(
        { message: 'Invalid order type' },
        { status: 400 }
      );
    }

    const newOrder = createOrder(user.id, orderType, description);

    return NextResponse.json({
      message: 'Order created successfully',
      order: newOrder,
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}