import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

export const registerNewUser = async (payload) => {
  try {
    const result = await api.post('/user/register', payload);
    return result;
  } catch (error) {
    return error.response
  }
}

export const login = async (payload) => {
  try {
    const result = await api.post('/user', payload);
    return result;
  } catch (error) {
    return error.response;
  }
}

export const getUserInfo = async (payload) => {
  try {
    const result = await api.get('/user', { headers: { Authorization: payload } });
    return result;
  } catch (error) {
    return error.response;
  }
}

  export const updateUserInfo = async (payload) => {
    try {
      const { token, content } = payload;
      const result = await api.put('/user/update', content, { headers: { Authorization: token } })
      return result;
    } catch (error) {
      return error.response;
    }
  }
