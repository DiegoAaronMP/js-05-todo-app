import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos(ElementIDs.TodoList, todos);
    }

    // cuando la funcion App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();
    })();

    // Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);

    // Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        // Si no ha presionado enter, se detiene
        if (event.keyCode !== 13) {
            return;
        }
        // Si esta vacio, no continua
        if (event.target.value.trim().length === 0) {
            return;
        }

        todoStore.addTodo( event.target.value.trim() );
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        const todoId = element.getAttribute('data-id');
        todoStore.toggleTodo( todoId );
        displayTodos();
    });
}