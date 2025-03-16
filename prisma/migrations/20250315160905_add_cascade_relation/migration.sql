/*
  Warnings:

  - A unique constraint covering the columns `[userEmail]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `problems` ADD COLUMN `Status` VARCHAR(191) NOT NULL DEFAULT 'Pending';

-- CreateIndex
CREATE UNIQUE INDEX `Section_userEmail_key` ON `Section`(`userEmail`);
