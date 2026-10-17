import { Book } from "../../domain/models/book.model";
import { BookRepository } from "../../domain/repositories/book.repository";
import { BookDatasource } from "../datasources/book.datasource";

/**
 * Implementación concreta del repositorio de libros.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa como
 * un **adaptador (Repository Implementation)** entre:
 *
 * - El contrato del dominio {@link BookRepository}
 * - La fuente de datos {@link BookDatasource}
 *
 * Su responsabilidad es:
 * - Cumplir el contrato definido por el dominio
 * - Delegar la obtención de datos al datasource
 * - Adaptar o transformar los datos si fuese necesario
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No debe ser utilizada directamente por los casos de uso.
 *
 * Los casos de uso dependen únicamente del contrato
 * {@link BookRepository}, no de esta implementación.
 *
 * @see {@link BookRepository}
 * @see {@link BookDatasource}
 */
export class BookRepositoryImpl extends BookRepository {

  /**
   * Crea una nueva instancia del repositorio de libros.
   *
   * @param datasource - Fuente de datos utilizada para
   * obtener la información de libros
   */
  constructor(private datasource: BookDatasource) {
    super();
  }

  /**
   * Obtiene el listado de libros.
   *
   * @remarks
   * Implementa el método definido en
   * {@link BookRepository#getAll}.
   *
   * Este es el punto adecuado para:
   * - Transformar DTOs en modelos de dominio
   * - Aplicar reglas de adaptación
   * - Manejar errores o políticas de caché
   *
   * @param countBooks - Cantidad de libros a obtener
   * @returns Promesa que resuelve un arreglo de {@link Book}
   *
   * @example
   * ```ts
   * const repository = new BookRepositoryImpl(new BookDatasource());
   * const books = await repository.getAll(10);
   * ```
   */
  getAll(countBooks: number): Promise<Book[]> {
    return this.datasource.getAll(countBooks);
  }
}
