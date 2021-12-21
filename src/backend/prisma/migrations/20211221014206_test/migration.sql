/*
  Warnings:

  - The `projectLeadId` column on the `WBS_Element` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "WBS_Element" DROP COLUMN "projectLeadId",
ADD COLUMN     "projectLeadId" INTEGER[];

-- CreateTable
CREATE TABLE "_projectLead" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_projectLead_AB_unique" ON "_projectLead"("A", "B");

-- CreateIndex
CREATE INDEX "_projectLead_B_index" ON "_projectLead"("B");

-- AddForeignKey
ALTER TABLE "_projectLead" ADD FOREIGN KEY ("A") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_projectLead" ADD FOREIGN KEY ("B") REFERENCES "WBS_Element"("wbsElementId") ON DELETE CASCADE ON UPDATE CASCADE;
