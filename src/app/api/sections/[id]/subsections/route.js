import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req, { params }) {
  try {
    const sectionId = parseInt(params.id, 10);

    const subsections = await prisma.subSection.findMany({
      where: { sectionId },
    });

    return NextResponse.json(subsections);
  } catch (error) {
    console.error('Error fetching subsections:', error);
    return new NextResponse(JSON.stringify({ message: 'Error fetching subsections' }), {
      status: 500,
    });
  }
}
