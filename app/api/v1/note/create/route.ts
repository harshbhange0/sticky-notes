import { ApiResponse, CreateNotes } from "@/actions/note";
import { NoteSchema } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const input = NoteSchema.safeParse(await req.json());
  if (!input.success) {
    return ApiResponse({
      type: "error",
      message: input.error,
      data: "null",
      code: 400,
    });
  }
  try {
    const note = await CreateNotes(input.data);
    return ApiResponse({
      type: "success",
      message: "Note Created Successfully!",
      data: note,
      code: 200,
    });
    
  } catch (error) {
        return ApiResponse({
          type: "success",
          message: "Unable Created Note ",
          data: error,
          code: 200,
        });
  }
}
