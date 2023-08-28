import { useState } from "react";

const useForm = (defaultValues = {}) => {
  const [values, setValues] = useState(defaultValues);
  const [errorTexts, setErrorTexts] = useState({});
  const [isErrors, setIsErrors] = useState({});

  const handleChange = (evt) => {
    const { name, value, validity: { valid }, validationMessage } = evt.target;
    setValues((state) =>({...state, [name]: value}));
    if (!valid) {
      setIsErrors((state) => ({...state, [name]: true}));
      setErrorTexts((state) => ({...state, [name]: validationMessage}));
    } else {
      setIsErrors((state) => ({...state, [name]: false}));
      setErrorTexts((state) => ({...state, [name]: ''}));
    }
  };

  const resetForm = () => {
    setValues(defaultValues);
    setErrorTexts({});
    setIsErrors({});
  };

  return { values, errorTexts, isErrors, handleChange, resetForm, setValues };
};

export default useForm;