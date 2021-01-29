import { Todo } from "../classes";
import { todoList } from "../index";

/* **Referencias en el HTML**
** crearTodoHtml **
+ Si todo.completado = true añadimos la clase completed
+ Hacemos lo mismo con la clase checked
+ Añadimos la tarea en el lugar que le corresponde
+ Añadimos el resultado al DOM
 */
/* **Eventos**

**txtInput**
+ Capturamos la entrada del usuario en pantalla
+ Añadimos esta entrada - tarea a la lista de tareas que hemos importado desde el index
+ Añadimos la tarea a la web

**divTodoList**
+ Capturamos el click del usuario en una tarea
+ Este puede ser en el localName: label o input o button
+ TodoElemento recoje el li de la tarea
+ TodoId recoje el id de el li TodoElemento
+ Si el usuario pulsa el tick de input marcamos la tarea como completada y cambiamos la clase para tachar ese li

+Cuando detectamos input marcamos como completado
+Cuando detectamos button eliminamos todo - tareas uno a uno

**btnBorrar**
+Al pulsar borrar completado borramos los elementos de la lista
+Borramos los elementos de la web

**ulFiltros**
+Mostramos u ocultamos elementos aplicando la clase hidden o quitándola

*/

const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filtro");

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${todo.completado ? "completed" : ""}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${
              todo.completado ? "checked" : ""
            }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement("div");
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
};

txtInput.addEventListener("keyup", (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = "";
    }
});

divTodoList.addEventListener("click", (event) => {
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute("data-id");
    if (nombreElemento.includes("input")) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle("completed");
    } else if (nombreElemento.includes("button")) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
});

btnBorrar.addEventListener("click", () => {
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains("completed")) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener("click", (event) => {
    const filtro = event.target.text;
    if (!filtro) {
        return;
    }

    anchorFiltros.forEach((elem) => elem.classList.remove("selected"));
    event.target.classList.add("selected");

    for (const elemento of divTodoList.children) {
        elemento.classList.remove("hidden");
        const completado = elemento.classList.contains("completed");

        switch (filtro) {
            case "Pendientes":
                if (completado) {
                    elemento.classList.add("hidden");
                }
                break;
            case "Completados":
                if (!completado) {
                    elemento.classList.add("hidden");
                }
                break;
        }
    }
});