-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
<<<<<<< HEAD
-- Tiempo de generación: 31-08-2024 a las 04:50:49
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4
=======
-- Tiempo de generación: 29-08-2024 a las 23:37:09
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12
>>>>>>> 6e10c59 (Descripcion)

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_comercial`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(50) NOT NULL,
  `estado` enum('activo','inactivo') NOT NULL DEFAULT 'activo',
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

<<<<<<< HEAD
--
-- Disparadores `categoria`
--
DELIMITER $$
CREATE TRIGGER `after_delete_categoria` AFTER DELETE ON `categoria` FOR EACH ROW BEGIN
    INSERT INTO categoria_rev (action, id_categoria, nombre_categoria, estado, descripcion, created_at)
    VALUES ('DELETE', OLD.id_categoria, OLD.nombre_categoria, OLD.estado, OLD.descripcion, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_categoria` AFTER INSERT ON `categoria` FOR EACH ROW BEGIN
    INSERT INTO categoria_rev (action, id_categoria, nombre_categoria, estado, descripcion, created_at)
    VALUES ('INSERT', NEW.id_categoria, NEW.nombre_categoria, NEW.estado, NEW.descripcion, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_categoria` AFTER UPDATE ON `categoria` FOR EACH ROW BEGIN
    INSERT INTO categoria_rev (action, id_categoria, nombre_categoria, estado, descripcion, created_at)
    VALUES ('UPDATE', NEW.id_categoria, NEW.nombre_categoria, NEW.estado, NEW.descripcion, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_insert_categoria` BEFORE INSERT ON `categoria` FOR EACH ROW BEGIN
    IF NEW.nombre_categoria IS NULL OR LENGTH(NEW.nombre_categoria) = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El nombre de la categoría no puede estar vacío.';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_update_categoria` BEFORE UPDATE ON `categoria` FOR EACH ROW BEGIN
    IF NEW.nombre_categoria IS NULL OR LENGTH(NEW.nombre_categoria) = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El nombre de la categoría no puede estar vacío.';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_rev`
--

CREATE TABLE `categoria_rev` (
  `action` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `id` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(50) NOT NULL,
  `estado` enum('activo','inactivo') NOT NULL,
  `descripcion` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria_rev`
--

INSERT INTO `categoria_rev` (`action`, `id`, `id_categoria`, `nombre_categoria`, `estado`, `descripcion`, `created_at`) VALUES
('INSERT', 1, 69, 'lol', '', 'league of legends', '2024-08-31 02:48:35'),
('DELETE', 2, 69, 'lol', '', 'league of legends', '2024-08-31 02:49:29');

=======
>>>>>>> 6e10c59 (Descripcion)
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_venta`
--

CREATE TABLE `detalle_venta` (
  `id_detalle_venta` int(11) NOT NULL,
  `id_venta` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad_vendida` int(11) NOT NULL,
  `total_detalle` decimal(12,2) NOT NULL
<<<<<<< HEAD
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Disparadores `detalle_venta`
--
DELIMITER $$
CREATE TRIGGER `after_delete_detalle_venta` AFTER DELETE ON `detalle_venta` FOR EACH ROW BEGIN
    INSERT INTO detalle_venta_rev (action, id_detalle_venta, id_venta, id_producto, cantidad_vendida, total_detalle, created_at)
    VALUES ('DELETE', OLD.id_detalle_venta, OLD.id_venta, OLD.id_producto, OLD.cantidad_vendida, OLD.total_detalle, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_detalle_venta` AFTER INSERT ON `detalle_venta` FOR EACH ROW BEGIN
    INSERT INTO detalle_venta_rev (action, id_detalle_venta, id_venta, id_producto, cantidad_vendida, total_detalle, created_at)
    VALUES ('INSERT', NEW.id_detalle_venta, NEW.id_venta, NEW.id_producto, NEW.cantidad_vendida, NEW.total_detalle, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_detalle_venta` AFTER UPDATE ON `detalle_venta` FOR EACH ROW BEGIN
    INSERT INTO detalle_venta_rev (action, id_detalle_venta, id_venta, id_producto, cantidad_vendida, total_detalle, created_at)
    VALUES ('UPDATE', NEW.id_detalle_venta, NEW.id_venta, NEW.id_producto, NEW.cantidad_vendida, NEW.total_detalle, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_insert_detalle_venta` BEFORE INSERT ON `detalle_venta` FOR EACH ROW BEGIN
    IF NEW.cantidad_vendida <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La cantidad vendida debe ser mayor a cero.';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_venta_rev`
--

CREATE TABLE `detalle_venta_rev` (
  `action` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `id` int(11) NOT NULL,
  `id_detalle` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
=======
) ;
>>>>>>> 6e10c59 (Descripcion)

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_pago`
--

CREATE TABLE `estado_pago` (
  `id_estado_pago` int(11) NOT NULL,
  `nombre_estado` varchar(50) NOT NULL,
  `descripcion_estado` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

<<<<<<< HEAD
--
-- Disparadores `estado_pago`
--
DELIMITER $$
CREATE TRIGGER `after_delete_estado_pago` AFTER DELETE ON `estado_pago` FOR EACH ROW BEGIN
    INSERT INTO estado_pago_rev (action, id_estado_pago, nombre_estado, descripcion_estado, created_at)
    VALUES ('DELETE', OLD.id_estado_pago, OLD.nombre_estado, OLD.descripcion_estado, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_estado_pago` AFTER INSERT ON `estado_pago` FOR EACH ROW BEGIN
    INSERT INTO estado_pago_rev (action, id_estado_pago, nombre_estado, descripcion_estado, created_at)
    VALUES ('INSERT', NEW.id_estado_pago, NEW.nombre_estado, NEW.descripcion_estado, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_estado_pago` AFTER UPDATE ON `estado_pago` FOR EACH ROW BEGIN
    INSERT INTO estado_pago_rev (action, id_estado_pago, nombre_estado, descripcion_estado, created_at)
    VALUES ('UPDATE', NEW.id_estado_pago, NEW.nombre_estado, NEW.descripcion_estado, NOW());
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_pago_rev`
--

CREATE TABLE `estado_pago_rev` (
  `action` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `id` int(11) NOT NULL,
  `id_estado` int(11) NOT NULL,
  `descripcion_estado` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

=======
>>>>>>> 6e10c59 (Descripcion)
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forma_pago`
--

CREATE TABLE `forma_pago` (
  `id_forma_pago` int(11) NOT NULL,
  `id_metodo_pago` int(11) NOT NULL,
  `id_estado_pago` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

<<<<<<< HEAD
--
-- Disparadores `forma_pago`
--
DELIMITER $$
CREATE TRIGGER `after_delete_forma_pago` AFTER DELETE ON `forma_pago` FOR EACH ROW BEGIN
    INSERT INTO forma_pago_rev (action, id_forma_pago, id_metodo_pago, id_estado_pago, created_at)
    VALUES ('DELETE', OLD.id_forma_pago, OLD.id_metodo_pago, OLD.id_estado_pago, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_forma_pago` AFTER INSERT ON `forma_pago` FOR EACH ROW BEGIN
    INSERT INTO forma_pago_rev (action, id_forma_pago, id_metodo_pago, id_estado_pago, created_at)
    VALUES ('INSERT', NEW.id_forma_pago, NEW.id_metodo_pago, NEW.id_estado_pago, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_forma_pago` AFTER UPDATE ON `forma_pago` FOR EACH ROW BEGIN
    INSERT INTO forma_pago_rev (action, id_forma_pago, id_metodo_pago, id_estado_pago, created_at)
    VALUES ('UPDATE', NEW.id_forma_pago, NEW.id_metodo_pago, NEW.id_estado_pago, NOW());
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `forma_pago_rev`
--

CREATE TABLE `forma_pago_rev` (
  `action` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `id` int(11) NOT NULL,
  `id_forma` int(11) NOT NULL,
  `descripcion_forma` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

=======
>>>>>>> 6e10c59 (Descripcion)
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inf_ventas`
--

CREATE TABLE `inf_ventas` (
  `id_inf` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `total_ventas` decimal(12,2) NOT NULL,
  `productos_mas_vendidos` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

<<<<<<< HEAD
--
-- Disparadores `inf_ventas`
--
DELIMITER $$
CREATE TRIGGER `after_delete_inf_ventas` AFTER DELETE ON `inf_ventas` FOR EACH ROW BEGIN
    INSERT INTO inf_ventas_rev (action, id_inf,id_usuario,fecha,total_ventas,productos_mas_vendidos, created_at)
    VALUES ('DELETE',OLD.id_inf,OLD.id_usuario,OLD.fecha,OLD.total_ventas,OLD.productos_mas_vendidos, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_inf_ventas` AFTER INSERT ON `inf_ventas` FOR EACH ROW BEGIN
    INSERT INTO inf_ventas_rev (action, id_inf,id_usuario,fecha,total_ventas,productos_mas_vendidos, created_at)
    VALUES ('INSERT', NEW.id_inf,NEW.id_usuario,NEW.fecha,NEW.total_ventas,NEW.productos_mas_vendidos, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_inf_ventas` AFTER UPDATE ON `inf_ventas` FOR EACH ROW BEGIN
    INSERT INTO inf_ventas_rev (action, id_inf,id_usuario,fecha,total_ventas,productos_mas_vendidos, created_at)
    VALUES ('UPDATE',NEW.id_inf,NEW.id_usuario,NEW.fecha,NEW.total_ventas,NEW.productos_mas_vendidos, NOW());
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inf_ventas_rev`
--

CREATE TABLE `inf_ventas_rev` (
  `action` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `id` int(11) NOT NULL,
  `id_informe` int(11) NOT NULL,
  `id_venta` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `total_ventas` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

=======
>>>>>>> 6e10c59 (Descripcion)
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id_inventario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `fecha_entrada` date NOT NULL,
  `fecha_salida` date DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `stock_ajustado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

<<<<<<< HEAD
--
-- Disparadores `inventario`
--
DELIMITER $$
CREATE TRIGGER `after_delete_inventario` AFTER DELETE ON `inventario` FOR EACH ROW BEGIN
    INSERT INTO inventario_rev (action, id_inventario, id_producto, fecha_entrada, fecha_salida, cantidad, stock_ajustado, created_at)
    VALUES ('DELETE', OLD.id_inventario, OLD.id_producto, OLD.fecha_entrada, OLD.fecha_salida, OLD.cantidad, OLD.stock_ajustado, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_inventario` AFTER INSERT ON `inventario` FOR EACH ROW BEGIN
    INSERT INTO inventario_rev (action, id_inventario, id_producto, fecha_entrada, fecha_salida, cantidad, stock_ajustado, created_at)
    VALUES ('INSERT', NEW.id_inventario, NEW.id_producto, NEW.fecha_entrada, NEW.fecha_salida, NEW.cantidad, NEW.stock_ajustado, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_inventario` AFTER UPDATE ON `inventario` FOR EACH ROW BEGIN
    INSERT INTO inventario_rev (action, id_inventario, id_producto, fecha_entrada, fecha_salida, cantidad, stock_ajustado, created_at)
    VALUES ('UPDATE', NEW.id_inventario, NEW.id_producto, NEW.fecha_entrada, NEW.fecha_salida, NEW.cantidad, NEW.stock_ajustado, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_insert_inventario` BEFORE INSERT ON `inventario` FOR EACH ROW BEGIN
    IF NEW.cantidad < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La cantidad en inventario no puede ser negativa.';
    END IF;
    IF NEW.fecha_entrada IS NULL THEN
        SET NEW.fecha_entrada = NOW();
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_update_inventario` BEFORE UPDATE ON `inventario` FOR EACH ROW BEGIN
    IF NEW.cantidad < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La cantidad en inventario no puede ser negativa.';
    END IF;
    IF NEW.stock_ajustado IS NULL THEN
        SET NEW.stock_ajustado = OLD.cantidad;
    END IF;
    IF NEW.fecha_salida IS NULL AND OLD.fecha_salida IS NOT NULL THEN
        SET NEW.fecha_salida = OLD.fecha_salida;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario_rev`
--

CREATE TABLE `inventario_rev` (
  `action` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `id` int(11) NOT NULL,
  `id_inventario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

=======
>>>>>>> 6e10c59 (Descripcion)
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodo_pago`
--

CREATE TABLE `metodo_pago` (
  `id_metodo_pago` int(11) NOT NULL,
  `nombre_metodo` varchar(50) NOT NULL,
  `descripcion_metodo` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

<<<<<<< HEAD
--
-- Disparadores `metodo_pago`
--
DELIMITER $$
CREATE TRIGGER `after_delete_metodo_pago` AFTER DELETE ON `metodo_pago` FOR EACH ROW BEGIN
    INSERT INTO metodo_pago_rev (action, id_metodo_pago, nombre_metodo, descripcion_metodo, created_at)
    VALUES ('DELETE', OLD.id_metodo_pago, OLD.nombre_metodo, OLD.descripcion_metodo, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_metodo_pago` AFTER INSERT ON `metodo_pago` FOR EACH ROW BEGIN
    INSERT INTO metodo_pago_rev (action, id_metodo_pago, nombre_metodo, descripcion_metodo, created_at)
    VALUES ('INSERT', NEW.id_metodo_pago, NEW.nombre_metodo, NEW.descripcion_metodo, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_metodo_pago` AFTER UPDATE ON `metodo_pago` FOR EACH ROW BEGIN
    INSERT INTO metodo_pago_rev (action, id_metodo_pago, nombre_metodo, descripcion_metodo, created_at)
    VALUES ('UPDATE', NEW.id_metodo_pago, NEW.nombre_metodo, NEW.descripcion_metodo, NOW());
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodo_pago_rev`
--

CREATE TABLE `metodo_pago_rev` (
  `action` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `id` int(11) NOT NULL,
  `id_metodo` int(11) NOT NULL,
  `descripcion_metodo` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

=======
>>>>>>> 6e10c59 (Descripcion)
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `nombre_producto` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio_compra` decimal(12,2) NOT NULL,
  `porcentaje_ganancia` decimal(5,2) NOT NULL,
  `precio_neto` decimal(12,2) NOT NULL,
  `precio_venta` decimal(12,2) NOT NULL,
  `precio_final` decimal(12,2) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

<<<<<<< HEAD
--
-- Disparadores `producto`
--
DELIMITER $$
CREATE TRIGGER `after_delete_producto` AFTER DELETE ON `producto` FOR EACH ROW BEGIN
    INSERT INTO producto_rev (action, id_producto, nombre_producto, descripcion, precio_compra, porcentaje_ganancia, precio_neto, precio_venta, precio_final, id_categoria, stock, created_at)
    VALUES ('DELETE', OLD.id_producto, OLD.nombre_producto, OLD.descripcion, OLD.precio_compra, OLD.porcentaje_ganancia, OLD.precio_neto, OLD.precio_venta, OLD.precio_final, OLD.id_categoria, OLD.stock, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_producto` AFTER INSERT ON `producto` FOR EACH ROW BEGIN
    INSERT INTO producto_rev (action, id_producto, nombre_producto, descripcion, precio_compra, porcentaje_ganancia, precio_neto, precio_venta, precio_final, id_categoria, stock, created_at)
    VALUES ('INSERT', NEW.id_producto, NEW.nombre_producto, NEW.descripcion, NEW.precio_compra, NEW.porcentaje_ganancia, NEW.precio_neto, NEW.precio_venta, NEW.precio_final, NEW.id_categoria, NEW.stock, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_producto` AFTER UPDATE ON `producto` FOR EACH ROW BEGIN
    INSERT INTO producto_rev (action, id_producto, nombre_producto, descripcion, precio_compra, porcentaje_ganancia, precio_neto, precio_venta, precio_final, id_categoria, stock, created_at)
    VALUES ('UPDATE', NEW.id_producto, NEW.nombre_producto, NEW.descripcion, NEW.precio_compra, NEW.porcentaje_ganancia, NEW.precio_neto, NEW.precio_venta, NEW.precio_final, NEW.id_categoria, NEW.stock, NOW());
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_rev`
--

CREATE TABLE `producto_rev` (
  `action` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `nombre_producto` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `estado` enum('activo','inactivo') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

=======
>>>>>>> 6e10c59 (Descripcion)
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_user`
--

CREATE TABLE `rol_user` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL,
  `permisos` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

<<<<<<< HEAD
--
-- Disparadores `rol_user`
--
DELIMITER $$
CREATE TRIGGER `after_delete_rol_user` AFTER DELETE ON `rol_user` FOR EACH ROW BEGIN
    INSERT INTO rol_user_rev (action, id_rol, nombre_rol, permisos, created_at)
    VALUES ('DELETE', OLD.id_rol, OLD.nombre_rol, OLD.permisos, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_rol_user` AFTER INSERT ON `rol_user` FOR EACH ROW BEGIN
    INSERT INTO rol_user_rev (action, id_rol, nombre_rol, permisos, created_at)
    VALUES ('INSERT', NEW.id_rol, NEW.nombre_rol, NEW.permisos, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_rol_user` AFTER UPDATE ON `rol_user` FOR EACH ROW BEGIN
    INSERT INTO rol_user_rev (action, id_rol, nombre_rol, permisos, created_at)
    VALUES ('UPDATE', NEW.id_rol, NEW.nombre_rol, NEW.permisos, NOW());
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_user_rev`
--

CREATE TABLE `rol_user_rev` (
  `action` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `id` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `descripcion_rol` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

=======
>>>>>>> 6e10c59 (Descripcion)
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `rol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

<<<<<<< HEAD
--
-- Disparadores `usuario`
--
DELIMITER $$
CREATE TRIGGER `after_delete_usuario` AFTER DELETE ON `usuario` FOR EACH ROW BEGIN
    INSERT INTO usuario_rev (action, id, nombre, contraseña, rol, created_at)
    VALUES ('DELETE', OLD.id, OLD.nombre, OLD.contraseña, OLD.rol, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_usuario` AFTER INSERT ON `usuario` FOR EACH ROW BEGIN
    INSERT INTO usuario_rev (action, id, nombre, contraseña, rol, created_at)
    VALUES ('INSERT', NEW.id, NEW.nombre, NEW.contraseña, NEW.rol, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_usuario` AFTER UPDATE ON `usuario` FOR EACH ROW BEGIN
    INSERT INTO usuario_rev (action, id, nombre, contraseña, rol, created_at)
    VALUES ('UPDATE', NEW.id, NEW.nombre, NEW.contraseña, NEW.rol, NOW());
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_rev`
--

CREATE TABLE `usuario_rev` (
  `action` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `estado` enum('activo','inactivo') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

=======
>>>>>>> 6e10c59 (Descripcion)
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int(11) NOT NULL,
  `fecha_venta` date NOT NULL,
  `total_venta` decimal(12,2) NOT NULL,
  `descuento` decimal(5,2) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_forma_pago` int(11) NOT NULL
<<<<<<< HEAD
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Disparadores `ventas`
--
DELIMITER $$
CREATE TRIGGER `after_delete_ventas` AFTER DELETE ON `ventas` FOR EACH ROW BEGIN
    INSERT INTO ventas_rev (action, id_venta, fecha_venta, total_venta, descuento, id_usuario, id_forma_pago, created_at)
    VALUES ('DELETE', OLD.id_venta, OLD.fecha_venta, OLD.total_venta, OLD.descuento, OLD.id_usuario, OLD.id_forma_pago, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_ventas` AFTER INSERT ON `ventas` FOR EACH ROW BEGIN
    INSERT INTO ventas_rev (action, id_venta, fecha_venta, total_venta, descuento, id_usuario, id_forma_pago, created_at)
    VALUES ('INSERT', NEW.id_venta, NEW.fecha_venta, NEW.total_venta, NEW.descuento, NEW.id_usuario, NEW.id_forma_pago, NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_ventas` AFTER UPDATE ON `ventas` FOR EACH ROW BEGIN
    INSERT INTO ventas_rev (action, id_venta, fecha_venta, total_venta, descuento, id_usuario, id_forma_pago, created_at)
    VALUES ('UPDATE', NEW.id_venta, NEW.fecha_venta, NEW.total_venta, NEW.descuento, NEW.id_usuario, NEW.id_forma_pago, NOW());
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas_rev`
--

CREATE TABLE `ventas_rev` (
  `action` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `id` int(11) NOT NULL,
  `id_venta` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha_venta` datetime NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
=======
) ;
>>>>>>> 6e10c59 (Descripcion)

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`),
  ADD KEY `idx_categoria_nombre` (`nombre_categoria`);

--
<<<<<<< HEAD
-- Indices de la tabla `categoria_rev`
--
ALTER TABLE `categoria_rev`
  ADD PRIMARY KEY (`id`);

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- Indices de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`id_detalle_venta`),
  ADD KEY `idx_detalle_venta_venta` (`id_venta`),
  ADD KEY `idx_detalle_venta_producto` (`id_producto`);

--
<<<<<<< HEAD
-- Indices de la tabla `detalle_venta_rev`
--
ALTER TABLE `detalle_venta_rev`
  ADD PRIMARY KEY (`id`);

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- Indices de la tabla `estado_pago`
--
ALTER TABLE `estado_pago`
  ADD PRIMARY KEY (`id_estado_pago`);

--
<<<<<<< HEAD
-- Indices de la tabla `estado_pago_rev`
--
ALTER TABLE `estado_pago_rev`
  ADD PRIMARY KEY (`id`);

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- Indices de la tabla `forma_pago`
--
ALTER TABLE `forma_pago`
  ADD PRIMARY KEY (`id_forma_pago`),
  ADD KEY `id_metodo_pago` (`id_metodo_pago`),
  ADD KEY `id_estado_pago` (`id_estado_pago`);

--
<<<<<<< HEAD
-- Indices de la tabla `forma_pago_rev`
--
ALTER TABLE `forma_pago_rev`
  ADD PRIMARY KEY (`id`);

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- Indices de la tabla `inf_ventas`
--
ALTER TABLE `inf_ventas`
  ADD PRIMARY KEY (`id_inf`),
  ADD KEY `id_usuario` (`id_usuario`);

--
<<<<<<< HEAD
-- Indices de la tabla `inf_ventas_rev`
--
ALTER TABLE `inf_ventas_rev`
  ADD PRIMARY KEY (`id`);

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_inventario`),
  ADD KEY `id_producto` (`id_producto`);

--
<<<<<<< HEAD
-- Indices de la tabla `inventario_rev`
--
ALTER TABLE `inventario_rev`
  ADD PRIMARY KEY (`id`);

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- Indices de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  ADD PRIMARY KEY (`id_metodo_pago`);

--
<<<<<<< HEAD
-- Indices de la tabla `metodo_pago_rev`
--
ALTER TABLE `metodo_pago_rev`
  ADD PRIMARY KEY (`id`);

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `idx_producto_nombre` (`nombre_producto`);

--
<<<<<<< HEAD
-- Indices de la tabla `producto_rev`
--
ALTER TABLE `producto_rev`
  ADD PRIMARY KEY (`id`);

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- Indices de la tabla `rol_user`
--
ALTER TABLE `rol_user`
  ADD PRIMARY KEY (`id_rol`);

--
<<<<<<< HEAD
-- Indices de la tabla `rol_user_rev`
--
ALTER TABLE `rol_user_rev`
  ADD PRIMARY KEY (`id`);

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rol` (`rol`);

--
<<<<<<< HEAD
-- Indices de la tabla `usuario_rev`
--
ALTER TABLE `usuario_rev`
  ADD PRIMARY KEY (`id`);

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_forma_pago` (`id_forma_pago`),
  ADD KEY `idx_ventas_fecha` (`fecha_venta`);

--
<<<<<<< HEAD
-- Indices de la tabla `ventas_rev`
--
ALTER TABLE `ventas_rev`
  ADD PRIMARY KEY (`id`);

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
<<<<<<< HEAD
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT de la tabla `categoria_rev`
--
ALTER TABLE `categoria_rev`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
=======
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT;
>>>>>>> 6e10c59 (Descripcion)

--
-- AUTO_INCREMENT de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  MODIFY `id_detalle_venta` int(11) NOT NULL AUTO_INCREMENT;

--
<<<<<<< HEAD
-- AUTO_INCREMENT de la tabla `detalle_venta_rev`
--
ALTER TABLE `detalle_venta_rev`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- AUTO_INCREMENT de la tabla `estado_pago`
--
ALTER TABLE `estado_pago`
  MODIFY `id_estado_pago` int(11) NOT NULL AUTO_INCREMENT;

--
<<<<<<< HEAD
-- AUTO_INCREMENT de la tabla `estado_pago_rev`
--
ALTER TABLE `estado_pago_rev`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- AUTO_INCREMENT de la tabla `forma_pago`
--
ALTER TABLE `forma_pago`
  MODIFY `id_forma_pago` int(11) NOT NULL AUTO_INCREMENT;

--
<<<<<<< HEAD
-- AUTO_INCREMENT de la tabla `forma_pago_rev`
--
ALTER TABLE `forma_pago_rev`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- AUTO_INCREMENT de la tabla `inf_ventas`
--
ALTER TABLE `inf_ventas`
  MODIFY `id_inf` int(11) NOT NULL AUTO_INCREMENT;

--
<<<<<<< HEAD
-- AUTO_INCREMENT de la tabla `inf_ventas_rev`
--
ALTER TABLE `inf_ventas_rev`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_inventario` int(11) NOT NULL AUTO_INCREMENT;

--
<<<<<<< HEAD
-- AUTO_INCREMENT de la tabla `inventario_rev`
--
ALTER TABLE `inventario_rev`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- AUTO_INCREMENT de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  MODIFY `id_metodo_pago` int(11) NOT NULL AUTO_INCREMENT;

--
<<<<<<< HEAD
-- AUTO_INCREMENT de la tabla `metodo_pago_rev`
--
ALTER TABLE `metodo_pago_rev`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT;

--
<<<<<<< HEAD
-- AUTO_INCREMENT de la tabla `producto_rev`
--
ALTER TABLE `producto_rev`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- AUTO_INCREMENT de la tabla `rol_user`
--
ALTER TABLE `rol_user`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT;

--
<<<<<<< HEAD
-- AUTO_INCREMENT de la tabla `rol_user_rev`
--
ALTER TABLE `rol_user_rev`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
<<<<<<< HEAD
-- AUTO_INCREMENT de la tabla `usuario_rev`
--
ALTER TABLE `usuario_rev`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT;

--
<<<<<<< HEAD
-- AUTO_INCREMENT de la tabla `ventas_rev`
--
ALTER TABLE `ventas_rev`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
=======
>>>>>>> 6e10c59 (Descripcion)
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD CONSTRAINT `detalle_venta_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalle_venta_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `forma_pago`
--
ALTER TABLE `forma_pago`
  ADD CONSTRAINT `forma_pago_ibfk_1` FOREIGN KEY (`id_metodo_pago`) REFERENCES `metodo_pago` (`id_metodo_pago`),
  ADD CONSTRAINT `forma_pago_ibfk_2` FOREIGN KEY (`id_estado_pago`) REFERENCES `estado_pago` (`id_estado_pago`);

--
-- Filtros para la tabla `inf_ventas`
--
ALTER TABLE `inf_ventas`
  ADD CONSTRAINT `inf_ventas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `rol_user` (`id_rol`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`id_forma_pago`) REFERENCES `forma_pago` (`id_forma_pago`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
