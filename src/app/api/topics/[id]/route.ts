import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const topic = await prisma.topic.findFirst({
      where: {
        id: parseInt(params.id),
      },
      include: {
        sub_topics: true,
      },
    });
    if (topic) {
      return NextResponse.json(topic);
    } else {
      return NextResponse.json({ error: "Topic Not Found!" }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        error: `An error occurred while trying to retrieve the topic, error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { status, title, description, finished } = await request.json();
  try {
    const topic = await prisma.topic.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        status,
        title,
        description,
        finished,
      },
      include: {
        sub_topics: true,
      },
    });
    return NextResponse.json({
      message: `Topic updated Successfully! ${topic}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: `An error occurred while trying to update the topic, error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const topic = await prisma.topic.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json({
      message: `Topic deleted Successfully! ${topic}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: `An error occurred while trying to delete the topic, error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
