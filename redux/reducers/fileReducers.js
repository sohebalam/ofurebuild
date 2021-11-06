import {
  FILE_CREATE_FAIL,
  FILE_CREATE_REQUEST,
  FILE_CREATE_RESET,
  FILE_CREATE_SUCCESS,
  FILE_DELETE_FAIL,
  FILE_DELETE_REQUEST,
  FILE_DELETE_SUCCESS,
  FILE_GET_FAIL,
  FILE_GET_REQUEST,
  FILE_GET_SUCCESS,
} from "../constants/fileTypes"

export const fileDeleteReducer = (state = [], action) => {
  switch (action.type) {
    case FILE_DELETE_REQUEST:
      return { loading: true }
    case FILE_DELETE_SUCCESS:
      return { ...state, loading: false, success: true }
    case FILE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const fileGetReducer = (
  state = { loading: false, files: [] },
  action
) => {
  switch (action.type) {
    case FILE_GET_REQUEST:
      return { loading: true }
    case FILE_GET_SUCCESS:
      return { loading: false, files: action.payload }
    case FILE_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const filesCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FILE_CREATE_REQUEST:
      return { loading: true }
    case FILE_CREATE_SUCCESS:
      return { loading: false, file: action.payload }
    case FILE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case FILE_CREATE_RESET:
      return {}
    default:
      return state
  }
}
