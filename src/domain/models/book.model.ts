/**
 * Interfaz que representa un libro.
 *
 * Contiene la información básica necesaria para mostrar un libro
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada libro debe tener un `id` único, un `title` descriptivo,
 * el nombre de su `author`, el `year` de publicación y el `genre` al que pertenece.
 *
 * @example
 * ```ts
 * const libro: Book = {
 *   id: 1,
 *   title: 'Cien años de soledad',
 *   author: 'Gabriel García Márquez',
 *   year: 1967,
 *   genre: 'Novela'
 * };
 * ```
 */
export interface Book {
    /** Identificador único del libro */
    id: number;

    /** Título del libro */
    title: string;

    /** Nombre del autor del libro */
    author: string;

    /** Año de publicación del libro */
    year: number;

    /** Género literario al que pertenece el libro */
    genre: BookGenre;
}

/**
 * Tipo de género de libro.
 *
 * @remarks
 * Este tipo restringe los géneros a los valores predefinidos:
 * - 'Novela'
 * - 'Ciencia'
 * - 'Historia'
 * - 'Tecnologia'
 *
 * Se utiliza principalmente para validar la pertenencia del libro a un género conocido.
 *
 * @example
 * ```ts
 * const genero: BookGenre = 'Novela';
 * ```
 */
export type BookGenre = 'Novela' | 'Ciencia' | 'Historia' | 'Tecnologia';
