import { ActionsTypes } from "../constants/action-types";
const initialState = {
  user: [],
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
