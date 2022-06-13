import { ActionsTypes } from "../constants/action-types";

export const setUser = (user) => {
  return {
    type: ActionsTypes.SET_USER,
    payload: user,
  };
};
