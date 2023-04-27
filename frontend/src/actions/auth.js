import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  RESET_REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILED,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAILED,
  REFRESH_SUCCESS,
  REFRESH_FAILED,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
} from './types'

export const load_user = () => async (dispatch) => {
  try {
    const res = await fetch('/api/authentication/user/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
    const data = await res.json()
    if (res.status === 200) {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data,
      })
    } else {
      dispatch({ type: LOAD_USER_FAILED })
    }
  } catch (err) {
    dispatch({ type: LOAD_USER_FAILED })
  }
}

export const check_auth_status = () => async (dispatch) => {
  try {
    const res = await fetch('/api/authentication/verify/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
    if (res.status === 200) {
      dispatch({
        type: AUTHENTICATED_SUCCESS,
      })
      dispatch(load_user())
    } else {
      dispatch({ type: AUTHENTICATED_FAILED })
    }
  } catch (err) {
    dispatch({ type: AUTHENTICATED_FAILED })
  }
}

export const request_refresh = () => async (dispatch) => {
  try {
    const res = await fetch('/api/authentication/refresh/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (res.status === 200) {
      dispatch({ type: REFRESH_SUCCESS })
      dispatch(check_auth_status())
    } else {
      dispatch({ type: REFRESH_FAILED })
    }
  } catch {
    dispatch({ type: REFRESH_FAILED })
  }
}

export const register =
  (first_name, last_name, username, password, re_password) =>
  async (dispatch) => {
    const body = JSON.stringify({
      first_name,
      last_name,
      username,
      password,
      re_password,
    })
    dispatch({
      type: SET_AUTH_LOADING,
    })
    try {
      const res = await fetch('/api/authentication/register/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
      })
      if (res.status === 201) {
        dispatch({
          type: REGISTER_SUCCESS,
        })
      } else {
        dispatch({ type: REGISTER_FAILED })
      }
    } catch (err) {
      dispatch({ type: REGISTER_FAILED })
    }

    dispatch({
      type: REMOVE_AUTH_LOADING,
    })
  }

export const reset_register_success = () => async (dispatch) => {
  dispatch({
    type: RESET_REGISTER_SUCCESS,
  })
}

export const login = (username, password) => async (dispatch) => {
  const body = JSON.stringify({ username, password })
  dispatch({
    type: SET_AUTH_LOADING,
  })
  try {
    const res = await fetch('/api/authentication/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    })
    if (res.status === 200) {
      dispatch(load_user())
      dispatch({
        type: LOGIN_SUCCESS,
      })
    } else {
      dispatch({ type: LOGIN_FAILED })
    }
  } catch (err) {
    dispatch({ type: LOGIN_FAILED })
  }
  dispatch({
    type: REMOVE_AUTH_LOADING,
  })
}

export const logout = () => async (dispatch) => {
  try {
    const res = await fetch('/api/authentication/logout/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
    if (res.status === 200) {
      dispatch({
        type: LOGOUT_SUCCESS,
      })
    } else {
      dispatch({ type: LOGOUT_FAILED })
    }
  } catch (err) {
    dispatch({ type: LOGOUT_FAILED })
  }
}
