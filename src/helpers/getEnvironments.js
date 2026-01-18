export const getEnvironments = () => {
  import.meta.env; // cargamos las variables de entorno
  return {
    ...import.meta.env, // las mostramos
  };
};
