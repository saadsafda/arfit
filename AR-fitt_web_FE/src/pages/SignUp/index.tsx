/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import BasicInformation from "./basicInformation";
import OtpVerification from "./otpVerification";
import SubscriptionPlans from "./subscriptionPlans";
import Scan from "./scan";
import { initializeSignUpState } from "../../redux/signup/SignupActions";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import SignupSuccess from "./signupSuccess";
import CategoryPage from "./categoryPage";

const SignUp = () => {
  const dispatch = useDispatch();
  let currentForm = useSelector((state: any) => state.signup.currentForm);

  useEffect(() => {
    currentForm = currentForm || dispatch(initializeSignUpState());
    // currentForm = CONSTANTS.SIGN_UP_SUCCESS; // remove once developemnet is over on this page
  }, []);

  return (
    <>
      {currentForm === CONSTANTS.SIGN_UP_BASIC_INFO ? <BasicInformation /> : ""}
      {currentForm === CONSTANTS.SIGN_UP_OTP_VERIFICATION ? (
        <OtpVerification />
      ) : (
        ""
      )}
      {currentForm === CONSTANTS.SIGN_UP_SUBSCRIPTION ? (
        <SubscriptionPlans />
      ) : (
        ""
      )}
      {currentForm === CONSTANTS.SIGN_UP_BODY_SCANNING ? (
        <Scan type="body" />
      ) : (
        ""
      )}
      {currentForm === CONSTANTS.SIGN_UP_FACE_SCANNING ? (
        <Scan type="face" />
      ) : (
        ""
      )}
      {currentForm === CONSTANTS.SIGN_UP_SUCCESS ? <SignupSuccess /> : ""}
      {currentForm === CONSTANTS.SIGN_UP_CATEGORIES ? <CategoryPage /> : ""}
    </>
  );
};
export default SignUp;
