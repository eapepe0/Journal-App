import { signOut } from "firebase/auth";
import {
  signInWithGoogle,
  registerUserWithEmailPassword,
  loginWithEmailPassword,
  logoutFirebase,
} from "../../firebase/provider";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, logout, login } from "./authSlice";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    // ponemos el state en checking
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    // ponemos el state en checking
    const result = await signInWithGoogle(); // se logueo?
    if (!result.ok) return dispatch(logout(result.errorMessage)); // si el resultado no es ok , hacemos le logout y salimos
    dispatch(login(result));
    // de lo contrario logueamos
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    // ponemos el state en checking
    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({
        email,
        password,
        displayName,
      });
    // cremos un usuario con Email
    if (!ok) return dispatch(logout({ errorMessage }));
    // si no devuelve el ok , es que hubo algun error , salimos
    dispatch(login({ uid, displayName, email, photoURL }));
    // de lo contrario nos logueamos
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    // verificamos las credenciales
    const result = await loginWithEmailPassword({ email, password });
    // nos logueamos con email y password
    if (!result.ok) return dispatch(logout(result));
    // si el resultado es falso , salimos
    dispatch(login(result));
    // si no los logueamos
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase(); // llamamos la funcion
    dispatch(clearNotesLogout()); // una vez que cerramos sesion , limpiamos el estado journal
    dispatch(logout()); // una vez que nos deslogueamos , limpiamos el estado auth
  };
};
