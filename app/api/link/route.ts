import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const ip = req.headers.get('client-ip-address') ?? 'Unknown';

    const { url, keyword } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required.' },
        { status: 400 }
      );
    }

    if (!keyword) {
      return NextResponse.json(
        { success: false, error: 'Keyword is required.' },
        { status: 400 }
      );
    }

    const currentLink = await prismadb.link.findUnique({
      where: {
        keyword
      }
    });

    if (currentLink) {
      return NextResponse.json(
        { success: false, error: 'Please choose different keyword.' },
        { status: 400 }
      );
    }

    const link = await prismadb.link.create({
      data: {
        userId,
        url,
        keyword,
        ip
      }
    });

    return NextResponse.json({ success: true, link });
  } catch (error: any) {
    console.log('[LINK_POST]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
