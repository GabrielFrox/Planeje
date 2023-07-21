export const inputField = (isRequired = false ,type, name, id, handler) => {
  return (
    <label htmlFor={ id }>
      { id }
      <input
        required={ isRequired }
        id={ id }
        type={ type }
        name={ name }
        onChange={ handler }
      />
    </label>
  )
};
