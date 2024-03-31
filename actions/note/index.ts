import { db } from "@/lib/db";
import {
  ApiResponseProps,
  NotePropsType,
  NotesGetType,
  StatusType,
} from "@/types";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export const ApiResponse = async ({
  data,
  type,
  message,
  code,
}: ApiResponseProps) => {
  switch (type) {
    case "error":
      return NextResponse.json(
        { type, error: data, message },
        { status: code }
      );
    case "success":
      return NextResponse.json({ type, data: data, message }, { status: code });
  }
};

export const CreateNotes = async (data: NotePropsType) => {
  const { flag, title, content, userId } = data;
  const note = await db.notes.create({
    data: {
      title,
      content,
      userId,
      isPublic: true,
      flag,
    },
  });
  if (!note) {
    throw new Error("unable to create Notes");
  }
  return note;
};

export const GetNotesById = async (type: NotesGetType, id: string) => {
  if ((type = "userId")) {
    const notes = await db.notes.findMany({ where: { userId: id } });
    console.log(notes);

    if (notes.length < 0) {
      const error = { error: "unable to find Notes with  this User Id" + id };
      return error;
    } else {
      return notes;
    }
  }
  if ((type = "userId")) {
    const notes = await db.notes.findMany({ where: { id } });
    if (notes.length < 0) {
      throw new Error("unable to find Notes with  this Id" + id);
    }
    return notes;
  }
};

export const GetNotesByStatus = async (status: StatusType) => {
  let notes;
  if ((status = "isPublic")) {
    notes = await db.notes.findMany({ where: { isPublic: true } });
    if (notes.length < 0) {
      throw new Error("unable to find Notes that are Public");
    }
    return notes;
  }
  if ((status = "isArchived")) {
    notes = await db.notes.findMany({ where: { isArchived: true } });
    if (notes.length < 0) {
      throw new Error("unable to find Notes that are Archived");
    }
    return notes;
  }
  if ((status = "isTrash")) {
    notes = await db.notes.findMany({ where: { isTrash: true } });
    if (notes.length < 0) {
      throw new Error("unable to find Notes that are Archived");
    }
    return notes;
  }
  return (notes = []);
};
