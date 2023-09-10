import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";

export async function GET(request:Request, {params}:{params:{id:string}}){
    try{
      const subtopics = await prisma.sub_Topic.findMany({
        where:{
          topicId:parseInt(params.id)
        }
      });
      if(subtopics){
        return NextResponse.json(subtopics)
      }
        return NextResponse.json({error:"No Sub-Topics with this TopicID"})
      
    }catch (error: any) {
      return NextResponse.json(
        {
          error: `An error occurred while trying to retrieve the sub-topics, error: ${error.message}`,
        },
        { status: 500 }
      );
    }
  }
  