import fs from 'fs';
import path from 'path';

export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
  apartment: number | null;
  room: number | null;
}

export interface Order {
  id: string;
  user_id: string;
  order_type: 'elektrik' | 'santexnik' | 'usta' | 'vahokzo';
  description: string;
  order_date: string;
  status: 'open' | 'closed' | 'cancelled';
}

const dataPath = path.join(process.cwd(), 'data');

export function getUsers(): User[] {
  const usersFile = path.join(dataPath, 'users.json');
  if (!fs.existsSync(usersFile)) {
    return [];
  }
  const data = fs.readFileSync(usersFile, 'utf-8');
  return JSON.parse(data);
}

export function getOrders(): Order[] {
  const ordersFile = path.join(dataPath, 'orders.json');
  if (!fs.existsSync(ordersFile)) {
    return [];
  }
  const data = fs.readFileSync(ordersFile, 'utf-8');
  return JSON.parse(data);
}

export function saveUsers(users: User[]): void {
  const usersFile = path.join(dataPath, 'users.json');
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

export function saveOrders(orders: Order[]): void {
  const ordersFile = path.join(dataPath, 'orders.json');
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
}

export function authenticateUser(username: string, password: string): User | null {
  const users = getUsers();
  return users.find(user => user.username === username && user.password === password) || null;
}

export function createUser(username: string, password: string, apartment: number, room: number): User {
  const users = getUsers();
  const newUser: User = {
    id: `${apartment}_${room}`,
    username,
    password,
    role: 'user',
    apartment,
    room
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export function createOrder(userId: string, orderType: Order['order_type'], description: string): Order {
  const orders = getOrders();
  const newOrder: Order = {
    id: Date.now().toString(),
    user_id: userId,
    order_type: orderType,
    description,
    order_date: new Date().toISOString(),
    status: 'open'
  };
  orders.push(newOrder);
  saveOrders(orders);
  return newOrder;
}

export function updateOrderStatus(orderId: string, status: Order['status']): boolean {
  const orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex === -1) return false;
  
  orders[orderIndex].status = status;
  saveOrders(orders);
  return true;
}