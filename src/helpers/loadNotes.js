import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async (uid) => {
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  // obtenemos la coleccion
  const docs = await getDocs(collectionRef);
  // obtenemos los documentos de esa coleccion
  const notes = [];
  // creamos un array vacio

  // recorremos los docs
  docs.forEach((doc) => {
    // por cada doc
    // le agregamos a notas (vacio) , un objeto con el id , y expandimos toda la data que contenga
    // esto por cada doc que haya
    notes.push({ id: doc.id, ...doc.data() });
  });
  console.log(notes);

  return notes;
  // devolvemos las notas
};
