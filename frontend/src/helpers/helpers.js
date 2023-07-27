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
        pattern={ type === 'text' ? "^[a-zA-Z ]*$" : undefined }
      />
    </label>
  )
};
