import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const subtopics = await prisma.sub_Topic.findMany();
    return NextResponse.json(subtopics);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: `An error occurred while trying to fetch the topics, error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { topicId, title, description, finished } = await request.json();
  const session = await getServerSession(authOptions);

  try {
    if (session) {
      const subtopic = await prisma.sub_Topic.create({
        data: {
          title,
          description,
          finished,
          topicId,
        },
      });
      return NextResponse.json({
        message: `new sub-topic added succesfully! - ${subtopic}`,
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
