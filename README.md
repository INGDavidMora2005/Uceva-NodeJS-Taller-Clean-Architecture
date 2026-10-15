**Campos reales por modelo:**

- **User** (`src/domain/models/user.model.ts`): `id: number`, `name: string`, `lastName: string`, `age: number`, `email: string`, `engineering: 'Sistemas' | 'Electronica' | 'Biomedica' | 'Industrial' | 'Ambiental'`
- **Product** (`src/domain/models/product.model.ts`): `id: number`, `name: string`, `category: 'Lacteos' | 'Carnes' | 'Frutas' | 'Verduras'`, `price: number`
- **Course** (`src/domain/models/course.model.ts`): `id: number`, `name: string`, `credits: number`, `teacher: string`, `faculty: 'Ingenieria' | 'Ciencias' | 'Administracion' | 'Derecho'`
- **Order** (`src/domain/models/order.model.ts`): `id: number`, `customer: string`, `total: number`, `createdAt: string` (ISO 8601), `status: 'Pendiente' | 'Enviado' | 'Entregado' | 'Cancelado'`

## Integrantes

- David Mora Duque – **courses**, **orders**
- Juan Diego Rodriguez – **courses**, **orders**
- Juan Pablo Devia – **books** (según enunciado del taller). Módulos presentes en este repositorio: **users**, **products**, **courses**, **orders**.