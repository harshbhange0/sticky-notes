import { ApiResponse, getParamValue, isUser } from "@/actions/note";
import { db } from "@/lib/db";
import { NotesInputPropsSchema, updateFlag } from "@/types";
import { NextRequest } from "next/server";
export async function PUT(req: NextRequest) {
  const id = await getParamValue("id", req);
  const body = await req.json();
  try {
    if (id) {
      const input = NotesInputPropsSchema.safeParse(body);
      if (!input.success) {
        return ApiResponse({
          type: "api",
          data: null,
          message: input.error,
          code: 400,
        });
      }
      const res = await db.notes.update({
        where: { id },
        data: {
          title: input.data.title,
          content: input.data.content,
        },
      });
      if (res) {
        return ApiResponse({
          type: "api",
          data: res.id,
          message: "note updated",
          code: 200,
        });
      }
    }
  } catch (error: any) {
    console.log({ error: "api/update/route.ts:32:1" });
    console.log(error);

    return ApiResponse({
      type: "api",
      message: "error",
      data: error,
      code: 404,
    });
  }
}
