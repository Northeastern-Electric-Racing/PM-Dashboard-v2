/*
  Warnings:

  - You are about to drop the column `requestorId` on the `Change_Request` table. All the data in the column will be lost.
  - You are about to drop the column `implemented` on the `Change_Request` table. All the data in the column will be lost.
  - You are about to drop the column `dependencies` on the `Work_Package` table. All the data in the column will be lost.
  - The `rules` column on the `Work_Package` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `submitterId` to the `Change_Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'APP_ADMIN';

-- DropForeignKey
ALTER TABLE "Change_Request" DROP CONSTRAINT "Change_Request_requestorId_fkey";

-- AlterTable
ALTER TABLE "Change_Request" DROP COLUMN "requestorId",
DROP COLUMN "implemented",
ADD COLUMN     "submitterId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstLogin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Work_Package" DROP COLUMN "dependencies",
DROP COLUMN "rules",
ADD COLUMN     "rules" TEXT[];

-- CreateTable
CREATE TABLE "_dependencies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_dependencies_AB_unique" ON "_dependencies"("A", "B");

-- CreateIndex
CREATE INDEX "_dependencies_B_index" ON "_dependencies"("B");

-- AddForeignKey
ALTER TABLE "_dependencies" ADD FOREIGN KEY ("A") REFERENCES "WBS_Element"("wbsElementId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dependencies" ADD FOREIGN KEY ("B") REFERENCES "Work_Package"("workPackageId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Change_Request" ADD FOREIGN KEY ("submitterId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
