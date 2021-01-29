/* **Métodos

** eliminarTodo(id) **
+ Aplicamos un filter al array todos dejando todas las tareas - todos salvo la que tenga el mismo id que el de entrada.
 
** guardarLocalStorage() **
+ Guardamos como json nuestro this.todos con la key todo
+ lo asignamos en nuevoTodo, eliminarTodo, marcarCompletado, eliminarCompletados

** cargarLocalStorage() **
+ si Tenemos todos guardados los asignamos a this.todos
+ en caso contrario devolvemos un array vacio
+ lo asignamos al constructor

*/

export class TodoList {
    constructor() {
        this.todo = [];
        this.cargarLocalStorage();
    }
    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }
    eliminarTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id != id);
        this.guardarLocalStorage();
    }
    marcarCompletado(id) {
        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }
    eliminarCompletados() {
        this.todos = this.todos.fill((todo) => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        localStorage.setItem("todo", JSON.stringify(this.todos));
    }

    cargarLocalStorage() {
        this.todos = localStorage.getItem("todo") ?
            JSON.parse(localStorage.getItem("todo")) : [];
    }
}