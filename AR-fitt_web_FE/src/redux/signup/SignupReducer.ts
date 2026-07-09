import { Reducer, AnyAction } from "redux";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import SignupActionTypes from "./SignupActionTypes";

type SignupAction = {
  type: string;
  payload?: any;
};

interface SignupState {
  isSigningUp: boolean;
  errorMessage: string | null;
  currentUser: any;
  userDetails: any;
  currentForm: string;
  isFetching: boolean;
  forgotPassword: boolean;
  isSendingEmail: boolean;
  changePassword: boolean;
  isChangingPassword: boolean;
  guestDetails: any;
  interestCategories: Array<string>;
  test: string;
}

const INITIAL_STATE: SignupState = {
  isSigningUp: false,
  errorMessage: null,
  currentUser: null,
  userDetails: {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    dob: "",
    gender: "",
   
    isVerified: false,
    isFaceScanned: false,
    isBodyScanned: false,
    isSubscribed: false,
    recommendedSize: "",
  },
  currentForm: CONSTANTS.SIGN_UP_BASIC_INFO,
  isFetching: false,
  forgotPassword: false,
  isSendingEmail: false,
  changePassword: false,
  isChangingPassword: false,

  guestDetails: {
    id: "",
    dob: "",
    gender: "",
    
    isFaceScanned: false,
    isBodyScanned: false,
    recommendedSize: "",
  },
  test: "",
  interestCategories: [],
};

const signupReducer: Reducer<SignupState, AnyAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case SignupActionTypes.DUMMY_TEST:
      return {
        ...state,
        test: "For Refrence",
      };
    case SignupActionTypes.REGISTER_USER_START:
      return {
        ...state,
        isSigningUp: true,
        errorMessage: null,
      };
    case SignupActionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
        errorMessage: null,
        currentUser: action.payload,
      };
    case SignupActionTypes.REGISTER_USER_FAILURE:
      return {
        ...state,
        isSigningUp: false,
        errorMessage: action.payload,
      };
    case SignupActionTypes.FORGOT_PASSWORD_START:
      return {
        ...state,
        isSendingEmail: true,
        errorMessage: null,
      };
    case SignupActionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isSendingEmail: false,
        errorMessage: null,
        forgotPassword: action.payload,
      };
    case SignupActionTypes.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        isSendingEmail: false,
        errorMessage: action.payload,
      };
    case SignupActionTypes.CHANGE_PASSWORD_START:
      return {
        ...state,
        isChangingPassword: true,
        errorMessage: null,
      };
    case SignupActionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isChangingPassword: false,
        errorMessage: null,
        changePassword: action.payload,
      };
    case SignupActionTypes.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isChangingPassword: false,
        errorMessage: action.payload,
      };
    case SignupActionTypes.FETCH_USER_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };
    case SignupActionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: null,
        currentUser: action.payload,
      };
    case SignupActionTypes.FETCH_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case SignupActionTypes.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case SignupActionTypes.SET_IS_SIGNING_UP:
      return {
        ...state,
        isSigningUp: action.payload,
      };
    case SignupActionTypes.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case SignupActionTypes.SET_CURRENT_FORM:
      return {
        ...state,
        currentForm: action.payload,
      };
    case SignupActionTypes.INITIALIZE_SIGNUP_STATE:
      return {
        ...INITIAL_STATE,
      };
    case SignupActionTypes.VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          isVerified: true,
        },
      };
    case SignupActionTypes.VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          isVerified: false,
        },
      };
    case SignupActionTypes.SUBSCRIBED_SUCCESS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          isSubscribed: true,
        },
      };
    case SignupActionTypes.SUBSCRIBED_FAILURE:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          isSubscribed: false,
        },
      };
    case SignupActionTypes.FACE_SCANNED_SUCCESS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          isFaceScanned: true,
        },
      };
    case SignupActionTypes.FACE_SCANNED_FAILURE:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          isFaceScanned: false,
        },
      };
    case SignupActionTypes.BODY_SCANNED_SUCCESS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          isBodyScanned: true,
        },
      };
    case SignupActionTypes.BODY_SCANNED_FAILURE:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          isBodyScanned: false,
        },
      };
    case SignupActionTypes.SET_GUEST_DETAILS:
      return {
        ...state,
        guestDetails: action.payload,
      };
    case SignupActionTypes.GUEST_FACE_SCANNED_SUCCESS:
      return {
        ...state,
        guestDetails: {
          ...state.guestDetails,
          isFaceScanned: true,
        },
      };
    case SignupActionTypes.GUEST_FACE_SCANNED_FAILURE:
      return {
        ...state,
        guestDetails: {
          ...state.guestDetails,
          isFaceScanned: false,
        },
      };
    case SignupActionTypes.GUEST_BODY_SCANNED_SUCCESS:
      return {
        ...state,
        guestDetails: {
          ...state.guestDetails,
          isBodyScanned: true,
        },
      };
    case SignupActionTypes.GUEST_BODY_SCANNED_FAILURE:
      return {
        ...state,
        guestDetails: {
          ...state.guestDetails,
          isBodyScanned: false,
        },
      };
    case SignupActionTypes.SET_INTEREST_CATEGORIES:
      return {
        ...state,
        interestCategories: action.payload,
      };
    default:
      return state;
  }
};

export default signupReducer;
