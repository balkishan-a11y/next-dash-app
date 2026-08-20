-- CreateTable
CREATE TABLE "AssignRights" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "menu_id" TEXT NOT NULL,

    CONSTRAINT "AssignRights_pkey" PRIMARY KEY ("id")
);
