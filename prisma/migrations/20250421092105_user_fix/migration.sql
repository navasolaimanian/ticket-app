/*
  Warnings:

  - A unique constraint covering the columns `[usename]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_usename_key` ON `User`(`usename`);
