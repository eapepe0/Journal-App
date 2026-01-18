import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from "../../../../src/store/auth/authSlice";
import {
  authenticatedState,
  demoUser,
  initialState,
} from "../../../fixtures/authFixtures";

describe("Pruebas en el authSlice", () => {
  test("debe de regresar el estado iniciar y llamarse auth", () => {
    expect(authSlice.name).toBe("auth"); // el nombre de nuestro estado sea 'auth

    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState); // estado es igual al estado inicial que definimos en el archivo 'authFixtures'
  });

  test("debe de realizar la autenticacion", () => {
    const state = authSlice.reducer(initialState, login(demoUser));

    // esperamos que sea igual al estado , pero cambia el status a authenticated
    expect(state).toEqual({
      status: "authenticated",
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test("debe de realizar el logout sin argumentos", () => {
    const state = authSlice.reducer(initialState, logout());

    // esperamos que sea igual al estado , pero cambia el status a
    // not-authenticated y pone todo un null (borra todo)
    // pero al enviarlo sin payload no muestra un mensaje de error

    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined,
    });
  });

  test("debe de realizar el logout y mostrar un mensaje de error", () => {
    const errorMessage = "Credenciales incorrectas";
    const state = authSlice.reducer(initialState, logout({ errorMessage }));

    // esperamos que sea igual al estado , pero cambia el status a
    // not-authenticated y pone todo un null (borra todo) , nos muestra un mensaje de error
    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage,
    });
  });

  test("debe cambiar el estado a checking", () => {
    const state = authSlice.reducer(initialState, checkingCredentials());

    expect(state.status).toBe("checking");
  });
});
