import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization : token },
    }
    //console.log('config', config)
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = async (id) => {
    const config = {
        headers: { Authorization : token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

const addComment = async (id, comment) => {
    const config = {
        headers: { Authorization : token },
    }
    const commentObject = { comment: comment }
    const response = await axios.post(`${baseUrl}/${id}/comments`, commentObject, config)
    return response.data
}

export default {
    getAll,
    create,
    update,
    setToken,
    remove,
    addComment
}