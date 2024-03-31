/*
  Warnings:

  - You are about to drop the column `isPublice` on the `Notes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notes" DROP COLUMN "isPublice",
ADD COLUMN     "isPublic" BOOLEAN DEFAULT true;
