import React, { useEffect, useReducer } from 'react'
import { todoReducer } from '../08-useReducer/TodoReducer';


const initialValue = [
    /* {
        id: new Date().getTime(),
        description: 'Recolectar piedra del alma',
        done: false
    } */
]

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}


const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, initialValue, init);

    useEffect(() => {
        // Salvar datos localmente
      localStorage.setItem('todos', JSON.stringify(todos));
    
    }, [todos])
    
    const handleNewTodo = (todo) => {
        const action = {
            type: 'Todo-Add',
            payload: todo
        }
        dispatch(action);
    }


    const handleRemove = (id) => {
        dispatch({
            type: 'Todo-Remove',
            payload: id
        });
    }

    const handleToggleTodo = (id) => {
        dispatch({
            type: 'Todo-Complete',
            payload: id
        });
    }


    return {
        todos,
        todoCounter: todos.length,
        todoCounterPending: todos.filter(t => !t.done).length,
        handleNewTodo,
        handleRemove,
        handleToggleTodo
    };
}

export default useTodos
