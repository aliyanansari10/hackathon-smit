import { combineReducers } from "redux";
import FeedReducer from "./FeedReducer";
import AuthReducer from "./AuthReducer";
import CourseReducer from "./CourseReducer";
import StudentsReducer from "./StudentsReducer";
import LeaveReducer from "./LeaveReducer";
import AdminReducer from "./AdminReducer";

export const reducer = combineReducers({
  state: (state = {}) => state,
  FeedReducer,
  AuthReducer,
  CourseReducer,
  StudentsReducer,
  LeaveReducer,
  AdminReducer,
});
