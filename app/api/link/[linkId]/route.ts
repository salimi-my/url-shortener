import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function DELETE(
  _req: Request,
  { params }: { params: { linkId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    if (!params.linkId) {
      return NextResponse.json(
        { success: false, error: 'Link ID is required.' },
        { status: 400 }
      );
    }

    const linkFound = await prismadb.link.findUnique({
      where: {
        id: params.linkId
      }
    });

    if (!linkFound) {
      return NextResponse.json(
        { success: false, error: 'Link not found.' },
        { status: 400 }
      );
    }

    const link = await prismadb.link.delete({
      where: {
        id: params.linkId
      }
    });

    return NextResponse.json({ success: true, link });
  } catch (error: any) {
    console.log('[LINK_DELETE]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
