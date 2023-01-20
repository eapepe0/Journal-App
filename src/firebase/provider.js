import { async } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // sale el popup para loguearnos
    const { displayName, email, photoURL, uid } = result.user;
    // si es correcto extraemos de user , estos datos displayName...
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
    // devolvemos los datos obtenidos
  } catch (error) {
    // si no nos pudimos loguear
    const errorMessage = error.message;
    // sacamos el mensaje de error
    return {
      ok: false,
      errorMessage,
    };
    // devolvemos los datos obtenidos
  }
};

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  // probamos en registrarnos
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    // si lo enviado es correcto
    const { uid, photoURL } = resp.user;
    // extraemos el uid y la foto desde el user

    await updateProfile(FirebaseAuth.currentUser, { displayName });
    // le pasamos el displayName a Firebase

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const loginWithEmailPassword = async ({ email, password }) => {
  // nos vamos a logear con email y password necesitamos el email y el password
  try {
    const userCredential = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    // nos logueamos a firebase
    console.log("Logueo satisfactorio");
    const { uid, photoURL, displayName } = userCredential.user;
    // extraemos de la credencial usuario el uid , la photoURL , y el displayName
    return {
      ok: true,
      uid,
      photoURL,
      displayName,
    };
    // devolvemos un objeto con lo obtenido
  } catch (error) {
    // si hay un error por que no se pudo crear el userCredential
    return {
      ok: false,
      errorMessage: error.message,
    };
    // devolvemos el ok en falso y el mensaje de error
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut(); // llamaos la funcion de FireBase para que nos deslogue
};
