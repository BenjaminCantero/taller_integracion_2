-- CreateTable
CREATE TABLE `Categoria` (
    `id_categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_categoria` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleVenta` (
    `id_detalle_venta` INTEGER NOT NULL AUTO_INCREMENT,
    `id_venta` INTEGER NOT NULL,
    `id_producto` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio_unitario` DECIMAL(10, 2) NOT NULL,
    `precio_total` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id_detalle_venta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FormaPago` (
    `id_forma_pago` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_forma` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_forma_pago`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistorialProductos` (
    `id_historial` INTEGER NOT NULL AUTO_INCREMENT,
    `id_producto` INTEGER NULL,
    `accion` VARCHAR(191) NOT NULL,
    `fecha_modificacion` DATETIME(3) NOT NULL,
    `detalles_modificacion` VARCHAR(191) NULL,
    `id_usuario` INTEGER NOT NULL,
    `nombre_producto` VARCHAR(191) NULL,
    `descripcion` VARCHAR(191) NULL,
    `precio_compra` DECIMAL(10, 2) NULL,
    `precio_venta` DECIMAL(10, 2) NULL,
    `descuento` INTEGER NULL,
    `cantidad` INTEGER NULL,

    PRIMARY KEY (`id_historial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inventario` (
    `id_producto` INTEGER NOT NULL AUTO_INCREMENT,
    `img` VARCHAR(191) NULL,
    `nombre_producto` CHAR(100) NULL,
    `descripcion` CHAR(100) NOT NULL,
    `precio_compra` INTEGER NOT NULL,
    `porcentaje_de_ganancia` INTEGER NOT NULL,
    `precio_neto` INTEGER NOT NULL,
    `precio_venta` INTEGER NOT NULL,
    `precio_venta_final` INTEGER NOT NULL,
    `codigo` INTEGER NOT NULL,
    `id_categoria` INTEGER NOT NULL,
    `descuento` INTEGER NOT NULL DEFAULT 0,
    `cantidad` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Inventario_codigo_key`(`codigo`),
    PRIMARY KEY (`id_producto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolUser` (
    `id_rol` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_rol` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `codigo_vendedor` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_usuario` VARCHAR(50) NOT NULL,
    `nombre_empresa` CHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `id_rol` INTEGER NOT NULL,
    `id_admin` INTEGER NULL,

    PRIMARY KEY (`codigo_vendedor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ventas` (
    `id_venta` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_vendedor` INTEGER NOT NULL,
    `id_producto` INTEGER NOT NULL,
    `fecha_venta` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_venta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DetalleVenta` ADD CONSTRAINT `DetalleVenta_id_venta_fkey` FOREIGN KEY (`id_venta`) REFERENCES `Ventas`(`id_venta`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleVenta` ADD CONSTRAINT `DetalleVenta_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `Inventario`(`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialProductos` ADD CONSTRAINT `HistorialProductos_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `Inventario`(`id_producto`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialProductos` ADD CONSTRAINT `HistorialProductos_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`codigo_vendedor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventario` ADD CONSTRAINT `Inventario_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `Categoria`(`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `Usuario`(`codigo_vendedor`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `RolUser`(`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ventas` ADD CONSTRAINT `Ventas_codigo_vendedor_fkey` FOREIGN KEY (`codigo_vendedor`) REFERENCES `Usuario`(`codigo_vendedor`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ventas` ADD CONSTRAINT `Ventas_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `Inventario`(`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE;
