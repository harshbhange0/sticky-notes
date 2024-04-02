/*
  Warnings:

  - You are about to drop the column `isArchived` on the `Notes` table. All the data in the column will be lost.
  - You are about to drop the column `isPublic` on the `Notes` table. All the data in the column will be lost.
  - You are about to drop the column `isTrash` on the `Notes` table. All the data in the column will be lost.
  - Added the required column `flag` to the `Notes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "flag" AS ENUM ('Null', 'Archived', 'Public', 'Trashed');

-- AlterTable
ALTER TABLE "Notes" DROP COLUMN "isArchived",
DROP COLUMN "isPublic",
DROP COLUMN "isTrash",
DROP COLUMN "flag",
ADD COLUMN     "flag" "flag" NOT NULL;
