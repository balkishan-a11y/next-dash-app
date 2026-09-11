/*
  Warnings:

  - You are about to drop the `AssignRights` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AssignRights";

-- CreateTable
CREATE TABLE "user_assign_rights" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "menu_id" TEXT NOT NULL,

    CONSTRAINT "user_assign_rights_pkey" PRIMARY KEY ("id")
);
