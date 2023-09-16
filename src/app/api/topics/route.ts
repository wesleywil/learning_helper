import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      const topics = await prisma.topic.findMany({
        where: {
          userId: session.user.id,
        },
        include: {
          sub_topics: true,
        },
      });
      return NextResponse.json(topics);
    }
    return NextResponse.json(
      { message: "You are not authorized to do that, try to login first!" },
      { status: 401 }
    );
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
  const { status, title, description } = await request.json();
  const session = await getServerSession(authOptions);

  try {
    if (session) {
      const topic = await prisma.topic.create({
        data: {
          status,
          title,
          description,
          userId: session.user.id,
        },
      });
      return NextResponse.json({
        message: `new topic added successfully! - ${topic}`,
      });
    }
    return NextResponse.json(
      { message: "You are not authorized to do that, try to login first!" },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: `An error occurred while trying to create a new topic, error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
