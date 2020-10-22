import axios from 'axios'
import tokenService from './jwt'

const baseUrl = 'http://localhost:3003/api/messages'


const getAll = async (id) => {
  const token = window.localStorage.getItem('userToken')
  const config = { headers: { Authorization: token } };
  console.log('config: ', config)
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const create = async (newMessage) => {
  const token = window.localStorage.getItem('userToken')
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newMessage, config);

  return response.data;
}

const remove = async (id) => {
  const token = window.localStorage.getItem('userToken')
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};


export default { getAll, create, remove }