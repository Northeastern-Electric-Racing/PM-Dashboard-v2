/*
  Warnings:

  - A unique constraint covering the columns `[userSettingsId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('LIGHT', 'DARK');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userSettingsId" TEXT;

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL,
    "defaultTheme" "Theme" NOT NULL DEFAULT E'DARK',

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.userSettingsId_unique" ON "User"("userSettingsId");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("userSettingsId") REFERENCES "UserSettings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
