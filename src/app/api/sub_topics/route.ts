import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(request:Request){
  try{
    const subtopics = await prisma.sub_Topic.findMany();
    return NextResponse.json(subtopics)
  }catch (error: any) {
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

  try {
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
  } catch (error: any) {
    return NextResponse.json(
      {
        error: `An error occurred while trying to create a new topic, error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
