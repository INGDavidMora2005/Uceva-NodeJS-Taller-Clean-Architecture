import { faker } from '@faker-js/faker';
import { Course, CourseFaculty } from "../../domain/models/course.model";

/**
 * Datasource encargado de generar cursos simulados.
 *
 * @remarks
 * Esta clase pertenece a la **capa de Infrastructure** y actúa como
 * una **fuente de datos (Datasource)**.
 *
 * Utiliza la librería {@link https://www.npmjs.com/package/@faker-js/faker | faker}
 * para generar información falsa de cursos.
 *
 * ❗ No contiene lógica de negocio.
 * ❗ No implementa repositorios del dominio.
 *
 * Es consumida por `CourseRepositoryImpl`, que se encarga
 * de adaptar los datos al dominio y exponerlos mediante
 * el contrato `CourseRepository`.
 */
export class CourseDatasource {

    /**
     * Facultades disponibles para los cursos simulados.
     *
     * @remarks
     * Se utiliza para asignar una facultad aleatoria
     * a cada curso generado.
     */
    private faculties: CourseFaculty[] = [
        'Ingenieria',
        'Ciencias',
        'Administracion',
        'Derecho'
    ];

    /**
     * Nombres de cursos simulados (12 asignaturas coherentes).
     *
     * @remarks
     * Se utilizan para asignar un nombre de asignatura real
     * a cada curso generado.
     */
    private courseNames: string[] = [
        'Programación Orientada a Objetos',
        'Bases de Datos',
        'Cálculo Diferencial',
        'Estructuras de Datos',
        'Redes de Computadores',
        'Arquitectura de Software',
        'Álgebra Lineal',
        'Física Mecánica',
        'Contabilidad Básica',
        'Derecho Constitucional',
        'Estadística',
        'Ingeniería de Requisitos'
    ];

    /**
     * Obtiene una lista de cursos simulados.
     *
     * @remarks
     * Genera dinámicamente una cantidad determinada de cursos
     * utilizando datos aleatorios.
     *
     * @param countCourses - Cantidad de cursos a generar
     * @returns Promesa que resuelve un arreglo de {@link Course}
     *
     * @example
     * ```ts
     * const datasource = new CourseDatasource();
     * const courses = await datasource.getAll(10);
     * ```
     */
    async getAll(countCourses: number): Promise<Course[]> {
        const courses: Promise<Course>[] = [];

        for (let i = 1; i <= countCourses; i++) {
            courses.push(this.generateCourse(i));
        }

        return Promise.all(courses);
    }

    /**
     * Genera un curso individual con datos simulados.
     *
     * @remarks
     * Este método es interno y no debe ser utilizado
     * fuera del datasource.
     *
     * @param id - Identificador único del curso
     * @returns Promesa que resuelve un {@link Course}
     */
    private generateCourse(id: number): Promise<Course> {
        return Promise.resolve({
            id,
            name: faker.helpers.arrayElement(this.courseNames),
            credits: faker.number.int({ min: 1, max: 6 }),
            teacher: faker.person.fullName(),
            faculty: faker.helpers.arrayElement(this.faculties),
        });
    }
}
