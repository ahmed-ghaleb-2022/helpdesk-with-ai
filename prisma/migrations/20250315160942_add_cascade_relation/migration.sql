-- DropForeignKey
ALTER TABLE `section` DROP FOREIGN KEY `Section_userEmail_fkey`;

-- DropIndex
DROP INDEX `Section_userEmail_key` ON `section`;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
