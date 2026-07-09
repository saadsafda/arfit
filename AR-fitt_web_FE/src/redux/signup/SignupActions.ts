// TODO: Refactor types in this file to remove usage of 'any' and provide explicit type definitions
import axios, { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { Dispatch as reduxDispatch, AnyAction } from "redux";
import SignupActionTypes from "./SignupActionTypes";
import URLS from "../../utils/constants/URLS";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import HTTPService from "../../services/base.service";

// * ============== Redux Reducer Action Triggers =================
export const practiceTest = () => ({
  type: SignupActionTypes.DUMMY_TEST,
});
export const registerUserStart = () => ({
  type: SignupActionTypes.REGISTER_USER_START,
});
export const initializeSignUpState = () => ({
  type: SignupActionTypes.INITIALIZE_SIGNUP_STATE,
});
export const registerUserSuccess = (user: any) => ({
  type: SignupActionTypes.REGISTER_USER_SUCCESS,
  payload: user,
});
export const registerUserFailure = (error: string | any) => ({
  type: SignupActionTypes.REGISTER_USER_FAILURE,
  payload: error,
});
export const changePasswordStart = () => ({
  type: SignupActionTypes.CHANGE_PASSWORD_START,
});
export const changePasswordSuccess = (user: any) => ({
  type: SignupActionTypes.CHANGE_PASSWORD_SUCCESS,
  payload: user,
});
export const changePasswordFailure = (error: string | any) => ({
  type: SignupActionTypes.CHANGE_PASSWORD_FAILURE,
  payload: error,
});
export const forgotPasswordStart = () => ({
  type: SignupActionTypes.FORGOT_PASSWORD_START,
});
export const forgotPasswordSuccess = (user: any) => ({
  type: SignupActionTypes.FORGOT_PASSWORD_SUCCESS,
  payload: user,
});
export const forgotPasswordFailure = (error: string | any) => ({
  type: SignupActionTypes.FORGOT_PASSWORD_FAILURE,
  payload: error,
});
export const setIsSigningUp = (flag: boolean) => ({
  type: SignupActionTypes.SET_IS_SIGNING_UP,
  payload: flag,
});
export const fetchUserStart = () => ({
  type: SignupActionTypes.FETCH_USER_START,
});
export const fetchUserSuccess = (user: any) => ({
  type: SignupActionTypes.FETCH_USER_SUCCESS,
  payload: user,
});
export const fetchUserFailure = (error: string | any) => ({
  type: SignupActionTypes.FETCH_USER_FAILURE,
  payload: error,
});
export const setUserDetails = (user: any) => ({
  type: SignupActionTypes.SET_USER_DETAILS,
  payload: user,
});
export const setCurrentForm = (form: string) => ({
  type: SignupActionTypes.SET_CURRENT_FORM,
  payload: form,
});
export const setErrorMsg = (error: string | any) => ({
  type: SignupActionTypes.SET_ERROR_MESSAGE,
  payload: error,
});
export const verifyEmailStart = () => ({
  type: SignupActionTypes.VERIFY_EMAIL_START,
});
export const verifyEmailSuccess = () => ({
  type: SignupActionTypes.VERIFY_EMAIL_SUCCESS,
});
export const verifyEmailFailure = (errorMessage: string) => ({
  type: SignupActionTypes.VERIFY_EMAIL_FAILURE,
  payload: errorMessage,
});

export const setSubscriptionSuccess = () => ({
  type: SignupActionTypes.SUBSCRIBED_SUCCESS,
});
export const setSubscriptionFailure = (errorMessage: string) => ({
  type: SignupActionTypes.SUBSCRIBED_FAILURE,
  payload: errorMessage,
});
export const setBodyScanSuccess = () => ({
  type: SignupActionTypes.BODY_SCANNED_SUCCESS,
});
export const setBodyScanFailure = (errorMessage: string) => ({
  type: SignupActionTypes.BODY_SCANNED_FAILURE,
  payload: errorMessage,
});
export const setFaceScanSuccess = () => ({
  type: SignupActionTypes.FACE_SCANNED_SUCCESS,
});
export const setFaceScanFailure = (errorMessage: string) => ({
  type: SignupActionTypes.FACE_SCANNED_FAILURE,
  payload: errorMessage,
});
export const setGuestDetails = (guest: any) => ({
  type: SignupActionTypes.SET_GUEST_DETAILS,
  payload: guest,
});
export const setGuestBodyScanSuccess = () => ({
  type: SignupActionTypes.GUEST_BODY_SCANNED_SUCCESS,
});
export const setGuestBodyScanFailure = (errorMessage: string) => ({
  type: SignupActionTypes.GUEST_BODY_SCANNED_FAILURE,
  payload: errorMessage,
});
export const setGuestFaceScanSuccess = () => ({
  type: SignupActionTypes.GUEST_FACE_SCANNED_SUCCESS,
});
export const setGuestFaceScanFailure = (errorMessage: string) => ({
  type: SignupActionTypes.GUEST_FACE_SCANNED_FAILURE,
  payload: errorMessage,
});
export const setInterestCategory = (interest: any) => ({
  type: SignupActionTypes.SET_INTEREST_CATEGORIES,
  payload: interest,
});

// * ============== API Calls =================
export const registerUserStartAsync = (
  payload: any,
  setErrorMessage: Dispatch<SetStateAction<string | null>> | any
) => {
  return (dispatch: reduxDispatch<AnyAction>) => {
    dispatch(setErrorMessage(null));

    axios
      .post(`${URLS.registerUser}`, payload)
      .then((response) => {
        console.log("signup response", response.data);
        const token = response.headers[CONSTANTS.ACCESS_TOKEN];
        if (token) {
          localStorage.setItem(CONSTANTS.ACCESS_TOKEN, token);
          HTTPService.setToken(token);
        }
        dispatch(registerUserStart());
        
        // Check if response.data.message exists before accessing it
        const userData = response.data.message || response.data;
        dispatch(setUserDetails(userData));
        
        // Skip OTP verification and go directly to subscription plans
        dispatch(registerUserSuccess(payload));
        dispatch(setCurrentForm(CONSTANTS.SIGN_UP_SUBSCRIPTION));
      })
      .catch((error: AxiosError | any) => {
        const errorMessage = error?.response?.data?.message || error?.message || "Signup Failed";
        dispatch(setErrorMsg(errorMessage));
        dispatch(setErrorMessage(errorMessage));
        dispatch(registerUserFailure(errorMessage));
      });
  };
};
