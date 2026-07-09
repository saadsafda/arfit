/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import BasicInformation from "./basicInformation";
import OtpVerification from "./otpVerification";
import SubscriptionPlans from "./subscriptionPlans";
import Scan from "./scan";
import SignupSuccess from "./signupSuccess";
import CategoryPage from "./categoryPage";
import { initializeSignUpState } from "../../redux/signup/SignupActions";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../../utils/helpers/auth";


const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let currentForm = useSelector((state: any) => state.signup.currentForm);

  useEffect(() => {
    const token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
    if (isTokenValid(token)) {
      navigate("/home");
      return;
    }
    currentForm = currentForm || dispatch(initializeSignUpState());
    currentForm = CONSTANTS.SIGN_UP_SUCCESS; // remove once developemnet is over on this page
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
