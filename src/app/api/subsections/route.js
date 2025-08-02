import { prisma } from '@/lib/prisma';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sectionId = parseInt(searchParams.get('sectionId'));

    if (!sectionId) {
      return new Response(JSON.stringify({ success: false, error: "Missing sectionId" }), {
        status: 400,
      });
    }

    const subSections = await prisma.subSection.findMany({
      where: { sectionId },
    });

    return new Response(JSON.stringify({ success: true, subSections }), { status: 200 });
  } catch (error) {
    console.error("GET /api/subsections error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}