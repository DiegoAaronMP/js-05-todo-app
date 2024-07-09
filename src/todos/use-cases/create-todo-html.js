

/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHTML = (todo) => {
    if (!todo) {
        throw new Error('Todo object is required');
    }

    const liElement = document.createElement('li');

    return liElement;
}