-- DropForeignKey
ALTER TABLE `vendedores` DROP FOREIGN KEY `Vendedores_administradorAsociado_fkey`;

-- AlterTable
ALTER TABLE `vendedores` MODIFY `administradorAsociado` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Vendedores` ADD CONSTRAINT `Vendedores_administradorAsociado_fkey` FOREIGN KEY (`administradorAsociado`) REFERENCES `Administradores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
