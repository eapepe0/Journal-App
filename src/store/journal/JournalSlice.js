import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal", // nombre del slice
  initialState: {
    // valores iniciales
    isSaving: false,
    messageSaved: "",
    notes: [],
    active: null,
  },
  reducers: {
    savingNewNote: (state, action) => {
      state.isSaving = true;
    },
    addNewEmptyNotes: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = "";
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateNote: (state, action) => {
      // payload es una nota
      state.isSaving = false; // no estamos guardando
      state.notes = state.notes.map((note) => {
        // por cada nota en notas
        if (note.id === action.payload.id) {
          // si el id de la nota es iugal
          return action.payload; // devolvemos el payload que seria la nota actualizada
        }
        return note; // o devolvemos la nota sin editar
      });
      state.messageSaved = `"${action.payload.title}" , actualizada correctamente.`;
    },
    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload]; // tomamos los valores viejos y le agregamos las fotos que enviamos
      state.isSaving = false; // habilitamos los botones
    },
    clearNotesLogout: (state, action) => {
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: (state, action) => {
      state.active = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload); // filtramos cada nota si es distinta al id que enviamos queda sino no
    },
  },
});

export const {
  addNewEmptyNotes,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  setPhotosToActiveNote,
  updateNote,
} = journalSlice.actions;

/**
|--------------------------------------------------
|  active : {
|       id : 'abc123',
|	    title : '',
| 		body : '',
| 		date : 1234567,
| 		imageUrls : ["https://foto1.jpg","https://foto2.jpg"]
|   }
| 
| 
|--------------------------------------------------
*/
