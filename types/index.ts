import { z } from "zod";
/**
 * zod validation schema for the Note
 * @typedef {Object} NotesInputPropsSchema
 * @property {string} title - The title of the note.
 * @property {string} userId - The ID of the user who created the note.
 * @property {string} content - The content of the note.
 * @property {boolean} [isPublic] - Whether the note is public or not. Defaults to false.
 * @property {boolean} [isArchived] - Whether the note is archived or not. Defaults to false.
 * @property {boolean} [isTrash] - Whether the note is in the trash or not. Defaults to false.
 * @property {string} [flag] - A flag for the note. Optional.
 */
export const NotesInputPropsSchema = z.object({
  title: z.string(),
  userId: z.string(),
  content: z.string(),
  isPublic: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  isTrash: z.boolean().optional(),
  flag: z.string().optional(),
});
export interface NoteType {
  id: string;
  title: string;
  content: string;
  isPublic: boolean | null;
  isArchived: boolean | null;
  isTrash: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  flag: string | null;
  userId: string | null;
}
export type NotesType = NoteType[]|[];

export type NotesInputProps = z.infer<typeof NotesInputPropsSchema>;
export type GetNotesType = "userId" | "id";
export type NoteStatusType = "isPublic" | "isArchived" | "isTrash";
export type GetNotesByStatusType = NoteStatusType;
export interface ApiResponseType {
  data?: any;
  message?: string | {} | [];
  code?: number;
  type: "api" | "Error";
}
