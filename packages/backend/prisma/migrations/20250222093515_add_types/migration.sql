/*
  Warnings:

  - You are about to drop the column `commandId` on the `CommandOutput` table. All the data in the column will be lost.
  - Added the required column `type` to the `Command` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scriptCommandId` to the `CommandOutput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scriptId` to the `CommandOutput` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CommandType" AS ENUM ('USER_DEFINED', 'DEFAULT');

-- AlterTable
ALTER TABLE "Command" ADD COLUMN     "type" "CommandType" NOT NULL;

-- AlterTable
ALTER TABLE "CommandOutput" DROP COLUMN "commandId",
ADD COLUMN     "scriptCommandId" TEXT NOT NULL,
ADD COLUMN     "scriptId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CommandOutput" ADD CONSTRAINT "CommandOutput_scriptCommandId_fkey" FOREIGN KEY ("scriptCommandId") REFERENCES "ScriptCommand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
