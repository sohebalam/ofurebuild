import {
  GET_IMAGE_FAIL,
  GET_IMAGE_REQUEST,
  GET_IMAGE_SUCCESS,
} from "../constants/imageTypes"

export const getImageReducer = (
  state = { loading: false, image: null },
  action
) => {
  switch (action.type) {
    case GET_IMAGE_REQUEST:
      return { loading: true }
    case GET_IMAGE_SUCCESS:
      return { loading: false, imageArray: action.payload }
    case GET_IMAGE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
