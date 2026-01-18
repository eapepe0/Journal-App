export const initialState = {
  // valores iniciales
  status: "checking", // checking // not-authenticated  // authenticated
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState = {
  // valores iniciales
  status: "authenticated", // checking // not-authenticated  // authenticated
  uid: "123ABC",
  email: "a@a.com",
  displayName: "Demo User",
  photoURL: "demo.jpg",
  errorMessage: null,
};

export const notAuthenticatedState = {
  // valores iniciales
  status: "not-authenticated", // checking // not-authenticated  // authenticated
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const demoUser = {
  uid: "ABC123",
  email: "demo@google.com",
  displayName: "Demo User",
  photoURL: "http://demo.jpg",
  errorMessage: null,
};
