import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/messages'

let token = null

const setToken = (newToken) => {
  if (newToken) {
    token = `bearer ${newToken}`
  }
  else {
    token = null
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newMessage) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newMessage, config);

  return response.data;
}

const remove = async (id) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};


export default { getAll, setToken, create, remove }