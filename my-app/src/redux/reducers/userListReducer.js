import {
    FETCH_USER_LIST_REQUEST,
    FETCH_USER_LIST_SUCCESS,
    FETCH_USER_LIST_FAIL,
  } from "../constants/actionTypes";
  
  const initialState = {
    loading: false,
    users: [],
    error: null,
  };
  
  export const userListReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_LIST_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case FETCH_USER_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          users: action.payload,
        };
  
      case FETCH_USER_LIST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  