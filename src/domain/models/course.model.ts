/**
 * Interfaz que representa un curso.
 *
 * Contiene la información básica necesaria para mostrar un curso
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada curso debe tener un `id` único, un `name` descriptivo,
 * un número de `credits` y los datos del `teacher` y la `faculty` a la que pertenece.
 *
 * @example
 * ```ts
 * const curso: Course = {
 *   id: 1,
 *   name: 'Introducción a la Programación',
 *   credits: 3,
 *   teacher: 'Carlos Gómez',
 *   faculty: 'Ingenieria'
 * };
 * ```
 */
export interface Course {
    /** Identificador único del curso */
    id: number;

    /** Nombre o descripción del curso */
    name: string;

    /** Número de créditos académicos del curso */
    credits: number;

    /** Nombre del docente responsable del curso */
    teacher: string;

    /** Facultad a la que pertenece el curso */
    faculty: CourseFaculty;
}

/**
 * Tipo de facultad de curso.
 *
 * @remarks
 * Este tipo restringe las facultades a los valores predefinidos:
 * - 'Ingenieria'
 * - 'Ciencias'
 * - 'Administracion'
 * - 'Derecho'
 *
 * Se utiliza principalmente para validar la pertenencia del curso a una facultad conocida.
 *
 * @example
 * ```ts
 * const facultad: CourseFaculty = 'Ciencias';
 * ```
 */
export type CourseFaculty = 'Ingenieria' | 'Ciencias' | 'Administracion' | 'Derecho';