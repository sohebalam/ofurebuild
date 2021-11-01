import { combineReducers } from "redux"
// import { fileGetReducer, FileGetReducer } from "./reducers/fileReducers"
// import {
//   courseEditReducer,
//   courseLoadReducer,
//   coursePublishedReducer,
//   coursesLoadReducer,
//   createCourseReducer,
//   deleteImageReducer,
//   enrollmentCheckReducer,
//   freeEnrollReducer,
//   lessonsListReducer,
//   lessonsPostReducer,
//   paidEnrollReducer,
//   selectVideoReducer,
//   singleCourseReducer,
//   uploadImageReducer,
// } from "./reducers/lessonReducers"
import {
  forgotPasswordReducer,
  newInstructorReducer,
  profileReducer,
  registerReducer,
  regSocialReducer,
  resetPasswordReducer,
  updateProfileReducer,
} from "./reducers/userReducers"

const reducer = combineReducers({
  register: registerReducer,
  profile: profileReducer,
  update: updateProfileReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  regSocial: regSocialReducer,
  updateProfile: updateProfileReducer,
  newInstructor: newInstructorReducer,

  //lessons
  //   selectVideo: selectVideoReducer,
  //   createCourse: createCourseReducer,
  //   uploadImage: uploadImageReducer,
  //   deleteImage: deleteImageReducer,
  //   coursesLoad: coursesLoadReducer,
  //   coursePublished: coursePublishedReducer,
  //   courseLoad: courseLoadReducer,
  //   singleCourse: singleCourseReducer,
  //   paidEnroll: paidEnrollReducer,
  //   enrollmentCheck: enrollmentCheckReducer,
  //   freeEnroll: freeEnrollReducer,
  //   courseEdit: courseEditReducer,
  //   lessonsList: lessonsListReducer,
  //   lessonsPost: lessonsPostReducer,

  //   //files
  //   fileGet: fileGetReducer,
})

export default reducer
