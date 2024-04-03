import { ApiResponse, getParamValue } from "@/actions/note";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  const id = await getParamValue("id", req);
  const flag = await getParamValue("flag-type", req);
  try {
    if (id) {
      if (flag == "Trashed" || flag == "Archived" || flag == "Public") {
        const updateFlag = await db.notes.update({
          where: {
            id,
          },
          data: { flag },
        });
        if (flag) {
          return ApiResponse({
            type: "api",
            data: updateFlag.flag,
            message: "note updated",
            code: 200,
          });
        }
        return ApiResponse({
          type: "api",
          data: "error",
          message: "note updated",
          code: 200,
        });
      }
      return ApiResponse({
        type: "api",
        message: "unValid  request",
        data: flag,
        code: 400,
      });
    }
  } catch (error: any) {
    console.log({ error: "api/update/flag/route.ts:32:1" });
    console.log(error);
    return ApiResponse({
      type: "api",
      message: "error",
      data: req.nextUrl.href,
      code: 404,
    });
  }
}
