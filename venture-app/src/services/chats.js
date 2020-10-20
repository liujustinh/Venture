import axios from 'axios'
import tokenService from './jwt'

const baseUrl = 'http://localhost:3003/api/chats'

const token = window.localStorage.getItem('userToken')

const getAll = async () => {
    const config = { headers: { Authorization: token } };
    const response = await axios.get(baseUrl, config)
    //console.log('response: ', response.data)
    return response.data
}

const createChat = async (newChat) => {
    const config = { headers: { Authorization: token } };
    const response = await axios.post(baseUrl, newChat, config)
    return response.data
}

export default { getAll, createChat }