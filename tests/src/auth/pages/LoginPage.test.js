import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../../src/auth/pages/LoginPage";
import { authSlice, startGoogleSignIn } from "../../../../src/store/auth";
import { notAuthenticatedState } from "../../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock("../../../../src/store/auth/thunks", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password });
  },
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"), // creamos un mock  de todo react-redux excepto useDispatch
  useDispatch: () => (fn) => fn(), // cuando alguien llama useDispatch el valor que regresa ,es una funcion que regresa el llamado de esa funcion
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe("Pruebas en <LoginPage/>", () => {
  beforeEach(() => jest.clearAllMocks());
  test("debe de mostrar el componente correctamente", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });

  test("El boton Google debe llamar al StartGoogleSignIn", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    const googleBtn = screen.getByLabelText("google-btn");
    // al hacer click en el boton esta deshabilitado , por que el estado inicial es checking , deberiamos poner el estado en not-authenticated
    // si ponemos en auth el notAuthenticatedState , se habilitara el boton
    // y al clickearlo podremos ver en consola
    // On GoogleSignIn
    fireEvent.click(googleBtn);
    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test("submit de de llamar startLoginWithEmailPassword", () => {
    const email = "demo@demo.com";
    const password = "123456";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByPlaceholderText(/correo@google.com/i); // agarramos el campo del email , basandonos en el placeholder
    const passwordField = screen.getByPlaceholderText(/contraseña/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailField, { target: { name: "email", value: email } });
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    });
    fireEvent.click(loginButton);
  });
});
