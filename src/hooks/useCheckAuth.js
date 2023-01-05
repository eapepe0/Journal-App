import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { logout, login } from "../store/auth";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    // es una funcion observable , siempre regresa una emision
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout()); // si no existe usuario mandamos a desloguear
      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
    });
  }, []);
  return {
    status,
  };
};
