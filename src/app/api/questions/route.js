import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      questionText,
      optionType,
      sectionId,
      subSectionId,
      options, // array of { text, marks, imageUrl }
    } = body;

    const question = await prisma.question.create({
      data: {
        questionText,
        optionType,
        sectionId,
        subSectionId,
        options: {
          create: options.map((opt) => ({
            text: opt.text,
            marks: Number(opt.marks),
            imageUrl: opt.imageUrl || null,
          })),
        },
      },
      include: {
        options: true,
      },
    });

    return new Response(JSON.stringify({ success: true, question }), {
      status: 201,
    });
  } catch (error) {
    console.error("POST /api/questions error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sectionId = searchParams.get("sectionId");
  const subSectionId = searchParams.get("subSectionId");

  if (!sectionId || !subSectionId) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing parameters" }),
      { status: 400 }
    );
  }

  try {
    const questions = await prisma.question.findMany({
      where: {
        sectionId: parseInt(sectionId),
        subSectionId: parseInt(subSectionId),
      },
      include: {
        options: true,
      },
    });

    return new Response(JSON.stringify({ success: true, questions }), {
      status: 200,
    });
  } catch (error) {
    console.error("GET /api/questions error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}