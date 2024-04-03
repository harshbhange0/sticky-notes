import { ApiResponse, getParamValue } from "@/actions/note";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const id = await getParamValue("id", req);
  if (id) {
    try {
      const deleteNots = await db.notes.delete({ where: { id } });
      if (!deleteNots.id) {
        return ApiResponse({
          type: "api",
          message: "unable to delete Note With Id:" + id,
          code: 404,
        });
      }
      return NextResponse.json(
        {
          message: "note Deleted ",
          data: deleteNots.id,
        },
        { status: 201 }
      );
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
