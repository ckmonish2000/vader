-- AlterTable
ALTER TABLE "Command" ADD COLUMN     "acceptArgs" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ScriptCommand" ADD COLUMN     "args" TEXT;

-- CreateTable
CREATE TABLE "CliToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CliToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CliToken_token_key" ON "CliToken"("token");

-- AddForeignKey
ALTER TABLE "CliToken" ADD CONSTRAINT "CliToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
