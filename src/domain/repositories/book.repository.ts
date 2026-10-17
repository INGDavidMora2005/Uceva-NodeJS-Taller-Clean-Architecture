import { Book } from "../models/book.model";

/**
 * Contrato del repositorio de libros.
 *
 * @remarks
 * Esta clase abstracta pertenece a la **capa de Domain**
 * y define el contrato que deben cumplir todas las
 * implementaciones de repositorios de libros.
 *
 * El dominio:
 * - NO conoce detalles de infraestructura
 * - NO sabe de bases de datos, APIs o frameworks
 *
 * Cualquier fuente de datos (API, base de datos, mocks,
 * archivos, etc.) puede ser utilizada siempre que
 * implemente este contrato.
 *
 * Los casos de uso dependen de esta abstracción,
 * no de implementaciones concretas.
 *
 * @see {@link Book}
 */
export abstract class BookRepository {
  /**
   * Obtiene un listado de libros.
   *
   * @remarks
   * Este método define una **operación de negocio**
   * relacionada con la obtención de libros,
   * sin especificar cómo ni desde dónde se obtienen.
   *
   * @param countBooks - Cantidad de libros a obtener
   * @returns Promesa que resuelve un arreglo de {@link Book}
   */
  abstract getAll(countBooks: number): Promise<Book[]>;
}
