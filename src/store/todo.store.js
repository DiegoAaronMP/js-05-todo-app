import { Todo } from '../todos/models/todo.model';

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending',
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del realidad'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('InitStore 🥑');
}

const loadStore = () => {
    if (!localStorage.getItem('state')) {
        return;
    }

    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') );
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

/**
 * Obtener las tareas segun el filtro
 * @param {String} filter 
 */
const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done === true);
        case Filters.Pending:
            return state.todos.filter(todo => todo.done === false);
        default:
            throw new Error(`Option ${ filter } is not valid.`);
    }
}

/**
 * Crear tarea
 * @param {String} description Descripción de la tarea
 */
const addTodo = ( description = '' ) => {
    if (!description) {
        throw new Error('Description is required');
    }

    state.todos.push(new Todo(description));

    saveStateToLocalStorage();
}

/**
 * Cambiar estado de tarea
 * @param {String} todoId Identidicador único de la tarea
 */
const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToLocalStorage();
}

/**
 * Eliminar una tarea
 * @param {String} todoId Identidicador único de la tarea
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);

    saveStateToLocalStorage();
}

/**
 * Eliminar las tareas completadas
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);

    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;

    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}