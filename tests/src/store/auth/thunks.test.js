import {
  loginWithEmailPassword,
  logoutFirebase,
  signInWithGoogle,
} from "../../../../src/firebase/provider";
import { checkingCredentials, login, logout } from "../../../../src/store/auth";
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from "../../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../../src/store/journal";
import { demoUser } from "../../../fixtures/authFixtures";

jest.mock("../../../../src/firebase/provider");
//emulamos lo que hay respesto a Firebase

describe("Pruebas en authThunks", () => {
  const dispatch = jest.fn(); // emulamos la funcion dispatch

  beforeEach(() => jest.clearAllMocks()); // antes de arrancar los test limpiamos todo

  test("debe de invocar el checkingCredentials", async () => {
    await checkingAuthentication()(dispatch); // primer () es el llamdo de la funcion el 2do () es el valor de retorno
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    // esperamos que dispatch sea llamado con la funcion que lanza el dispatch
  });

  test("startGoogleSignIn debe de llamar checkingCredentials y Login - Exito", async () => {
    const loginData = {
      ok: true,
      ...demoUser,
    };
    await signInWithGoogle.mockResolvedValue(loginData); // esta funcion de firebase es un mock de jest

    //startGoogleSignIn es del thunk
    await startGoogleSignIn()(dispatch); //2do () es el callback

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials()); // primera vez que llama a la funcion de GoogleSignIn , se fija las credenciales
    expect(dispatch).toHaveBeenCalledWith(login(loginData)); // si es correcto lo anterior llama al login con los datos que tiene loginData
  });

  test("startGoogleSignIn debe de llamar checkingCredentials y Logout - Error", async () => {
    const loginData = {
      ok: false,
      errorMessage: "Un Error de google",
    };
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("startLoginWithEmailPassword debe llamar checkingCredentials y Login - Exito", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: "123456" };

    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startLogout debed de llamar logoutFirebase , clearNotes y logout", async () => {
    await startLogout()(dispatch);
    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
