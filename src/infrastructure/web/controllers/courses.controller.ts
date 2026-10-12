import { Request, Response } from "express";
import { GetAllCoursesUseCase } from "../../../application/usecases/get-all-courses.usecase";
import { HandleError } from "../erros/handle.error";

/**
 * Controlador HTTP para operaciones relacionadas con cursos.
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
 * Depende del caso de uso {@link GetAllCoursesUseCase}.
 */
export class CoursesController {

  /**
   * Crea una nueva instancia del controlador de cursos.
   *
   * @param getAllCoursesUseCase - Caso de uso encargado
   * de obtener el listado de cursos
   */
  constructor(private getAllCoursesUseCase: GetAllCoursesUseCase) {}

  /**
   * Maneja la petición HTTP para obtener cursos.
   *
   * @remarks
   * Extrae el parámetro `countCourses` desde la URL,
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
  getAllCourses = (req: Request, res: Response): void => {
    const { countCourses } = req.params;

    setTimeout(() => {
      this.getAllCoursesUseCase
        .execute(Number(countCourses))
        .then((courses) => res.status(201).json(courses))
        .catch((error) => HandleError.error(error, res));
    }, 3000);
  };
}
