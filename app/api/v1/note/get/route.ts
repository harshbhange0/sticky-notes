import { ApiResponse, getParamValue, isUser } from "@/actions/note";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = await getParamValue("userId", req);
    if (id) {
      const user = await isUser(id);
      if (!user) {
        return ApiResponse({
          type: "api",
          message: "user not Found",
        });
      }
      const notes = await db.notes.findMany({
        where: {
          userId: id,
        },
      });
      if (notes.length < 0) {
        return ApiResponse({
          type: "api",
          message: "No Notes found for this User.",
          code: 204,
        });
      }
      return ApiResponse({
        type: "api",
        data: notes,
        code: 200,
      });
    }
  } catch (error) {
    console.log({ error: "api/get/route.ts:33:1" });
    return ApiResponse({
      type: "api",
      message: "error",
      data: error,
      code: 404,
    });
  }
}
