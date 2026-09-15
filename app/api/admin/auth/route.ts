import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const expectedUser = process.env.ADMIN_USERNAME || 'admin';
    const expectedPass = process.env.ADMIN_PASSWORD || 'tfnkishangarh2026';

    if (username === expectedUser && password === expectedPass) {
      // Return authentication token
      const token = Buffer.from(`${username}:${Date.now()}:${process.env.ADMIN_SECRET_SESSION || 'tfn-secret'}`).toString('base64');

      const response = NextResponse.json({
        success: true,
        message: 'Admin authenticated successfully',
        token,
        admin: { username },
      });

      // Also set httpOnly cookie
      response.cookies.set('tfn_admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid admin username or password' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
