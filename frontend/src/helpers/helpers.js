import { getUserInfo } from '../services/axios';

export const inputField = (type, name, id, placeholder, handler) => {
  return (
    <label htmlFor={ id }>
      { id }
      <input
        required={ true }
        placeholder={ placeholder }
        id={ id }
        type={ type }
        name={ name }
        onChange={ handler }
        pattern={ type === 'text' ? "[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$" : undefined }
      />
    </label>
  )
};

export const getUserData = async (prevState, setState, errorHandler) => {
  const token = localStorage.getItem('token');
  if (!token) {
    errorHandler('Token não encontrado, faça login novamente');
  }

  // Token validation
  (async function (token) {
    const userInfo = await getUserInfo(token);
    if (userInfo.status === 401) {
      errorHandler('Token inválido, faça login novamente');
    }

    setState({...prevState, userData: userInfo.data});
  })(token)
};
