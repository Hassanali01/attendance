import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AsyncStorage } from "react-native";
import React, { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.stringify(AsyncStorage.getItem("user")) || null,
  error: false,
};
export const ContextValue = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    AsyncStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <ContextValue.Provider
      value={{
        user: state.user,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ContextValue.Provider>
  );
};
