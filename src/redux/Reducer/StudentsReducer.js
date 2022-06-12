import { GET_STUDENTS } from "../types";

const initialState = {
  students: [],
};

const StudentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTS: {
      return {
        ...state,
        students: action.payload,
      };
    }

    default:
      return state;
  }
};

export default StudentsReducer;
