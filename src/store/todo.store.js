import { Todo } from '../todos/models/todo.model';

const Filters = {
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
    console.log(state);
    console.log('InitStore 🥑');
}

const loadStore = () => {
    throw new Error('Not implemented');
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
}

/**
 * Eliminar una tarea
 * @param {String} todoId Identidicador único de la tarea
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
}

/**
 * Eliminar las tareas completadas
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => todo.done);
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
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