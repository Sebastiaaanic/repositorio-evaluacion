CREATE DATABASE EVALUACION_PROINTEL;
USE EVALUACION_PROINTEL;

CREATE TABLE Clientes(
	IdCliente INT IDENTITY(1,1) PRIMARY KEY,
	Nombre VARCHAR(250) NOT NULL,
	FechaAlta DATETIME NOT NULL,
	Activo BIT NOT NULL
);

CREATE TABLE Pedidos(
	IdPedido INT IDENTITY(1,1) PRIMARY KEY,
	IdCliente INT NOT NULL,
	Fecha DATETIME NOT NULL,
	Total MONEY NOT NULL,
	Estado VARCHAR(20) NOT NULL
);

CREATE TABLE Productos(
	IdProducto INT IDENTITY(1,1) PRIMARY KEY,
	Nombre VARCHAR(250) NOT NULL,
	Categoria VARCHAR(250) NOT NULL,
	Costo MONEY
);


CREATE TABLE DetallePedido(
	IdDetalle INT IDENTITY(1,1) PRIMARY KEY,
	IdPedido INT NOT NULL,
	IdProducto INT NOT NULL,
	Cantidad INT NOT NULL,
	PrecioUnitario MONEY NOT NULL
);


INSERT INTO Clientes (Nombre, FechaAlta, Activo)
VALUES
('Juan Perez', DATEADD(YEAR,-2,GETDATE()), 1),
('Maria Lopez', DATEADD(YEAR,-1,GETDATE()), 1),
('Carlos Gomez', DATEADD(MONTH,-8,GETDATE()), 1),
('Ana Morales', DATEADD(YEAR,-3,GETDATE()), 0);

INSERT INTO Productos (Nombre, Categoria, Costo)
VALUES
('Laptop Dell', 'Computacion', 4500),
('Mouse Logitech', 'Accesorios', 80),
('Teclado Mecanico', 'Accesorios', 250),
('Monitor Samsung', 'Monitores', 1500);


INSERT INTO Pedidos (IdCliente, Fecha, Total, Estado)
VALUES
(1, DATEADD(DAY,-10,GETDATE()), 5000, 'Pagado'),
(1, DATEADD(DAY,-20,GETDATE()), 3000, 'Pagado'),
(1, DATEADD(DAY,-120,GETDATE()), 2000, 'Pagado'),
(2, DATEADD(DAY,-5,GETDATE()), 7000, 'Pagado'),
(2, DATEADD(DAY,-15,GETDATE()), 4000, 'Pagado'),
(2, DATEADD(DAY,-30,GETDATE()), 2500, 'Pendiente'),
(3, DATEADD(DAY,-8,GETDATE()), 2000, 'Pagado'),
(3, DATEADD(DAY,-25,GETDATE()), 1000, 'Pagado'),
(4, DATEADD(DAY,-12,GETDATE()), 9000, 'Pagado');



INSERT INTO DetallePedido(IdPedido,IdProducto,Cantidad,PrecioUnitario)
VALUES
(1,1,1,4500),
(1,2,2,250),
(2,2,3,100),
(2,3,1,2700),
(3,1,1,2000),
(4,4,2,3000),
(4,2,1,1000),
(5,4,3,1000),
(5,4,2,500),
(6,1,1,2500),
(7,3,2,1000),
(8,3,1,500),
(8,2,1,500),
(9,1,2,4500);



SELECT TOP 10
    c.IdCliente,
    c.Nombre,
    SUM(p.Total) monto,
	COUNT(p.IdPedido) cantidad
FROM Clientes c
JOIN Pedidos p ON p.IdCliente = c.IdCliente
JOIN DetallePedido dp ON dp.IdPedido = p.IdPedido
WHERE c.Activo = 1
AND p.Estado = 'Pagado'
AND p.Fecha >= DATEADD(DAY, -90, GETDATE())
GROUP BY
c.IdCliente,
c.Nombre
ORDER BY monto DESC 