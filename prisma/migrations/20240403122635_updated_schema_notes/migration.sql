/*
  Warnings:

  - The values [Null] on the enum `flag` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "flag_new" AS ENUM ('Archived', 'Public', 'Trashed');
ALTER TABLE "Notes" ALTER COLUMN "flag" TYPE "flag_new" USING ("flag"::text::"flag_new");
ALTER TYPE "flag" RENAME TO "flag_old";
ALTER TYPE "flag_new" RENAME TO "flag";
DROP TYPE "flag_old";
COMMIT;
