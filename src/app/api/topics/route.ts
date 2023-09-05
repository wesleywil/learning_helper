import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
  try {
    const topics = await prisma.topic.findMany({
      include: {
        sub_topics: true,
      },
    });
    return NextResponse.json(topics);
  } catch (error) {
    return NextResponse.json(
      {
        error: `An error occurred while trying to retrieve the topics, error: ${error}`,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { status, title, description, finished } = await request.json();

  try {
    const topic = await prisma.topic.create({
      data: {
        status,
        title,
        description,
        finished,
      },
    });
    return NextResponse.json({
      message: `new topic added successfully! - ${topic}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: `An error occurred while trying to create a new topic, error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
