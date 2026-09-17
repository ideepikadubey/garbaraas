import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const cleanUser = (username || '').toString().trim();
    const cleanPass = (password || '').toString().trim();

    const expectedUser = (process.env.ADMIN_USERNAME || process.env.ADMIN_USER || 'admin').trim();
    const expectedPass = (process.env.ADMIN_PASSWORD || 'tfnkishangarh2026').trim();

    // Check if matching configured credentials, custom organizer credentials, or fallback default
    const isUserMatch =
      cleanUser.toLowerCase() === expectedUser.toLowerCase() ||
      cleanUser.toLowerCase() === 'admin' ||
      cleanUser.toLowerCase() === 'admin@5111';

    const isPassMatch =
      cleanPass === expectedPass ||
      cleanPass === '7002kishangarh2026' ||
      cleanPass === 'tfnkishangarh2026';

    if (isUserMatch && isPassMatch) {
      // Return authentication token
      const token = Buffer.from(`${cleanUser}:${Date.now()}:${process.env.ADMIN_SECRET_SESSION || 'tfn-secret'}`).toString('base64');

      const response = NextResponse.json({
        success: true,
        message: 'Admin authenticated successfully',
        token,
        admin: { username: cleanUser },
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

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid admin username or password. Default username is "admin".',
      },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
