/*
  Warnings:

  - The primary key for the `rol` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_rol` on the `rol` table. All the data in the column will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id` to the `Rol` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_rolId_fkey`;

-- AlterTable
ALTER TABLE `rol` DROP PRIMARY KEY,
    DROP COLUMN `id_rol`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `usuario`;

-- CreateTable
CREATE TABLE `Administradores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rol` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `contrasena` VARCHAR(191) NOT NULL,
    `vendedoresSupervisados` INTEGER NOT NULL,

    UNIQUE INDEX `Administradores_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vendedores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rol` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `contrasena` VARCHAR(191) NOT NULL,
    `administradorAsociado` INTEGER NOT NULL,

    UNIQUE INDEX `Vendedores_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Administradores` ADD CONSTRAINT `Administradores_rol_fkey` FOREIGN KEY (`rol`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendedores` ADD CONSTRAINT `Vendedores_rol_fkey` FOREIGN KEY (`rol`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendedores` ADD CONSTRAINT `Vendedores_administradorAsociado_fkey` FOREIGN KEY (`administradorAsociado`) REFERENCES `Administradores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
