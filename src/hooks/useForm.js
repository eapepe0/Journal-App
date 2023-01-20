import { useState, useEffect, useMemo } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm); // estado y funcion valores iniciales que le podemos dar
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm); // cada vez que cambia el initialForm , se vuelve a crear el formulario
  }, [initialForm]); // es util si tenemos que cambiar un form

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    // funcion que al tener un cambio el input se dispara
    const { name, value } = target; // desestructuramos el nombre y el valor del input que es llamado
    setFormState({
      // hacemos spread de lo ya ingresado
      ...formState,
      [name]: value, // modifica la del name se llama
    });
  };

  const onResetForm = () => {
    setFormState(initialForm); // seteamos el formState con el valor inicial
  };

  const createValidators = () => {
    const formCheckedValues = {};
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = "Este campo es requerido"] =
        formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }
    setFormValidation(formCheckedValues);
  };
  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    isFormValid,
    ...formValidation,
  };
};

/**
 * Este hook devuelve el objeto cambiado , la constante state ,
 * la funcion que cambia los valores y
 * la funcion que resetea el formulario
 */
