import {
  CHECK_ENROLL_FAIL,
  CHECK_ENROLL_REQUEST,
  CHECK_ENROLL_SUCCESS,
  CREATE_COURSE_FAIL,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  DELETE_IMAGE_FAIL,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  FREE_ENROLL_FAIL,
  FREE_ENROLL_REQUEST,
  FREE_ENROLL_SUCCESS,
  GET_LESSONS_FAIL,
  GET_LESSONS_REQUEST,
  GET_LESSONS_SUCCESS,
  LOAD_COURSES_FAIL,
  LOAD_COURSES_REQUEST,
  LOAD_COURSES_SUCCESS,
  LOAD_COURSE_FAIL,
  LOAD_COURSE_REQUEST,
  LOAD_COURSE_SUCCESS,
  PAID_ENROLL_FAIL,
  PAID_ENROLL_REQUEST,
  PAID_ENROLL_SUCCESS,
  POST_LESSONS_FAIL,
  POST_LESSONS_REQUEST,
  POST_LESSONS_SUCCESS,
  PUBLISHED_COURSES_FAIL,
  PUBLISHED_COURSES_REQUEST,
  PUBLISHED_COURSES_SUCCESS,
  SELECT_VIDEO_FAIL,
  SELECT_VIDEO_REQUEST,
  SELECT_VIDEO_SUCCESS,
  SINGLE_COURSE_FAIL,
  SINGLE_COURSE_REQUEST,
  SINGLE_COURSE_SUCCESS,
  STUDENT_COUNT_FAIL,
  STUDENT_COUNT_REQUEST,
  STUDENT_COUNT_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from "../constants/lessonTypes"
import absoluteUrl from "next-absolute-url"
import { loadStripe } from "@stripe/stripe-js"

import axios from "axios"

export const countStudents = (courseId) => async (dispatch) => {
  console.log(courseId)
  try {
    dispatch({ type: STUDENT_COUNT_REQUEST })

    const { data } = await axios.post(`/api/instructor/students`, {
      courseId: courseId,
    })

    dispatch({
      type: STUDENT_COUNT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STUDENT_COUNT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const postLessons = (items, slug) => async (dispatch) => {
  try {
    dispatch({ type: POST_LESSONS_REQUEST })

    // console.log("itemssds", items)
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    // console.log("ster", items)
    const { data } = await axios.post(
      `/api/lessons/${slug}`,
      { ...items },
      config
    )

    dispatch({
      type: POST_LESSONS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_LESSONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const lessonsGet = (slug) => async (dispatch) => {
  // console.log(slug)
  try {
    dispatch({ type: GET_LESSONS_REQUEST })

    // const { origin } = absoluteUrl(req)

    const { data } = await axios.get(`/api/course/lessons/${slug}`)

    // console.log("action", data[0])

    dispatch({
      type: GET_LESSONS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_LESSONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const getlessons = (authCookie, req, slug) => async (dispatch) => {
  console.log(slug)
  try {
    dispatch({ type: GET_LESSONS_REQUEST })

    const config = {
      headers: {
        cookie: authCookie,
      },
    }

    const { origin } = absoluteUrl(req)

    const { data } = await axios.get(
      `${origin}/api/course/lessons/${slug}`,
      config
    )

    console.log(data)

    dispatch({
      type: GET_LESSONS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_LESSONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const courseEdit = (image, values, slug) => async (dispatch) => {
  console.log("courseedit", image)

  try {
    dispatch({ type: CREATE_COURSE_REQUEST })

    // var strNum = values.price
    // strNum = strNum.toString().replace("£", "")
    // values.price = parseFloat(strNum)

    const { data } = await axios.put(`/api/course/update/${slug}`, {
      ...values,
      image,
    })

    // console.log(data)

    dispatch({
      type: CREATE_COURSE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const freeEnroll = (course) => async (dispatch) => {
  try {
    dispatch({ type: FREE_ENROLL_REQUEST })

    const { data } = await axios.post(
      `/api/course/enrollment/free/${course._id}`
    )

    dispatch({
      type: FREE_ENROLL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FREE_ENROLL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const checkEnrollment = (course) => async (dispatch) => {
  try {
    dispatch({ type: CHECK_ENROLL_REQUEST })

    const { data } = await axios.get(
      `/api/course/enrollment/check/${course._id}`
    )

    dispatch({
      type: CHECK_ENROLL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CHECK_ENROLL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const paidEnroll = (course) => async (dispatch) => {
  try {
    dispatch({ type: PAID_ENROLL_REQUEST })
    const { data } = await axios.post(
      `/api/course/enrollment/paid/${course._id}`
    )
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
    stripe.redirectToCheckout({ sessionId: data })

    dispatch({
      type: PAID_ENROLL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PAID_ENROLL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getSingleCourse = (req, slug) => async (dispatch) => {
  console.log(slug)

  try {
    dispatch({ type: SINGLE_COURSE_REQUEST })

    const { origin } = absoluteUrl(req)

    const { data } = await axios.get(
      `${origin}/api/course/single/${slug}`
      // config
    )

    console.log("data", data)

    dispatch({
      type: SINGLE_COURSE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SINGLE_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const loadCourse = (authCookie, req, slug) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_COURSE_REQUEST })

    const config = {
      headers: {
        cookie: authCookie,
      },
    }

    const { origin } = absoluteUrl(req)

    const { data } = await axios.get(`${origin}/api/course/${slug}`, config)

    console.log("load", data)

    dispatch({
      type: LOAD_COURSE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LOAD_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const instructorCourse = (authCookie, req, slug) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_COURSE_REQUEST })

    const config = {
      headers: {
        cookie: authCookie,
      },
    }

    const { origin } = absoluteUrl(req)

    const { data } = await axios.get(
      `${origin}/api/course/instructor/${slug}`,
      config
    )

    console.log("load", data)

    dispatch({
      type: LOAD_COURSE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LOAD_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const publishedCourse = (req) => async (dispatch) => {
  try {
    dispatch({ type: PUBLISHED_COURSES_REQUEST })

    const { origin } = absoluteUrl(req)

    const { data } = await axios.get(`${origin}/api/course/publish/all`)

    dispatch({
      type: PUBLISHED_COURSES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PUBLISHED_COURSES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const imageDelete = (image) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_IMAGE_REQUEST })

    const { data } = await axios.post("/api/course/delete", { image })

    dispatch({
      type: DELETE_IMAGE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DELETE_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// export const imageUpload = (uri) => async (dispatch) => {
//   console.log(uri)

//   return

//   try {
//     dispatch({ type: UPLOAD_IMAGE_REQUEST })

//     let { data } = await axios.post("/api/course/image", {
//       image: uri,
//     })

//     dispatch({
//       type: UPLOAD_IMAGE_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     dispatch({
//       type: UPLOAD_IMAGE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     })
//   }
// }

export const selectLesson = (video) => async (dispatch) => {
  try {
    dispatch({ type: SELECT_VIDEO_REQUEST })

    const data = video

    dispatch({
      type: SELECT_VIDEO_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SELECT_VIDEO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const courseCreate = (image, values) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COURSE_REQUEST })

    var strNum = values.price
    strNum = strNum.toString().replace("£", "")
    values.price = parseFloat(strNum)

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post(
      "/api/course/mid/course",
      {
        image,
        ...values,
      },
      config
    )
    // const { data } = await axios.put(
    //   "/api/course/mid/course",
    //   {

    //   },
    //   config
    // )

    dispatch({
      type: CREATE_COURSE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const loadCourses = (authCookie, req) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req)
    dispatch({ type: LOAD_COURSES_REQUEST })

    const config = {
      headers: {
        cookie: authCookie,
      },
    }

    const { data } = await axios.get(`${origin}/api/course/instructor`, config)

    // console.log(data)

    dispatch({
      type: LOAD_COURSES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LOAD_COURSES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
