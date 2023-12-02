import { ChangeEvent, useState } from "react";
import { DictionaryStrBool, DictionaryStrStr } from "../types";

const useForm = (defaultValues = {}) => {
  const [values, setValues] = useState<DictionaryStrStr>(defaultValues);
  const [errorTexts, setErrorTexts] = useState<DictionaryStrStr>({});
  const [isErrors, setIsErrors] = useState<DictionaryStrBool>({});

  const handleChange = (evt: ChangeEvent) => {
    const { name, value, validity: { valid }, validationMessage } = evt.target as HTMLFormElement;
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