/*
  Warnings:

  - The migration will change the primary key for the `User` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - The migration will add a unique constraint covering the columns `[email_id]` on the table `User`. If there are existing duplicate values, the migration will fail.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_login` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CR_Type" AS ENUM ('DESIGN_ISSUE', 'NEW_FUNCTION', 'OTHER', 'STAGE_GATE', 'WP_ACTIVATION');

-- CreateEnum
CREATE TYPE "WBS_El_Status" AS ENUM ('INACTIVE', 'ACTIVE', 'COMPLETE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'LEADERSHIP', 'PROJECT_MANAGER', 'PROJECT_LEAD', 'MEMBER', 'GUEST');

-- CreateEnum
CREATE TYPE "Change_Type" AS ENUM ('ADD_PROJECT', 'ADD_WP', 'EDIT_PROJECT', 'EDIT_WP', 'EDIT_WP_DESC', 'DELETE_PROJECT', 'DELETE_WP');

-- CreateEnum
CREATE TYPE "Project_Area" AS ENUM ('MECHANICAL', 'ELECTRICAL', 'BUSINESS');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "User.email_unique";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "age",
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "email_id" TEXT NOT NULL,
ADD COLUMN     "last_login" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL,
ADD PRIMARY KEY ("user_id");

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Fab_Weld_Request" (
    "fw_id" SERIAL NOT NULL,
    "date_submitted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "part_name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "resources_needed" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "date_completed" TIMESTAMP(3) NOT NULL,
    "requestor_id" INTEGER NOT NULL,
    "wbs_el_id" INTEGER NOT NULL,

    PRIMARY KEY ("fw_id")
);

-- CreateTable
CREATE TABLE "Change_Request" (
    "cr_id" SERIAL NOT NULL,
    "date_submitted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "CR_Type" NOT NULL,
    "date_reviewed" TIMESTAMP(3) NOT NULL,
    "accepted" BOOLEAN,
    "review_notes" TEXT,
    "implemented" BOOLEAN,
    "requestor_id" INTEGER NOT NULL,
    "wbs_el_id" INTEGER NOT NULL,

    PRIMARY KEY ("cr_id")
);

-- CreateTable
CREATE TABLE "Scope_CR" (
    "scope_cr_id" INTEGER NOT NULL,
    "what" TEXT NOT NULL,
    "why" TEXT NOT NULL,
    "timeline_impact" INTEGER NOT NULL,
    "budget_impact" INTEGER NOT NULL,
    "scope_impact" TEXT NOT NULL,
    "doc" TEXT NOT NULL,
    "cr_id" INTEGER NOT NULL,

    PRIMARY KEY ("scope_cr_id")
);

-- CreateTable
CREATE TABLE "Stage_Gate" (
    "stage_gate_id" INTEGER NOT NULL,
    "done" BOOLEAN NOT NULL,
    "leftover_budget" INTEGER NOT NULL,
    "cr_id" INTEGER NOT NULL,

    PRIMARY KEY ("stage_gate_id")
);

-- CreateTable
CREATE TABLE "Stage_Gate_Design_Reviewer" (
    "stage_gate_id" INTEGER NOT NULL,
    "design_reviewer_id" INTEGER NOT NULL,

    PRIMARY KEY ("stage_gate_id","design_reviewer_id")
);

-- CreateTable
CREATE TABLE "WP_Activation" (
    "wp_init_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "details_good" BOOLEAN NOT NULL,
    "project_lead_id" INTEGER NOT NULL,
    "project_manager_id" INTEGER NOT NULL,
    "cr_id" INTEGER NOT NULL,

    PRIMARY KEY ("wp_init_id")
);

-- CreateTable
CREATE TABLE "Change" (
    "change_id" SERIAL NOT NULL,
    "attribute" "Change_Type" NOT NULL,
    "original" TEXT NOT NULL,
    "new" TEXT NOT NULL,
    "date_implemented" TIMESTAMP(3) NOT NULL,
    "implementor_id" INTEGER NOT NULL,
    "cr_id" INTEGER NOT NULL,

    PRIMARY KEY ("change_id")
);

-- CreateTable
CREATE TABLE "WBS_Element" (
    "wbs_el_id" SERIAL NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL,
    "wbs_num" TEXT NOT NULL,
    "wbs_el_name" TEXT NOT NULL,
    "wbs_el_status" "WBS_El_Status" NOT NULL,
    "wbs_el_lead_id" INTEGER NOT NULL,

    PRIMARY KEY ("wbs_el_id")
);

-- CreateTable
CREATE TABLE "Project" (
    "project_id" INTEGER NOT NULL,
    "area" "Project_Area" NOT NULL,
    "g_drive_folder" TEXT NOT NULL,
    "slide_deck_link" TEXT NOT NULL,
    "bom_link" TEXT NOT NULL,
    "task_list_link" TEXT NOT NULL,
    "project_manager_id" INTEGER NOT NULL,
    "wbs_el_id" INTEGER NOT NULL,

    PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "Work_Package" (
    "wp_id" INTEGER NOT NULL,
    "order_in_project" INTEGER NOT NULL,
    "wp_progress" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "budget" INTEGER NOT NULL,
    "dependencies" TEXT NOT NULL,
    "deliverables" TEXT NOT NULL,
    "rules" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,
    "wbs_el_id" INTEGER NOT NULL,

    PRIMARY KEY ("wp_id")
);

-- CreateTable
CREATE TABLE "Description_Bullet" (
    "desc_id" SERIAL NOT NULL,
    "detail" TEXT NOT NULL,
    "date_added" TIMESTAMP(3) NOT NULL,
    "date_deleted" TIMESTAMP(3),
    "date_done" TIMESTAMP(3),
    "wp_id" INTEGER NOT NULL,

    PRIMARY KEY ("desc_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_id_unique" ON "User"("email_id");

-- AddForeignKey
ALTER TABLE "Fab_Weld_Request" ADD FOREIGN KEY ("requestor_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fab_Weld_Request" ADD FOREIGN KEY ("wbs_el_id") REFERENCES "WBS_Element"("wbs_el_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Change_Request" ADD FOREIGN KEY ("requestor_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Change_Request" ADD FOREIGN KEY ("wbs_el_id") REFERENCES "WBS_Element"("wbs_el_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scope_CR" ADD FOREIGN KEY ("cr_id") REFERENCES "Change_Request"("cr_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage_Gate" ADD FOREIGN KEY ("cr_id") REFERENCES "Change_Request"("cr_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage_Gate_Design_Reviewer" ADD FOREIGN KEY ("stage_gate_id") REFERENCES "Stage_Gate"("stage_gate_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage_Gate_Design_Reviewer" ADD FOREIGN KEY ("design_reviewer_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WP_Activation" ADD FOREIGN KEY ("project_lead_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WP_Activation" ADD FOREIGN KEY ("project_manager_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WP_Activation" ADD FOREIGN KEY ("cr_id") REFERENCES "Change_Request"("cr_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Change" ADD FOREIGN KEY ("implementor_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Change" ADD FOREIGN KEY ("cr_id") REFERENCES "Change_Request"("cr_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WBS_Element" ADD FOREIGN KEY ("wbs_el_lead_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD FOREIGN KEY ("project_manager_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD FOREIGN KEY ("wbs_el_id") REFERENCES "WBS_Element"("wbs_el_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work_Package" ADD FOREIGN KEY ("project_id") REFERENCES "Project"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work_Package" ADD FOREIGN KEY ("wbs_el_id") REFERENCES "WBS_Element"("wbs_el_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Description_Bullet" ADD FOREIGN KEY ("wp_id") REFERENCES "Work_Package"("wp_id") ON DELETE CASCADE ON UPDATE CASCADE;
