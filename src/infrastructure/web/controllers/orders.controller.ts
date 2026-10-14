import { Request, Response } from "express";
import { GetAllOrdersUseCase } from "../../../application/usecases/get-all-orders.usecase";
import { HandleError } from "../erros/handle.error";

/**
 * Controlador HTTP para operaciones relacionadas con pedidos.
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
 * Depende del caso de uso {@link GetAllOrdersUseCase}.
 */
export class OrdersController {

  /**
   * Crea una nueva instancia del controlador de pedidos.
   *
   * @param getAllOrdersUseCase - Caso de uso encargado
   * de obtener el listado de pedidos
   */
  constructor(private getAllOrdersUseCase: GetAllOrdersUseCase) {}

  /**
   * Maneja la petición HTTP para obtener pedidos.
   *
   * @remarks
   * Extrae el parámetro `countOrders` desde la URL,
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
  getAllOrders = (req: Request, res: Response): void => {
    const { countOrders } = req.params;

    setTimeout(() => {
      this.getAllOrdersUseCase
        .execute(Number(countOrders))
        .then((orders) => res.status(201).json(orders))
        .catch((error) => HandleError.error(error, res));
    }, 3000);
  };
}