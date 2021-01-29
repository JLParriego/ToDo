/* **imports**

+ Creamos index.js en la carpeta classes para agrupar todas las clases que vayamos
+ Al llamar index.js al fichero cuando importamos aquí podemos poner simplemente from ./classes y js buscará por defecto el fichero index.


*/

/* **Const y let **
+ Creamos una nueva tarea: tarea
+ Creamos una nueva lista de tareas: todoList
+ Guardamos una nueva tarea en el array vacio de la lista de tareas con la fx: nuevoTodo(tarea)
*/

import './styles.css'
import { Todo, TodoList } from './classes'
import { crearTodoHtml } from './js/componentes.js'



export const todoList = new TodoList();

todoList.todos.forEach(todo => crearTodoHtml(todo));