-- AlterTable
ALTER TABLE "CommandOutput" ADD COLUMN     "publicOutputId" TEXT;

-- CreateTable
CREATE TABLE "PublicOutput" (
    "id" TEXT NOT NULL,
    "commandOutputIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicOutput_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommandOutput" ADD CONSTRAINT "CommandOutput_scriptId_fkey" FOREIGN KEY ("scriptId") REFERENCES "Script"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandOutput" ADD CONSTRAINT "CommandOutput_publicOutputId_fkey" FOREIGN KEY ("publicOutputId") REFERENCES "PublicOutput"("id") ON DELETE SET NULL ON UPDATE CASCADE;
