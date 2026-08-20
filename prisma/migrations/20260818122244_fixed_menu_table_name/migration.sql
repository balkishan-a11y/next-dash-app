/*
  Warnings:

  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Menu";

-- CreateTable
CREATE TABLE "menus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "parent_menu" TEXT NOT NULL,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);
