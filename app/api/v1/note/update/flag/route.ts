import { ApiResponse, getParamValue } from "@/actions/note";
import { db } from "@/lib/db";
import { updateFlag } from "@/types";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const id = await getParamValue("id", req);
  const flag = await getParamValue("flag-type", req);
  try {
    if (id) {
      if (flag) {
        const input2 = updateFlag.safeParse(body);
        if (input2.success) {
          const flag = await db.notes.update({
            where: {
              id,
            },
            data: { flag: input2.data.flag },
          });
          if (flag) {
            return ApiResponse({
              type: "api",
              data: flag.id,
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
      }
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
