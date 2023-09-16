import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      const topic = await prisma.topic.findFirst({
        where: {
          id: parseInt(params.id),
          userId: session.user.id,
        },
        include: {
          sub_topics: true,
        },
      });
      if (topic) {
        return NextResponse.json(topic);
      } else {
        return NextResponse.json(
          { error: "Topic Not Found!" },
          { status: 404 }
        );
      }
    }
    return NextResponse.json(
      { message: "You are not authorized to do that, try to login first!" },
      { status: 401 }
    );
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
  const { status, title, description } = await request.json();
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      const topic = await prisma.topic.update({
        where: {
          id: parseInt(params.id),
          userId: session.user.id,
        },
        data: {
          status,
          title,
          description,
        },
        include: {
          sub_topics: true,
        },
      });
      return NextResponse.json({
        message: `Topic updated Successfully! ${topic}`,
      });
    }
    return NextResponse.json(
      { message: "You are not authorized to do that, try to login first!" },
      { status: 401 }
    );
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
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      const topic = await prisma.topic.delete({
        where: {
          id: parseInt(params.id),
        },
      });
      return NextResponse.json({
        message: `Topic deleted Successfully! ${topic}`,
      });
    }
    return NextResponse.json(
      { message: "You are not authorized to do that, try to login first!" },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: `An error occurred while trying to delete the topic, error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
