# Backend Node.js - Clean Architecture

API REST con Node.js, TypeScript y Express 5, implementada con Clean Architecture en capas Domain, Application e Infrastructure. Los datos se generan dinámicamente con @faker-js/faker (sin base de datos).

## Requisitos

- Node.js (compatible con TypeScript 5.9.3, express 5.2.1)
- npm

## Instalación y ejecución

- `npm install` – instala las dependencias
- `npm run start` – inicia el servidor con ts-node-dev (recarga automática)
- Servidor corriendo en `http://localhost:3000`

## Arquitectura

Árbol real de `src/`:

```
src
├── app.ts                    # Punto de entrada de la aplicación
├── application              # Capa de aplicación (casos de uso)
│   └── usecases             # Casos de uso del sistema
│       ├── get-all-courses.usecase.ts
│       ├── get-all-orders.usecase.ts
│       ├── get-all-products.usecase.ts
│       └── get-all-users.usecase.ts
├── domain                   # Capa de dominio (reglas de negocio, entidades, contratos)
│   ├── models               # Entidades/Modelos del dominio
│   │   ├── course.model.ts
│   │   ├── order.model.ts
│   │   ├── product.model.ts
│   │   └── user.model.ts
│   └── repositories         # Contratos (interfaces abstractas) de repositorios
│       ├── course.repository.ts
│       ├── order.repository.ts
│       ├── product.repository.ts
│       └── user.repository.ts
└── infrastructure           # Capa de infraestructura (adaptadores externos)
    ├── datasources          # Fuentes de datos simuladas
    │   ├── course.datasource.ts
    │   ├── order.datasource.ts
    │   ├── product.datasource.ts
    │   └── user.datasource.ts
    ├── repositories         # Implementaciones concretas de repositorios
    │   ├── course.repository.impl.ts
    │   ├── order.repository.impl.ts
    │   ├── product.repository.impl.ts
    │   └── user.repository.impl.ts
    └── web                  # Frameworks & Drivers (Express, rutas, controladores, config)
        ├── config           # Configuración (Swagger)
        ├── controllers      # Controladores HTTP (web layer)
        ├── erros            # Manejador de errores
        ├── interfaces       # Tipos/interfaces para web
        ├── routes           # Definición de rutas por módulo y centralización
        └── server.ts        # Configuración del servidor HTTP
```

- `domain/models`: Define las entidades/interfaces del dominio.
- `domain/repositories`: Define contratos abstractos (dependencias invertidas).
- `application/usecases`: Orquesta la lógica de aplicación, depende solo del dominio.
- `infrastructure/datasources`: Genera datos con faker (fuente de datos).
- `infrastructure/repositories`: Implementa contratos del dominio delegando al datasource.
- `infrastructure/web`: Controladores, rutas, Swagger, errores y servidor Express.
- `app.ts`: Inicializa la aplicación.

## Patrón de capas

- **Domain**: Modelos y contratos del repositorio. No posee dependencias externas. Define qué operaciones existen, no cómo se obtienen los datos.
- **Application**: Casos de uso. Orquestan la lógica de aplicación, dependen únicamente de abstracciones del dominio (repositorios). No conocen infraestructura (HTTP, DB, frameworks).
- **Infrastructure**: Datasources (generan datos con @faker-js/faker), implementaciones de repositorio (adaptadores), controladores HTTP, rutas, configuración de Swagger y manejo de errores. Es la capa más externa (Frameworks & Drivers).

**Flujo de una petición:**
`ruta (Routes) → controller → caso de uso (Application) → repositorio (contrato Domain) → repositorio impl (Infrastructure) → datasource (Infrastructure) → dominio → respuesta HTTP`

## Endpoints disponibles

| Módulo | Endpoint | Descripción |
|---|---|---|
| users | GET `/api/users/{countUsers}` | Retorna una lista de usuarios generados dinámicamente según la cantidad solicitada. |
| products | GET `/api/products/{countProducts}` | Retorna una lista de productos generados dinámicamente según la cantidad solicitada. |
| courses | GET `/api/courses/{countCourses}` | Retorna una lista de cursos generados dinámicamente según la cantidad solicitada. |
| orders | GET `/api/orders/{countOrders}` | Retorna una lista de pedidos generados dinámicamente según la cantidad solicitada. |

## Ejemplos de respuesta

**User**
```json
[{"id":1,"name":"Carlos","lastName":"Ramírez","age":22,"email":"carlos.ramirez@example.com","engineering":"Sistemas"}]
```

**Product**
```json
[{"id":1,"name":"Leche entera","category":"Lacteos","price":4500}]
```

**Course**
```json
[{"id":1,"name":"Bases de Datos","credits":3,"teacher":"Carlos Gómez","faculty":"Ingenieria"}]
```

**Order**
```json
[{"id":1,"customer":"Carlos Ramírez","total":125000,"createdAt":"2026-10-01T15:30:00Z","status":"Pendiente"}]
```

## Comportamiento de las respuestas

- Los endpoints responden con **status 201** tras ~3 segundos de espera simulada (patrón del taller). Verificado en cada controller: usan `setTimeout(..., 3000)` y `res.status(201).json(...)`.
- Los errores se delegan al manejador centralizado `HandleError.error(error, res)` (ubicado en `src/infrastructure/web/erros/handle.error.ts`).
- La documentación Swagger incluye respuestas `200` con el esquema correspondiente y `400: "Parámetro inválido"` en los bloques `@openapi` de las rutas.

## Documentación Swagger

- URL: `http://localhost:3000/api/docs`
- Generado con `swagger-jsdoc` y `swagger-ui-express` (dependencias en `package.json`). Los esquemas se definen en `src/infrastructure/web/config/swagger.schemas.ts` mediante comentarios `@openapi`, y las rutas documentadas con bloques `@openapi` en `src/infrastructure/web/routes/*.routes.ts`.

## Cómo agregar un módulo nuevo

1. **Modelo** (`src/domain/models/<modulo>.model.ts`): crear la interfaz con sus campos y tipos (TSDoc, @remarks, @example).
2. **Contrato del repositorio** (`src/domain/repositories/<modulo>.repository.ts`): crear clase abstracta con `abstract getAll(count<Modulo>: number): Promise<Modulo[]>` (TSDoc explicando capa Domain).
3. **Caso de uso** (`src/application/usecases/get-all-<modulos>.usecase.ts`): crear `GetAll<Modulos>UseCase` con constructor inyectando el repositorio, método `execute` delegando (TSDoc capa Application).
4. **Datasource con faker** (`src/infrastructure/datasources/<modulo>.datasource.ts`): generar datos simulados con `@faker-js/faker` (método `getAll` + privado `generate<Modulo>`).
5. **Implementación del repositorio** (`src/infrastructure/repositories/<modulo>.repository.impl.ts`): extender contrato, inyectar datasource, delegar `getAll`.
6. **Controller** (`src/infrastructure/web/controllers/<modulos>.controller.ts`): recibir caso de uso, leer `count<Modulo>` de `req.params`, `setTimeout(3000)`, responder `201` con resultado, capturar con `HandleError`.
7. **Schema Swagger** (`src/infrastructure/web/config/swagger.schemas.ts`): agregar bloque `@openapi` con schema `<Modulo>` y sus propiedades/required.
8. **Rutas con @openapi** (`src/infrastructure/web/routes/<modulos>.routes.ts`): crear `static get routes()` con composición datasource→repo→usecase→controller, documentar endpoint `GET /api/<modulo>s/{count<Modulo>}` con parámetros y respuestas, registrar `router.get`.
9. **Registro en rutas** (`src/infrastructure/web/routes/routes.ts`): importar `<Modulos>Routes` y agregar `router.use("/api/<modulo>s", <Modulos>Routes.routes)`.

## Integrantes

- David Mora Duque – **courses**
- Juan Diego Rodriguez – **orders**
- Juan Pablo Devia – **books** (módulo propio, se integra en su propia rama)