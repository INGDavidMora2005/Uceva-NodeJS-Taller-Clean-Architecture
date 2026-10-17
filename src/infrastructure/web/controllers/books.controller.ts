import { Request, Response } from "express";
import { GetAllBooksUseCase } from "../../../application/usecases/get-all-books.usecase";
import { HandleError } from "../erros/handle.error";

/**
 * Controlador HTTP para operaciones relacionadas con libros.
 *
 * @remarks
 * Esta clase pertenece a la **capa más externa** de la aplicación
 * (*Frameworks & Drivers*), y su responsabilidad es:
 *
 * - Recibir solicitudes HTTP
 * - Extraer parámetros de la request
 * - Delegar la lógica al caso de uso correspondiente
 * - Transformar la respuesta del caso de uso en una respuesta HTTP
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No accede directamente a repositorios ni datasources.
 *
 * Depende del caso de uso {@link GetAllBooksUseCase}.
 */
export class BooksController {

  /**
   * Crea una nueva instancia del controlador de libros.
   *
   * @param getAllBooksUseCase - Caso de uso encargado
   * de obtener el listado de libros
   */
  constructor(private getAllBooksUseCase: GetAllBooksUseCase) {}

  /**
   * Maneja la petición HTTP para obtener libros.
   *
   * @remarks
   * Extrae el parámetro `countBooks` desde la URL,
   * ejecuta el caso de uso correspondiente y devuelve
   * la respuesta en formato JSON.
   *
   * Incluye un `setTimeout` únicamente con fines
   * demostrativos (simulación de latencia).
   *
   * Los errores son delegados al manejador centralizado
   * {@link HandleError}.
   *
   * @param req - Objeto Request de Express
   * @param res - Objeto Response de Express
   */
  getAllBooks = (req: Request, res: Response): void => {
    const { countBooks } = req.params;

    setTimeout(() => {
      this.getAllBooksUseCase
        .execute(Number(countBooks))
        .then((books) => res.status(201).json(books))
        .catch((error) => HandleError.error(error, res));
    }, 3000);
  };
}
