import { collection, getDocs, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../../src/firebase/config";
import {
  addNewEmptyNotes,
  savingNewNote,
  setActiveNote,
  startNewNote,
} from "../../../../src/store/journal";

describe("Pruebas en el Journal thunks", () => {
  jest.setTimeout(10000); // si queremos que espere mas de 10 seg asi no da error la prueba , por defecto 5000ms
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("startNewNote debe crear una nota en blanco", async () => {
    const uid = "TEST-UID"; // seria el uid del usuario test

    getState.mockReturnValue({ auth: { uid } });

    await startNewNote()(dispatch, getState); // creamos una nueva nota

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNotes({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: expect.any(Array),
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: expect.any(Array),
      })
    );
    // borrar de firebase

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    // buscamos la coleccion
    const docs = await getDocs(collectionRef);
    // buscamos los documentos en esa coleccion
    const deletePromises = [];
    // creamos un array
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));
    // llenamos el array con promesas , que borran los documentos
    await Promise.all(deletePromises);
    // completamos las promesas
  });
});
