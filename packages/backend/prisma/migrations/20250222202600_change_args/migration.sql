/*
  Warnings:

  - You are about to drop the column `acceptArgs` on the `Command` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Command" DROP COLUMN "acceptArgs",
ADD COLUMN     "isInputAllowed" BOOLEAN NOT NULL DEFAULT false;
