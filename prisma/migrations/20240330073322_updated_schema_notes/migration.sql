/*
  Warnings:

  - You are about to drop the column `isArcived` on the `Notes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notes" DROP COLUMN "isArcived",
ADD COLUMN     "isArchived" BOOLEAN DEFAULT false;
