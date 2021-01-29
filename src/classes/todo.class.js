/* **Classes**

** Todo **
Creo la clase tarea que:
 - Acepta el texto del usuario.
 - Le asignamos un id único que coincide con el número equivalente al momento de su creación.
 - Marcada por defecto como sin completar
 - Recogemos su fecha de creación

*/
export class Todo {
    constructor(tarea) {
        this.tarea = tarea;
        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
    }
}