import { signOut } from "firebase/auth";
import {
  signInWithGoogle,
  registerUserWithEmailPassword,
  loginWithEmailPassword,
  logoutFirebase,
} from "../../firebase/provider";
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
    if (!ok) return dispatch(logout({ errorMessage }));
    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await loginWithEmailPassword({ email, password });
    if (!result.ok) return dispatch(logout(result));
    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(logout());
  };
};
