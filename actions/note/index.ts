import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import {
  ApiResponseType,
  GetNotesByStatusType,
  GetNotesType,
  NoteStatusType,
  NoteType,
  NotesInputProps,
  NotesType,
} from "@/types";

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
  data,
  message,
  code,
  type = "api",
}: ApiResponseType): ErrorConstructor | NextResponse => {
  if (type == "api") {
    return NextResponse.json({ data, message }, { status: code });
  }
  throw new Error(message && message.toString());
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
        ...data, // Set flag to null if it is not provided
      },
    });

    if (!note?.id) {
      return ApiResponse({ type: "Error", message: "Failed to create note" });
    }
    return note;
  } catch (error: any) {
    return ApiResponse({
      message: error.message ? error.message : error,
      type: "Error",
    });
  }
};

/**
 * Retrieves notes based on the provided ID and type.
 * @param {string} [id] - The ID of the user or note to retrieve.
 * @param {GetNotesType} [type] - The type of retrieval, either 'user' or 'note'.
 * @returns  A promise that resolves to an ApiResponse object containing the notes data or an error message.
 */
export const getNotes = async (id: string, type: GetNotesType) => {
  try {
    if (!type || (type !== "userId" && type !== "id")) {
      ApiResponse({
        type: "Error",
        message: 'Invalid type provided. Must be either "userId" or "id".',
      });
    }

    const notes = await db.notes.findMany({
      where: {
        [type]: id,
      },
    });
    if (notes.length > 0) {
      return notes;
    }
    return ApiResponse({
      type: "Error",
      message: `unable to find  any notes with id: ${id} and type ${type}.`,
    });
  } catch (error: any) {
    return ApiResponse({
      type: "Error",
      message: error.message ? error.message : error,
    });
  }
};

/**
 * Retrieves notes based on the provided status.
 * @param {GetNotesByStatusType} status - The status to filter notes by.
 * @returns  A promise that resolves to an API response object containing the notes or an error message.
 */

export const getNotesByStatus = async (status: GetNotesByStatusType) => {
  try {
    const notes = await db.notes.findMany({
      where: {
        [status]: true,
      },
    });
    if (notes.length === 0) {
      return ApiResponse({
        type: "Error",
        message: `Unable to find Notes for ${status} `,
      });
    }

    return notes;
  } catch (error: any) {
    return ApiResponse({
      type: "Error",
      message: error.message ? error.message : error,
    });
  }
};
/**
 * Updates a note by its ID with a new title and optional content.
 * @param {string} id - The unique identifier of the note.
 * @param {string} title - The new title for the note.
 * @param {string} [content] - The new content for the note.
 * @returns {Promise<NextResponse>} A promise that resolves to an ApiResponse object containing the updated note or an error response.
 */
export const updateNoteByNoteId = async (
  id: string,
  title: string,
  content?: string
) => {
  try {
    const updateNote = await db.notes.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
    if (!updateNote) {
      return ApiResponse({
        type: "Error",
        message: `unable to find Notes with this id ${id}`,
      });
    }
    return updateNote;
  } catch (error: any) {
    return ApiResponse({
      type: "Error",
      message: error.message ? error.message : error,
    });
  }
};
/**
 * Updates a note's status by its ID.
 * @param {string} id - The unique identifier of the note.
 * @param {NoteStatusType} statusType - The type of status to update.
 * @param {boolean} status - The new status value.
 * @returns  A promise that resolves to an ApiResponse object containing the updated note or an error response.
 */
export const updateNoteBySautes = async (
  id: string,
  statusType: NoteStatusType,
  status: boolean
) => {
  try {
    const updatedNoteStatus = await db.notes.update({
      where: { id },
      data: {
        [statusType]: status,
      },
    });
    if (!updatedNoteStatus) {
      return ApiResponse({
        type: "Error",
        message: `unable to find Notes with this id ${id}`,
      });
    }
    return updatedNoteStatus;
  } catch (error: any) {
    return ApiResponse({
      type: "Error",
      message: error.message ? error.message : error,
    });
  }
};
/**
 * Deletes a note by its ID.
 * @param {string} id - The unique identifier of the note.
 * @returns  A promise that resolves to a NextResponse object containing the deleted note or an error response.
 */
export const deleteNoteByNoteId = async (id: string) => {
  try {
    const deletedNote = await db.notes.delete({ where: { id } });
    if (!deletedNote) {
      return ApiResponse({
        type: "Error",
        message: `unable to find Notes with this id ${id}`,
      });
    }
    return deletedNote;
  } catch (error: any) {
    return ApiResponse({
      type: "Error",
      message: error.message ? error.message : error,
    });
  }
};
