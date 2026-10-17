import { Book } from "../../domain/models/book.model";
import { BookRepository } from "../../domain/repositories/book.repository";

/**
 * Caso de uso para obtener un listado de libros.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Application**
 * y representa una **regla de negocio de la aplicación**.
 *
 * Su responsabilidad es:
 * - Orquestar la obtención de libros
 * - Coordinar la interacción con el repositorio
 *
 * ❗ No conoce detalles de infraestructura.
 * ❗ No depende de implementaciones concretas.
 *
 * Depende únicamente del contrato
 * {@link BookRepository} definido en el dominio.
 *
 * @see {@link BookRepository}
 * @see {@link Book}
 */
export class GetAllBooksUseCase {

  /**
   * Crea una nueva instancia del caso de uso.
   *
   * @param bookRepository - Repositorio de libros
   * utilizado para acceder a los datos
   */
  constructor(private bookRepository: BookRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @remarks
   * Obtiene una cantidad determinada de libros
   * delegando el acceso a datos al repositorio.
   *
   * Aquí se pueden agregar:
   * - Validaciones de entrada
   * - Reglas de negocio simples
   * - Orquestación de múltiples repositorios
   *
   * @param countBooks - Cantidad de libros a obtener
   * @returns Promesa que resuelve un arreglo de {@link Book}
   *
   * @example
   * ```ts
   * const useCase = new GetAllBooksUseCase(bookRepository);
   * const books = await useCase.execute(10);
   * ```
   */
  execute(countBooks: number): Promise<Book[]> {
    return this.bookRepository.getAll(countBooks);
  }
}
