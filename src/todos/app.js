import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderPending, renderTodos } from './use-cases';

const ElementIDs = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    PendingCountLabel: '#pending-count',
    TodoFilters: '.filtro',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(ElementIDs.PendingCountLabel);
    }

    // cuando la funcion App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();
    })();

    // Referencias HTML
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
    const filtersLI = document.querySelectorAll(ElementIDs.TodoFilters);
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

    // Marcar un todo como completado
    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        const todoId = element.getAttribute('data-id');
        todoStore.toggleTodo( todoId );
        displayTodos();
    });

    // Eliminar un todo al dar clic al boton X
    todoListUL.addEventListener('click', (event) => {
        // Si el boton tiene la clase destroy
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if (!element || !isDestroyElement) {
            return;
        }
        const todoId = element.getAttribute('data-id');
        todoStore.deleteTodo(todoId);
        displayTodos();

        return;
    });

    // Eliminar completados
    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLI.forEach(element => {
        element.addEventListener('click', (element) => {
            // Eliminados la clase selected en todos los li
            filtersLI.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
                default:
                    break;
            }

            displayTodos();
        });
    })
 
}