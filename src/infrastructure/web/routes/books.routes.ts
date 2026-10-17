import { Router } from "express";
import { BookDatasource } from "../../datasources/book.datasource";
import { BookRepositoryImpl } from "../../repositories/book.repository.impl";
import { GetAllBooksUseCase } from "../../../application/usecases/get-all-books.usecase";
import { BooksController } from "../controllers/books.controller";

export class BooksRoutes {
  static get routes(): Router {
    const router = Router();
    const repository = new BookRepositoryImpl(new BookDatasource());
    const getAllBooks = new GetAllBooksUseCase(repository);
    const controller = new BooksController(getAllBooks);

    /**
     * @openapi
     * /api/books/{countBooks}:
     *   get:
     *     summary: Obtener listado de libros
     *     description: Retorna una lista de libros generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Books
     *     parameters:
     *       - in: path
     *         name: countBooks
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de libros a generar
     *     responses:
     *       200:
     *         description: Lista de libros generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Book'
     *       400:
     *         description: Parámetro inválido
     * */
    router.get("/:countBooks", controller.getAllBooks);

    return router;
  }
}
