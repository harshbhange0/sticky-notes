import { ApiResponse, getNotes, getNotesByStatus } from "@/actions/note";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const getBy = await req.nextUrl.searchParams.get("by");
    if (getBy == "status") {
      const id = await req.nextUrl.searchParams.get(getBy);
      if (id == "isPublic" || id == "isTrash" || id == "isArchived") {
        const res = await getNotesByStatus(id);
        return ApiResponse({ type: "api", data: res, code: 200 });
      }
      return ApiResponse({
        type: "api",
        message: {
          errorIn: `unvalued request: /${await req.nextUrl.searchParams.toString().split("&")[1]} `,
          expected: "&status= isPublic | isTrash | isArchived",
        },
        code: 400,
      });
    }
    return ApiResponse({
      type: "api",
      message: `unvalued request: ${getBy}`,
      code: 400,
    });
  } catch (error: any) {
    // console.log(error);
    return ApiResponse({
      type: "api",
      message: error.message ? error.message : error,
      code: 500,
    });
  }
}
