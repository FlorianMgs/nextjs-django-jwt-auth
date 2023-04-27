import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  RESET_REGISTER_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILED,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAILED,
  REFRESH_SUCCESS,
  REFRESH_FAILED,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  SET_LAST_REFRESH_REQUEST,
  CLEAR_LAST_REFRESH_REQUEST,
} from '../actions/types'

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  register_success: false,
  lastRefreshRequest: null,
}

const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        register_success: true,
      }
    case REGISTER_FAILED:
      return {
        ...state,
      }
    case RESET_REGISTER_SUCCESS:
      return {
        ...state,
        register_success: false,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      }
    case LOGIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    case LOGOUT_FAILED:
      return {
        ...state,
      }
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
      }
    case LOAD_USER_FAILED:
      return {
        ...state,
        user: null,
      }
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      }
    case AUTHENTICATED_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    case REFRESH_SUCCESS:
      return {
        ...state,
      }
    case REFRESH_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    case SET_LAST_REFRESH_REQUEST:
      return {
        ...state,
        lastRefreshRequest: payload,
      }
    case CLEAR_LAST_REFRESH_REQUEST:
      return {
        ...state,
        lastRefreshRequest: null,
      }
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      }
    case REMOVE_AUTH_LOADING:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default authReducer
