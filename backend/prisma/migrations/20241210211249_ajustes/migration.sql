/*
  Warnings:

  - A unique constraint covering the columns `[nome,usuarioId]` on the table `Favoritos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numero]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoria` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Usuario` DROP FOREIGN KEY `Usuario_perfilId_fkey`;

-- AlterTable
ALTER TABLE `Favoritos` MODIFY `nome` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Pokemon` ADD COLUMN `categoria` VARCHAR(255) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `descricao` VARCHAR(255) NOT NULL,
    MODIFY `foto` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Favoritos_nome_usuarioId_key` ON `Favoritos`(`nome`, `usuarioId`);

-- CreateIndex
CREATE UNIQUE INDEX `Pokemon_numero_key` ON `Pokemon`(`numero`);

-- CreateIndex
CREATE UNIQUE INDEX `Pokemon_nome_key` ON `Pokemon`(`nome`);

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_perfilId_fkey` FOREIGN KEY (`perfilId`) REFERENCES `Perfil`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
