-- CreateTable
CREATE TABLE `Role` (
    `id_rol` INTEGER NOT NULL,
    `rol` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_rol_key`(`rol`),
    PRIMARY KEY (`id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuarios` INTEGER NOT NULL,
    `rolId` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `contrasena` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`id_usuarios`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Role`(`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;
