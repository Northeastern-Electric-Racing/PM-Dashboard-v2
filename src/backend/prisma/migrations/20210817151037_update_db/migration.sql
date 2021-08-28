/*
  Warnings:

  - You are about to drop the column `budget` on the `Work_Package` table. All the data in the column will be lost.
  - Added the required column `budget` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "budget" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Work_Package" DROP COLUMN "budget";
