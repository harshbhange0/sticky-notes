import { z } from "zod";
/**
 * zod validation schema for the Note
 * @typedef {Object} NotesInputPropsSchema
 * @property {string} title - The title of the note.
 * @property {string} userId - The ID of the user who created the note.
 * @property {string} content - The content of the note.
 * @property {string} [flag] - A flag for the note. Optional.
 */
export const NotesInputPropsSchema = z.object({
  title: z.string(),
  userId: z.string(),
  content: z.string(),
});
export interface NoteType {
  id?: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string | null;
}
export type NotesType = NoteType[] | [];

export type NotesInputProps = z.infer<typeof NotesInputPropsSchema>;
export type GetNotesType = "userId" | "id";
export type NoteStatusType = "Public" | "Archived" | "Trashed";
export type GetNotesByStatusType = NoteStatusType;
export interface ApiResponseType {
  data?: any;
  message?: string | {} | [];
  code?: number;
  type: "api" | "Error";
}
export interface UseTostProps {
  massage: string;
  type: "error" | "success";
}
