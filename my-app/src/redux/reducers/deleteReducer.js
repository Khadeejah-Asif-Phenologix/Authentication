import {
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
  } from "../constants/actionTypes";
  
  const initialState = {
    loading: false,
    users: [],
    error: null,
  };
  
  export const deleteUserReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
        case DELETE_USER_SUCCESS:
          return {
            ...state,
            users: state.users.filter((user) => user.id !== action.payload),
            loading: false,
          };        
  
      case DELETE_USER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  