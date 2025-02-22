-- DropForeignKey
ALTER TABLE "ScriptCommand" DROP CONSTRAINT "ScriptCommand_scriptId_fkey";

-- AddForeignKey
ALTER TABLE "ScriptCommand" ADD CONSTRAINT "ScriptCommand_scriptId_fkey" FOREIGN KEY ("scriptId") REFERENCES "Script"("id") ON DELETE CASCADE ON UPDATE CASCADE;
