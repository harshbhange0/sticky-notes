import { ApiResponse, getParamValue, isUser } from "@/actions/note";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const flag = await getParamValue("flag", req);
  const userId = await getParamValue("userId", req);
  try {
    if ((userId && flag == "Archived") || flag == "Trashed") {
      const notesByFlag = await db.notes.findMany({
        where: {
          userId,
          flag,
        },
      });
      return ApiResponse({
        type: "api",
        message: "note Found ",
        data: notesByFlag,
        code: 200,
      });
    }
    return ApiResponse({
      type: "api",
      message: "error in query" + flag,
      data: [],
      code: 404,
    });
  } catch (error) {
    console.log({ errorLine: "get/flag/route.ts:32:15", error });
    return ApiResponse({
      type: "api",
      message: "server error " + flag,
      data: error,
      code: 404,
    });
  }
}
