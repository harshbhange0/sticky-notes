import { ApiResponse, getNotes } from "@/actions/note";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const getBy = await req.nextUrl.searchParams.get("by");
    if (getBy == "userId" || getBy == "id") {
      const id = await req.nextUrl.searchParams.get(getBy);
      if (id) {
        const res = await getNotes(id, getBy);
        return ApiResponse({ type: "api", data: res, code: 200 });
      }
      return ApiResponse({
        type: "api",
        message: {
          errorIn: `unvalued request: /${await req.nextUrl.searchParams.toString().split("&")[1]} `,
          expected: " id|userId",
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
