import axios from "axios"
import {
  GET_IMAGE_FAIL,
  GET_IMAGE_REQUEST,
  GET_IMAGE_SUCCESS,
} from "../constants/imageTypes"

export const loadImages = () => async (dispatch) => {
  try {
    dispatch({ type: GET_IMAGE_REQUEST })
    const { data } = await axios.get("/api/images")

    dispatch({
      type: GET_IMAGE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
