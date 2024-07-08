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
 * Crear tarea
 * @param {String} description Descripción de la tarea
 */
const addTodo = ( description = '' ) => {
    throw new Error('Not implemented');
}

/**
 * Cambiar estado de tarea
 * @param {String} todoId Identidicador único de la tarea
 */
const toggleTodo = (todoId) => {
    throw new Error('Not implemented');
}

/**
 * Eliminar una tarea
 * @param {String} todoId Identidicador único de la tarea
 */
const deleteTodo = (todoId) => {
    throw new Error('Not implemented');
}

/**
 * Eliminar las tareas completadas
 */
const deleteCompleted = () => {
    throw new Error('Not implemented');
}


const setFilter = (newFilter = Filters.All) => {
    throw new Error('Not implemented');
}

const getCurrentFilter = () => {
    throw new Error('Not implemented');
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}