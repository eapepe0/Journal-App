import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import {
  addNewEmptyNotes,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./JournalSlice";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    //uid del usuario
    console.log("start New Note");
    dispatch(savingNewNote()); // cambia el isSaving a true

    const { uid } = getState().auth; // obtenemos el uid del usuario

    // formato del newNote
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [], // agregamos esto por que si creamos una nueva nota , no toma el ImageGallery
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    // obtenemos un objeto donde creamos la coleccion (ruta donde se van a crear notas de FireBase)
    const resp = await setDoc(newDoc, newNote);
    // creamos el objeto en FireBase

    newNote.id = newDoc.id;
    //newNote creo un id , donde sera igual al id de newDoc

    // dispatch activar Nota
    dispatch(addNewEmptyNotes(newNote));
    // pusheamos el objeto newNote (objeto vacio , solo tiene un id , y una fecha) al estado note , ponemos isSaving en false
    dispatch(setActiveNote(newNote));
    //le decimos a activeNote que la nota activa sera newNote , esta nota estaremos visualizando , una nota vacia
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    // obtenemos el uid
    const notas = await loadNotes(uid);
    // devuelve las notas que tiene ese uid (usuario)
    dispatch(setNotes(notas));
    // ponemos en notas el payload que le enviamos
  };
};

export const startSaveNotes = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving()); // ejecutamos setSaving , estamos guardando , mensaje salvado = nada

    const { uid } = getState().auth; // solicitamos de authSlice el uid
    const { active: note } = getState().journal; // renombramos active como note , lo sacamos del JournalSlice

    const noteToFireStore = { ...note }; // hacemos una copia de note en noteToFireStore
    delete noteToFireStore.id; // le borramos el id del objeto

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`); // preparamos para guardar

    await setDoc(docRef, noteToFireStore, { merge: true }); // mezclamos lo que teniamos con lo que actualizamos

    dispatch(updateNote(note)); // llamamos a updateNote
  };
};

export const startUploadingFiles = (files = []) => {
  // recibimos los archivos
  return async (dispatch) => {
    dispatch(setSaving()); // avisamos que estamos guardando
    //await fileUpload(files); // llamamos para subir nuestro archivo con el await por que es una funcion asincrona
    const fileUploadPromises = []; // arreglo con las promesas que tenemos que disparar
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file)); // cremos un arreglo de promesas , no estamos disparando la funcion
    }
    const photosUrls = await Promise.all(fileUploadPromises); // cuando esto se resuelve tenemos una respuesta que almacenaremos en otro arreglo con sus resoluciones de promesas

    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeletingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth; // solicitamos de authSlice el uid
    const { active: note } = getState().journal; // renombramos active como note , lo sacamos del JournalSlice

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`); // preparamos para borrar
    await deleteDoc(docRef); // borramos de firebase

    dispatch(deleteNoteById(note.id)); // borramos de la nota activa y del arreglo de notas
  };
};
