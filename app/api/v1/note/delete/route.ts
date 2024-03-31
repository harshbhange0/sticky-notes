import { ApiResponse, deleteNoteByNoteId } from "@/actions/note";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const id = await req.nextUrl.searchParams.get("id");
    if (id) {
      const deletedNote = await deleteNoteByNoteId(id);
      if (!deletedNote) {
        return ApiResponse({
          type: "api",
          data: null,
          message: `unable to delete Note with id: ${id}`,
          code: 404,
        });
      }
      return ApiResponse({
        type: "api",
        data: deletedNote,
        code: 201,
      });
    }
  } catch (error: any) {
    return ApiResponse({
      type: "api",
      message: error.message ? error.message : error,
      code: 500,
    });
  }
}
