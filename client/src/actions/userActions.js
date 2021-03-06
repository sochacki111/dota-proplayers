import axios from '../axios-base';
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT
} from '../constants/userConstants';

export const register = (email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post('/user/new', {
      email,
      password
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    // dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    // TODO Add to middleware ir userReducers
    localStorage.setItem('userInfo', JSON.stringify(data)); // Add to middleware or rather userReducers
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.errors
          ? err.response.data.errors
          : err.message
    });
  }
  // dispatchError(type) {
    
  // }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post('/user/login', { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        err.response && err.response.data.errors
          ? err.response.data.errors
          : err.message
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_SIGNOUT });
};
