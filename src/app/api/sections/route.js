import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const sections = await prisma.section.findMany();
    return new Response(JSON.stringify({ success: true, sections }), { status: 200 });
  } catch (error) {
    console.error("GET /api/sections error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}