import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'kopi-gayo-derah-secret-2024';

export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function getAdminFromCookie(): Promise<any> {
  const cookieStore = cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function isValidAdminToken(token: string): boolean {
  const payload = verifyToken(token);
  return payload !== null && payload.role === 'admin';
}
