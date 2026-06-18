import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export async function getUserIdFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  console.log('Token found:', !!token);

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    console.log('Decoded userId:', decoded.userId);
    return decoded.userId;
  } catch (err) {
    console.error('JWT verification error:', err);
    return null;
  }
}
