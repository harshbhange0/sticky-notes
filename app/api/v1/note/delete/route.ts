import { ApiResponse, getParamValue } from "@/actions/note";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  const id = await getParamValue("id",req);
  if (id) {
    try {
      const deleteNots = await db.notes.delete({ where: { id } });
      if (deleteNots.id) {
        return ApiResponse({
          type: "api",
          message: "unable to delete Note With Id:" + id,
        });
      }
    } catch (error) {
      console.log({ error: "api/delete/route.ts:17:1" });
      return ApiResponse({
        type: "api",
        message: "something went wrong",
        data: "check directory => /api/delete/route.ts:17:1",
      });
    }
  }
}
