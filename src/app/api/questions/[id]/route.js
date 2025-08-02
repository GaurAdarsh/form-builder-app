import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request) {
  const id = request.nextUrl.pathname.split('/').pop();

  try {
    // First delete all related options
    await prisma.option.deleteMany({
      where: { questionId: id },
    });

    // Now delete the question
    const deletedQuestion = await prisma.question.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, deletedQuestion });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const id = request.nextUrl.pathname.split('/').pop();
  const body = await request.json();

  const { text, type, marks, options } = body;

  try {
    // Update the question
    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: {
        text,
        type,
        marks,
      },
    });

    // Delete existing options
    await prisma.option.deleteMany({ where: { questionId: id } });

    // Re-create updated options
    await Promise.all(
      options.map((option) =>
        prisma.option.create({
          data: {
            text: option.text,
            imageUrl: option.imageUrl || '',
            isCorrect: option.isCorrect || false,
            questionId: id,
          },
        })
      )
    );

    return NextResponse.json({ success: true, updatedQuestion });
  } catch (error) {
    console.error('Edit error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
