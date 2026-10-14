import { Order } from "../../domain/models/order.model";
import { OrderRepository } from "../../domain/repositories/order.repository";

/**
 * Caso de uso para obtener un listado de pedidos.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Application**
 * y representa una **regla de negocio de la aplicación**.
 *
 * Su responsabilidad es:
 * - Orquestar la obtención de pedidos
 * - Coordinar la interacción con el repositorio
 *
 * ❗ No conoce detalles de infraestructura.
 * ❗ No depende de implementaciones concretas.
 *
 * Depende únicamente del contrato
 * {@link OrderRepository} definido en el dominio.
 *
 * @see {@link OrderRepository}
 * @see {@link Order}
 */
export class GetAllOrdersUseCase {

  /**
   * Crea una nueva instancia del caso de uso.
   *
   * @param orderRepository - Repositorio de pedidos
   * utilizado para acceder a los datos
   */
  constructor(private orderRepository: OrderRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @remarks
   * Obtiene una cantidad determinada de pedidos
   * delegando el acceso a datos al repositorio.
   *
   * Aquí se pueden agregar:
   * - Validaciones de entrada
   * - Reglas de negocio simples
   * - Orquestación de múltiples repositorios
   *
   * @param countOrders - Cantidad de pedidos a obtener
   * @returns Promesa que resuelve un arreglo de {@link Order}
   *
   * @example
   * ```ts
   * const useCase = new GetAllOrdersUseCase(orderRepository);
   * const orders = await useCase.execute(10);
   * ```
   */
  execute(countOrders: number): Promise<Order[]> {
    return this.orderRepository.getAll(countOrders);
  }
}