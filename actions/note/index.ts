import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponseType, NotesInputProps } from "@/types";

/**
 * Creates an API response object for the client.
 *
 * This function takes in data, a message, and a status code and returns a response object
 * with the specified data, message, and status code.
 *
 * @param {any} data - The data to send to the client side.
 * @param {string} message - The message to send to the client side.
 * @param {number} code - The status code.
 * @returns {NextResponse|ErrorConstructor} The response object with the specified data, message, and status code.
 */
export const ApiResponse = ({
  data = null,
  message,
  code,
  type = "api",
}: ApiResponseType): NextResponse => {
  if (type == "api") {
    return NextResponse.json({ data, message }, { status: code });
  }
};

/**
 * Creates a new note with the provided data.
 *
 * @param {NotesInputProps} data - An object containing the note's title, content, userId, and an optional flag.
 * @returns  A promise that resolves to a response object containing the created note or
 * an error message.
 */
export const createNotes = async (data: NotesInputProps) => {
  try {
    const note = await db.notes.create({
      data: {
        title: data.title!,
        content: data.content!,
        userId: data.userId!,
        flag: "Public",
      },
    });

    if (note?.id) {
      return note;
    }
  } catch (error: any) {
    return console.log({
      errorLine: "Failed to create note action/note./index.ts:58:1",
      error,
    });
  }
};

export const isUser = async (id: string) => {
  if (id) {
    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      return false;
    }
  }
  return true;
};

export const getParamValue = async (key: string, req: NextRequest) => {
  const value = await req.nextUrl.searchParams.get(key);
  return value;
};
