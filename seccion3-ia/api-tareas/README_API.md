# API de Tareas

API REST desarrollada en **Node.js + TypeScript** con conexión a **SQL Server**, diseñada para la gestión de tareas por usuario. Incluye configuración completa con Docker para levantarse sin instalar Node.js ni SQL Server localmente.

---

## Tecnologías

- Node.js 22 en adelante
- TypeScript
- Express 
- SQL Server 2022
- Docker + Docker Compose
- mssql (driver de conexión)
- morphism (mapeo de objetos)

---

## Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y corriendo
- Mínimo 2 GB de RAM asignados a Docker

Si deseas correr el proyecto sin Docker, necesitas Node.js 22+ y acceso a una instancia de SQL Server.

---

## Levantar el proyecto con Docker (recomendado)

Con un solo comando se levantan la API y la instancia de SQL Server:

``` COMANDOS PARA LEVANTAR LAS IMAGENES Y CONTENEDOR
docker compose up -d --build
```

Docker se encarga de:
1. Descargar la imagen de SQL Server 2022
2. Construir la imagen de la API
3. Esperar a que SQL Server esté listo antes de iniciar la API
4. Conectar ambos servicios en una red interna

Una vez levantado, la API estará disponible en:

```
http://localhost:3000
```

Para detener los servicios:

``` TERMINAL
docker compose down
```

Los datos de SQL Server persisten en un volumen Docker. Para eliminarlos junto con los contenedores usa `docker compose down -v`.

---

## Levantar el proyecto en local (sin Docker)

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia el archivo de ejemplo y completa los valores:

```
archivo: .env_example
```

Edita el `.env` con los datos de tu instancia de SQL Server local.

### 3. Ejecutar los scripts SQL

Conéctate a tu instancia de SQL Server y ejecuta en orden los archivos de la carpeta `/sql`:

```
sql/
├── 01_CREATE_DATABSE_AND_TABLES.sql     -- Crea las tablas necesarias
└── 01_SP_MANAGE_USER -- Crea el stored procedure de usuarios
├── 02_SP_MANAGE_TASK -- Crea el stored procedure de TASK
└── 03_MANAGE_CUSTOMFIND -- Crea el stored procedure para operaciones de busqueda
```

### 4. Correr en modo desarrollo

```bash
npm run dev
```

### 5. Compilar y correr en producción

```bash
npm run build
npm start
```

---

## Variables de entorno

Copia `.env.example` a `.env` y completa los valores:

| Variable | Descripción | Ejemplo |
|---|---|---|
| `PORT` | Puerto donde corre la API | `3000` |
| `NODE_ENV` | Entorno de ejecución | `development` |
| `DB_HOST` | Host de SQL Server | `localhost` |
| `DB_USER` | Usuario de SQL Server | `sa` |
| `DB_PASSWORD` | Contraseña de SQL Server | `MiPassword123!` |
| `DB_NAME` | Nombre de la base de datos | `EVA_PROINTEL` |
| `DB_PORT` | Puerto de SQL Server | `1433` |

---

## Endpoints disponibles

Base URL: `http://localhost:3000/api/v1`

### Crear tarea

```
POST /tasks/CreateTask
Content-Type: application/json
```

Body:
```json
{
  "typeOperation": "A",
  "TaskCreate": {
    "idTask": "0d57c76a67704aad90873a414290baa7",
    "title": "LAVAR PLATOS",
    "description": "LAVAR LOS PLATOS DE TODOS LOS EMPLEADOS",
    "priority": "PENDIENTE",
    "idResponsable": "cc135084c46f46db9442e7a82afa16ea",
    "dateLimit": "2026-06-30"
  }
}
```

Respuesta exitosa:
```json
{
  "responseCode": "00",
  "reasonText": "TASK CREATED",
  "Task": {
    "id": "abc123",
    "nameTask": "Nombre de la tarea",
    "description": "Descripción de la tarea",
    "priority": "PENDIENTE",
    "dateLimit": null
  }
}
```

---

### Consulta personalizada de tareas

```
GET /tasks/GetTasks
```

Parámetros opcionales (query params):

| Parámetro | Tipo | Descripción |
|---|---|---|
| `status` | string | Filtra por estado (ej: `PENDIENTE`) |
| `responsable` | string | ID del usuario responsable |
| `desde` | string | Fecha inicio `YYYY-MM-DD` |
| `hasta` | string | Fecha fin `YYYY-MM-DD` |

Ejemplos:

```
# Sin filtros — devuelve todas las tareas
GET /tasks/GetTasks

# Por estado
GET /tasks/GetTasks?status=PENDIENTE

# Por rango de fechas
GET /tasks/GetTasks?desde=2026-01-01&hasta=2026-06-01

# Todos los filtros
GET /tasks/GetTasks?status=PENDIENTE&responsable=123&desde=2026-01-01&hasta=2026-06-01
```

Respuesta exitosa:
```json
{
    "responseCode": "00",
    "reasonText": "FIND SUCCESS",
    "TaskCreate": null,
    "TaskList": [
        {
            "id": "6bcec465b3bb46b4a7d4c0dc7e781fef",
            "nameTask": "LAVAR ROPA",
            "description": "LAVAR ROPA DE TODA LA CASA",
            "priority": "PENDIENTE",
            "dateLimit": "2026-06-02T00:00:00.000Z"
        },
        {
            "id": "2296c487e9924ff5b141983013d06686",
            "nameTask": "LIMPIAR REFRI",
            "description": "LIMPIAR REFRI DE TODA LA CASA",
            "priority": "PENDIENTE",
            "dateLimit": "2026-06-15T00:00:00.000Z"
        }
    ]
}
```

---

## Códigos de respuesta

| Código | Descripción |
|---|---|
| `00` | Operación exitosa |
| `01` | Sin datos encontrados |
| `96` | Error interno — contactar soporte |

---

## Estructura del proyecto

```
src/
├── config/
│   ├── Db.ts                    # Conexión a SQL Server
│   ├── env.ts                   # Variables de entorno
│   └── server.ts                # Inicialización del servidor Express
├── controllers/
│   ├── task.controller.ts       # Manejo de req/res de tareas
│   └── user.controller.ts       # Manejo de req/res de usuarios
├── dtos/
│   ├── Task/
│   │   ├── task.profile.ts      # Perfil de mapeo de tareas
│   │   ├── task.req.dto.ts      # DTO de entrada de tareas
│   │   └── task.res.dto.ts      # DTO de salida de tareas
│   └── User/
│       ├── user.profile.ts      # Perfil de mapeo de usuarios
│       ├── user.req.dto.ts      # DTO de entrada de usuarios
│       └── user.res.dto.ts      # DTO de salida de usuarios
├── middlewares/                 # Middlewares globales (auth, errores, etc.)
├── models/
│   ├── task.model.ts            # Interfaces internas de tareas
│   └── user.model.ts            # Interfaces internas de usuarios
├── repositories/
│   ├── task.repository.ts       # Ejecución de SPs de tareas
│   └── user.repository.ts       # Ejecución de SPs de usuarios
├── routes/
│   ├── task.routes.ts           # Rutas de tareas
│   └── user.routes.ts           # Rutas de usuarios
├── services/
│   ├── task.service.ts          # Lógica de negocio de tareas
│   └── user.service.ts          # Lógica de negocio de usuarios
└── app.ts    
```
