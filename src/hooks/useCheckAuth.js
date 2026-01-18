import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { logout, login } from "../store/auth";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  // sacamos el status del authSlice
  const dispatch = useDispatch();

  useEffect(() => {
    // es una funcion observable , siempre regresa una emision
    onAuthStateChanged(FirebaseAuth, async (user) => {
      // cada ves que cambia el estado de autenticacion de firebase
      if (!user) return dispatch(logout()); // si no existe usuario mandamos a desloguear
      const { uid, email, displayName, photoURL } = user;
      // extraemos los datos del user
      dispatch(login({ uid, email, displayName, photoURL }));
      // llamos a login con estos datos
      dispatch(startLoadingNotes());
      // empezamos a cargar las notas
    });
  }, []);
  return {
    status, //devolvemos el estado de autenticacion
  };
};
