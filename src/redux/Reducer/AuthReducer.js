import { STUDENT_SIGNIN, ADMIN_SIGNIN, ADMIN_SIGNOUT } from "../types";

const initialState = {
  uid: null,
  userName: "",
  isLoggedIn: false,
  admin: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_SIGNIN: {
      return {
        ...state,
        uid: action.payload,
        isLoggedIn: true,
        admin: false,
      };
    }
    case ADMIN_SIGNIN: {
      return {
        ...state,
        uid: action.payload.uid,
        userName: action.payload.userName,
        isLoggedIn: true,
        admin: true,
      };
    }
    case ADMIN_SIGNOUT: {
      console.log("Logout Dispatch Called");
      return {
        ...state,
        uid: action.payload.uid,
        userName: action.payload.userName,
        isLoggedIn: false,
        admin: false,
      };
    }

    default:
      return state;
  }
};

export default AuthReducer;
