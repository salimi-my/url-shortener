import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { linkId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { title, keyword, url } = body;

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

    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Title is required.' },
        { status: 400 }
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

    const currentLink = await prismadb.link.findUnique({
      where: {
        keyword,
        NOT: {
          id: linkFound.id
        }
      }
    });

    if (currentLink) {
      return NextResponse.json(
        { success: false, error: 'Please enter different keyword.' },
        { status: 400 }
      );
    }

    const link = await prismadb.link.update({
      where: {
        id: params.linkId
      },
      data: {
        title,
        keyword,
        url
      }
    });

    return NextResponse.json({ success: true, link });
  } catch (error: any) {
    console.log('[LINK_PATCH]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

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
