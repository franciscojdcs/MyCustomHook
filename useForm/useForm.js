import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations={}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setformValidation] = useState({});

  useEffect(() => {
    createValidation();
  }, [formState])

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm])
  
  
  const isFormValid = useMemo(() => {
    for (const formfield of Object.keys( formValidation) ){
      if (formValidation[formfield] !== null ) return false;
    } 
    return true;

  }, [formValidation])

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  }

  const createValidation = () => {
    const formCheckedValues = {}
    for (const formfield of Object.keys( formValidations) ) {
      
      const [fn, errorMsg] = formValidations[formfield];
      formCheckedValues[`${formfield}Valid`] = fn( formState[ formfield ] ) ? null : errorMsg;
    }
    setformValidation( formCheckedValues );

  } 

  return {
    ...formState, // para desestructurar el objeto
    formState,
    onInputChange,
    onResetForm,
    isFormValid,
    ...formValidation,
    formValidation
  };
};