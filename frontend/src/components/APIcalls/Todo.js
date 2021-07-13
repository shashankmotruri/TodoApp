import {API_URL} from './backend'
import axios from 'axios'

export const GetAllTodos = (userId) => {
    return fetch(`${API_URL}/api/todo/getAllTodos/${userId}`, {
        method:"GET",
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const GetTodoById = (userId,todoId) => {
    return fetch(`${API_URL}/api/todo/getTodo/${userId}/${todoId}`, {
        method:"GET",
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}