/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       description: Representa un usuario del sistema
 *       required:
 *         - id
 *         - name
 *         - lastName
 *         - age
 *         - email
 *         - engineering
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: Carlos
 *         lastName:
 *           type: string
 *           example: Ramírez
 *         age:
 *           type: number
 *           example: 22
 *         email:
 *           type: string
 *           format: email
 *           example: carlos.ramirez@example.com
 *         engineering:
 *           type: string
 *           enum:
 *             - Sistemas
 *             - Electronica
 *             - Biomedica
 *             - Industrial
 *             - Ambiental
 *           example: Sistemas
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       description: Representa un producto del sistema
 *       required:
 *         - id
 *         - name
 *         - category
 *         - price
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: Leche entera
 *         category:
 *           type: string
 *           enum:
 *             - Lacteos
 *             - Carnes
 *             - Frutas
 *             - Verduras
 *           example: Lacteos
 *         price:
 *           type: number
 *           example: 4500
 */
/**
 * @openapi
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       description: Representa un curso del sistema
 *       required:
 *         - id
 *         - name
 *         - credits
 *         - teacher
 *         - faculty
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: Bases de Datos
 *         credits:
 *           type: number
 *           example: 3
 *         teacher:
 *           type: string
 *           example: Carlos Gómez
 *         faculty:
 *           type: string
 *           enum:
 *             - Ingenieria
 *             - Ciencias
 *             - Administracion
 *             - Derecho
 *           example: Ingenieria
 * */

/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       description: Representa un pedido del sistema
 *       required:
 *         - id
 *         - customer
 *         - total
 *         - createdAt
 *         - status
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         customer:
 *           type: string
 *           example: Carlos Ramírez
 *         total:
 *           type: number
 *           example: 125000
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-10-01T15:30:00Z"
 *         status:
 *           type: string
 *           enum:
 *             - Pendiente
 *             - Enviado
 *             - Entregado
 *             - Cancelado
 *           example: Pendiente
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       description: Representa un libro del sistema
 *       required:
 *         - id
 *         - title
 *         - author
 *         - year
 *         - genre
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Cien años de soledad
 *         author:
 *           type: string
 *           example: Gabriel García Márquez
 *         year:
 *           type: integer
 *           example: 1967
 *         genre:
 *           type: string
 *           enum:
 *             - Novela
 *             - Ciencia
 *             - Historia
 *             - Tecnologia
 *           example: Novela
 */
export {};