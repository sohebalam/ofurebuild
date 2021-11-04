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
  EDIT_COURSE_FAIL,
  EDIT_COURSE_REQUEST,
  EDIT_COURSE_SUCCESS,
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
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from "../constants/lessonTypes"

export const lessonsPostReducer = (
  state = { loading: false, dblessons: null },
  action
) => {
  switch (action.type) {
    case POST_LESSONS_REQUEST:
      return { loading: true }
    case POST_LESSONS_SUCCESS:
      return { loading: false, dblessons: action.payload }
    case POST_LESSONS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const lessonsListReducer = (
  state = { loading: false, lessons: null },
  action
) => {
  switch (action.type) {
    case GET_LESSONS_REQUEST:
      return { loading: true }
    case GET_LESSONS_SUCCESS:
      return { loading: false, lessons: action.payload }
    case GET_LESSONS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const courseEditReducer = (
  state = { loading: false, course: null },
  action
) => {
  switch (action.type) {
    case EDIT_COURSE_REQUEST:
      return { loading: true }
    case EDIT_COURSE_SUCCESS:
      return { loading: false, course: action.payload }
    case EDIT_COURSE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const freeEnrollReducer = (
  state = { loading: false, free: null },
  action
) => {
  switch (action.type) {
    case PAID_ENROLL_REQUEST:
      return { loading: true }
    case PAID_ENROLL_SUCCESS:
      return { loading: false, free: action.payload }
    case PAID_ENROLL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const enrollmentCheckReducer = (
  state = { loading: false, enrollment: false },
  action
) => {
  switch (action.type) {
    case CHECK_ENROLL_REQUEST:
      return { loading: true }
    case CHECK_ENROLL_SUCCESS:
      return { loading: false, enrolled: action.payload }
    case CHECK_ENROLL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const paidEnrollReducer = (
  state = { loading: false, paid: null },
  action
) => {
  switch (action.type) {
    case PAID_ENROLL_REQUEST:
      return { loading: true }
    case PAID_ENROLL_SUCCESS:
      return { loading: false, paid: action.payload }
    case PAID_ENROLL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const singleCourseReducer = (
  state = { loading: false, course: null },
  action
) => {
  switch (action.type) {
    case SINGLE_COURSE_REQUEST:
      return { loading: true }
    case SINGLE_COURSE_SUCCESS:
      return { loading: false, course: action.payload }
    case SINGLE_COURSE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const courseLoadReducer = (
  state = { loading: false, course: null },
  action
) => {
  switch (action.type) {
    case LOAD_COURSE_REQUEST:
      return { loading: true }
    case LOAD_COURSE_SUCCESS:
      return { loading: false, course: action.payload }
    case LOAD_COURSE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const coursePublishedReducer = (
  state = { loading: false, published: null },
  action
) => {
  switch (action.type) {
    case PUBLISHED_COURSES_REQUEST:
      return { loading: true }
    case PUBLISHED_COURSES_SUCCESS:
      return { loading: false, published: action.payload }
    case PUBLISHED_COURSES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const coursesLoadReducer = (
  state = { loading: false, course: null },
  action
) => {
  switch (action.type) {
    case LOAD_COURSES_REQUEST:
      return { loading: true }
    case LOAD_COURSES_SUCCESS:
      return { loading: false, courses: action.payload }
    case LOAD_COURSES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const selectVideoReducer = (
  state = { loading: false, video: null },
  action
) => {
  switch (action.type) {
    case SELECT_VIDEO_REQUEST:
      return { loading: true }
    case SELECT_VIDEO_SUCCESS:
      return { loading: false, video: action.payload }
    case SELECT_VIDEO_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const createCourseReducer = (
  state = { loading: false, course: null },
  action
) => {
  switch (action.type) {
    case CREATE_COURSE_REQUEST:
      return { loading: true }
    case CREATE_COURSE_SUCCESS:
      return { loading: false, course: action.payload }
    case CREATE_COURSE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const uploadImageReducer = (
  state = { loading: false, image: null },
  action
) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { loading: true }
    case UPLOAD_IMAGE_SUCCESS:
      return { loading: false, image: action.payload }
    case UPLOAD_IMAGE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteImageReducer = (
  state = { loading: false, image: null },
  action
) => {
  switch (action.type) {
    case DELETE_IMAGE_REQUEST:
      return { loading: true }
    case DELETE_IMAGE_SUCCESS:
      return { loading: false, image: action.payload }
    case DELETE_IMAGE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
