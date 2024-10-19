-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-10-2024 a las 20:07:48
-- Versión del servidor: 8.0.39
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gistoked_2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL,
  `nombre_categoria` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre_categoria`) VALUES
(1, 'carne'),
(2, 'lacteo'),
(3, 'cereal'),
(4, 'verdura'),
(5, 'fruta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_venta`
--

CREATE TABLE `detalle_venta` (
  `id_detalle_venta` int NOT NULL,
  `id_venta` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `precio_total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forma_pago`
--

CREATE TABLE `forma_pago` (
  `id_forma_pago` int NOT NULL,
  `nombre_forma` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_productos`
--

CREATE TABLE `historial_productos` (
  `id_historial` int NOT NULL,
  `id_producto` int DEFAULT NULL,
  `accion` enum('agregar','editar','eliminar') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_modificacion` datetime NOT NULL,
  `detalles_modificacion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `id_usuario` int NOT NULL,
  `nombre_producto` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci,
  `precio_compra` decimal(10,2) DEFAULT NULL,
  `precio_venta` decimal(10,2) DEFAULT NULL,
  `descuento` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial_productos`
--

INSERT INTO `historial_productos` (`id_historial`, `id_producto`, `accion`, `fecha_modificacion`, `detalles_modificacion`, `id_usuario`, `nombre_producto`, `descripcion`, `precio_compra`, `precio_venta`, `descuento`, `cantidad`) VALUES
(3, NULL, 'agregar', '2024-10-12 13:35:51', 'Producto agregado', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(4, NULL, 'agregar', '2024-10-12 13:35:51', 'Producto agregado', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(5, NULL, 'agregar', '2024-10-12 13:35:51', 'Producto agregado', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 4, 'agregar', '2024-10-12 13:35:51', 'Producto agregado', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 5, 'agregar', '2024-10-12 13:35:51', 'Producto agregado', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(8, NULL, 'eliminar', '2024-10-12 13:36:06', 'Producto eliminado', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(12, NULL, 'eliminar', '2024-10-12 13:39:44', 'Producto eliminado', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(13, NULL, 'eliminar', '2024-10-12 13:39:48', 'Producto eliminado', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(14, NULL, 'agregar', '2024-10-12 13:40:06', 'Producto agregado', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 4, 'editar', '2024-10-12 14:49:47', 'Producto editado', 2, 'Producto D', 'Descripción del Producto D', 200.00, 280.00, 15, 20),
(18, NULL, 'eliminar', '2024-10-12 14:58:39', 'Producto eliminado', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 4, 'editar', '2024-10-12 15:07:21', 'Producto editado', 2, 'Producto D', 'Descripción del Producto D', 200.00, 280.00, 15, 20),
(20, NULL, 'agregar', '2024-10-12 15:07:31', 'Producto agregado', 2, 'Producto D', 'Descripción del Producto D', 200.00, 280.00, 15, 20),
(21, NULL, 'eliminar', '2024-10-12 15:07:37', 'Producto eliminado', 2, 'Producto D', 'Descripción del Producto D', 200.00, 280.00, 15, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id_producto` int NOT NULL,
  `img` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `nombre_producto` char(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `descripcion` char(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `precio_compra` int NOT NULL,
  `porcentaje_de_ganancia` int NOT NULL,
  `precio_neto` int NOT NULL,
  `precio_venta` int NOT NULL,
  `precio_venta_final` int NOT NULL,
  `codigo` int NOT NULL,
  `id_categoria` int NOT NULL,
  `descuento` int NOT NULL DEFAULT '0',
  `cantidad` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id_producto`, `img`, `nombre_producto`, `descripcion`, `precio_compra`, `porcentaje_de_ganancia`, `precio_neto`, `precio_venta`, `precio_venta_final`, `codigo`, `id_categoria`, `descuento`, `cantidad`) VALUES
(4, 'mage4.jpg', 'Producto D', 'Descripción del Producto D', 200, 30, 260, 280, 280, 98768, 4, 15, 20),
(5, 'image5.jpg', 'Producto E', 'Descripción del Producto E', 50, 10, 55, 60, 60, 11111, 5, 0, 100);

--
-- Disparadores `inventario`
--
DELIMITER $$
CREATE TRIGGER `after_insert_inventario` AFTER INSERT ON `inventario` FOR EACH ROW BEGIN
    INSERT INTO historial_productos (
        id_producto, accion, fecha_modificacion, detalles_modificacion, id_usuario, nombre_producto, descripcion, precio_compra, precio_venta, descuento, cantidad
    )
    VALUES (
        NEW.id_producto, 'agregar', NOW(), 'Producto agregado', 2, NEW.nombre_producto, NEW.descripcion, NEW.precio_compra, NEW.precio_venta, NEW.descuento, NEW.cantidad
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_inventario` AFTER UPDATE ON `inventario` FOR EACH ROW BEGIN
    INSERT INTO historial_productos (
        id_producto, accion, fecha_modificacion, detalles_modificacion, id_usuario, nombre_producto, descripcion, precio_compra, precio_venta, descuento, cantidad
    )
    VALUES (
        NEW.id_producto, 'editar', NOW(), 'Producto editado', 2, NEW.nombre_producto, NEW.descripcion, NEW.precio_compra, NEW.precio_venta, NEW.descuento, NEW.cantidad
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_delete_inventario` BEFORE DELETE ON `inventario` FOR EACH ROW BEGIN
    INSERT INTO historial_productos (
        id_producto, accion, fecha_modificacion, detalles_modificacion, id_usuario, nombre_producto, descripcion, precio_compra, precio_venta, descuento, cantidad
    )
    VALUES (
        OLD.id_producto, 'eliminar', NOW(), 'Producto eliminado', 2, OLD.nombre_producto, OLD.descripcion, OLD.precio_compra, OLD.precio_venta, OLD.descuento, OLD.cantidad
    );
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_user`
--

CREATE TABLE `rol_user` (
  `id_rol` int NOT NULL,
  `nombre_rol` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol_user`
--

INSERT INTO `rol_user` (`id_rol`, `nombre_rol`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `codigo_vendedor` int NOT NULL,
  `nombre_usuario` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nombre_empresa` char(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_rol` int NOT NULL,
  `id_admin` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`codigo_vendedor`, `nombre_usuario`, `nombre_empresa`, `password`, `email`, `id_rol`, `id_admin`) VALUES
(1, 'Juan Perez', 'Empresa A', 'password123', 'juan@empresa.com', 2, 1),
(2, 'Ana Gómez', 'Empresa B', 'password456', 'ana@empresa.com', 1, 1),
(3, 'Carlos Ruiz', 'Empresa C', 'password789', 'carlos@empresa.com', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int NOT NULL,
  `codigo_vendedor` int NOT NULL,
  `id_producto` int NOT NULL,
  `fecha_venta` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`id_detalle_venta`),
  ADD KEY `id_venta` (`id_venta`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `forma_pago`
--
ALTER TABLE `forma_pago`
  ADD PRIMARY KEY (`id_forma_pago`);

--
-- Indices de la tabla `historial_productos`
--
ALTER TABLE `historial_productos`
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `fk_historial_producto` (`id_producto`),
  ADD KEY `fk_historial_usuario` (`id_usuario`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_producto`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD KEY `fk_categoria` (`id_categoria`);

--
-- Indices de la tabla `rol_user`
--
ALTER TABLE `rol_user`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`codigo_vendedor`) USING BTREE,
  ADD KEY `id_rol` (`id_rol`),
  ADD KEY `id_admin` (`id_admin`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `fk_ventas_usuario` (`codigo_vendedor`),
  ADD KEY `fk_id_producto` (`id_producto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  MODIFY `id_detalle_venta` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `forma_pago`
--
ALTER TABLE `forma_pago`
  MODIFY `id_forma_pago` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historial_productos`
--
ALTER TABLE `historial_productos`
  MODIFY `id_historial` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_producto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `rol_user`
--
ALTER TABLE `rol_user`
  MODIFY `id_rol` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `codigo_vendedor` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id_venta` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD CONSTRAINT `detalle_venta_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalle_venta_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `inventario` (`id_producto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `historial_productos`
--
ALTER TABLE `historial_productos`
  ADD CONSTRAINT `fk_historial_producto` FOREIGN KEY (`id_producto`) REFERENCES `inventario` (`id_producto`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_historial_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`codigo_vendedor`);

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_admin` FOREIGN KEY (`id_admin`) REFERENCES `usuario` (`codigo_vendedor`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol_user` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `fk_id_producto` FOREIGN KEY (`id_producto`) REFERENCES `inventario` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ventas_usuario` FOREIGN KEY (`codigo_vendedor`) REFERENCES `usuario` (`codigo_vendedor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
