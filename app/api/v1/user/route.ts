import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth.config";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      notes: {
        select: {
          id: true,
          title: true,
          content: true,
        },
      },
    },
  });
  return NextResponse.json({ auth: true, data: user });


}
