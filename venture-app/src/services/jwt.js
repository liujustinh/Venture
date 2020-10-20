
let credentials = {
  username: null, 
  uid: null,
  token: null
}

const setToken = (newToken) => {
  if (newToken) {
    credentials.token = `bearer ${newToken}`
  }
}

const clearToken = () => {
    credentials.token = null
}

const getToken = () => {
    return credentials.token
}

const setUID = (newUID) => {
  if (newUID) {
    credentials.uid = newUID
  }
}

const clearUID = () => {
  credentials.uid = null
}

const getUID = () => {
  return credentials.uid
}

const setUsername = (newUser) => {
  if (newUser) {
    credentials.username = newUser
  }
}

const clearUsername = () => {
  credentials.username = null
}

const getUsername = () => {
  return credentials.username
}

const setCredentials = (username, uid, token) => {
  setUsername(username)
  setUID(uid)
  setToken(token)
}

const clearCredentials = () => {
  clearUsername()
  clearUID()
  clearToken()
}





export default { getToken, setToken, clearToken, setUID, 
  getUID, clearUID, setUsername, getUsername, setCredentials, clearCredentials }