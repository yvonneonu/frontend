import React, { useContext } from "react";
import { SET_SESSION } from "../store/appSettingsStore";
import { StoreContext } from "../store/StoreContext";

const useSessionHook = () => {
  const { appStore } = useContext(StoreContext);

  const setSessionTrue = () => {
    appStore.dispatchApp({
      type: SET_SESSION,
      payload: true,
    });
  };
  const setSessionFalse = () => {
    appStore.dispatchApp({
      type: SET_SESSION,
      payload: false,
    });
  };
  return {
    setSessionTrue,
    setSessionFalse,
  };
};

export default useSessionHook;
