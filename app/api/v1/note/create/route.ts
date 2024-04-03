import { ApiResponse, createNotes } from "@/actions/note";
import { NotesInputPropsSchema } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const input = NotesInputPropsSchema.safeParse(await req.json());
  if (!input.success) {
    return ApiResponse({
      type: "api",
      data: null,
      message: input,
      code: 400,
    });
  }
  try {
    const note = await createNotes(input.data);
    return NextResponse.json({
      data: note,
      message: "Note created",
    },{status:200});
  } catch (error: any) {
    console.log(error);
    return ApiResponse({
      type: "api",
      message: error.message ? error.message : error,
      code: 500,
    });
  }
}
