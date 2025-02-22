-- DropForeignKey
ALTER TABLE "ScriptCommand" DROP CONSTRAINT "ScriptCommand_commandId_fkey";

-- AlterTable
ALTER TABLE "Command" ADD COLUMN     "acceptArgs" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ScriptCommand" ADD COLUMN     "args" TEXT;

-- AddForeignKey
ALTER TABLE "ScriptCommand" ADD CONSTRAINT "ScriptCommand_commandId_fkey" FOREIGN KEY ("commandId") REFERENCES "Command"("id") ON DELETE CASCADE ON UPDATE CASCADE;
