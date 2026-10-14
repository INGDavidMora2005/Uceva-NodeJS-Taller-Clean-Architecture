import { faker } from '@faker-js/faker';
import { Order, OrderStatus } from "../../domain/models/order.model";

/**
 * Datasource encargado de generar pedidos simulados.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa como
 * una **fuente de datos (Datasource)**.
 *
 * Utiliza la librería {@link https://www.npmjs.com/package/@faker-js/faker | faker}
 * para generar información falsa de pedidos.
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No implementa repositorios del dominio.
 *
 * Es consumida por `OrderRepositoryImpl`, que se encarga
 * de adaptar los datos al dominio y exponerlos mediante
 * el contrato `OrderRepository`.
 */
export class OrderDatasource {

    /**
     * Estados disponibles para los pedidos simulados.
     *
     * @remarks
     * Se utiliza para asignar un estado aleatorio
     * a cada pedido generado.
     */
    private statuses: OrderStatus[] = [
        'Pendiente',
        'Enviado',
        'Entregado',
        'Cancelado'
    ];

    /**
     * Obtiene una lista de pedidos simulados.
     *
     * @remarks
     * Genera dinámicamente una cantidad determinada de pedidos
     * utilizando datos aleatorios.
     *
     * @param countOrders - Cantidad de pedidos a generar
     * @returns Promesa que resuelve un arreglo de {@link Order}
     *
     * @example
     * ```ts
     * const datasource = new OrderDatasource();
     * const orders = await datasource.getAll(10);
     * ```
     */
    async getAll(countOrders: number): Promise<Order[]> {
        const orders: Promise<Order>[] = [];

        for (let i = 1; i <= countOrders; i++) {
            orders.push(this.generateOrder(i));
        }

        return Promise.all(orders);
    }

    /**
     * Genera un pedido individual con datos simulados.
     *
     * @remarks
     * Este método es interno y no debe ser utilizado
     * fuera del datasource.
     *
     * @param id - Identificador único del pedido
     * @returns Promesa que resuelve un {@link Order}
     */
    private generateOrder(id: number): Promise<Order> {
        return Promise.resolve({
            id,
            customer: faker.person.fullName(),
            total: faker.number.int({ min: 10000, max: 500000 }),
            createdAt: faker.date.recent({ days: 30 }).toISOString(),
            status: faker.helpers.arrayElement(this.statuses),
        });
    }
}