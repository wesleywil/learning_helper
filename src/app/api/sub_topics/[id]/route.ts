import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const subtopic = await prisma.sub_Topic.findFirst({
      where: {
        id: parseInt(params.id),
      },
    });
    if (subtopic) {
      return NextResponse.json(subtopic);
    }
    return NextResponse.json(
      { error: "Sub-Topic Not Found!" },
      { status: 404 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: `An error occurred while trying to retrieve the sub-topic, error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { description, finished } = await request.json();
  const session = await getServerSession(authOptions);

  try {
    if (session) {
      const subtopic = await prisma.sub_Topic.update({
        where: {
          id: parseInt(params.id),
        },
        data: {
          description,
          finished,
        },
      });
      return NextResponse.json({
        message: `Sub-Topic updated successfully! ${subtopic}`,
      });
    }
    return NextResponse.json(
      { message: "You are not authorized to do that, try to login first!" },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: `An error occurred while trying to update the sub-topic, error: ${error.message}`,
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
      const subtopic = await prisma.sub_Topic.delete({
        where: {
          id: parseInt(params.id),
        },
      });
      return NextResponse.json({
        message: `Sub-Topic deleted Successfully! ${subtopic}`,
      });
    }
    return NextResponse.json(
      { message: "You are not authorized to do that, try to login first!" },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: `An error occurred while trying to delete the sub-topic, error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
