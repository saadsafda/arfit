import { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ContentArea from "../../components/contentArea";
import AssetSection from "../../components/assetSection";
import OtpInputField from "../../components/otpInputFields";
import { setCurrentForm, setErrorMsg } from "../../redux/signup/SignupActions";
import CONSTANTS from "../../utils/constants/CONSTANTS";

const OtpVerification: React.FC = () => {
  const dispatch = useDispatch();
  const email = useSelector((state: any) => state.signup.userDetails.email);
  const otpVerificationStatus = useSelector(
    (state: any) => state.signup.userDetails.isVerified
  );
  useEffect(() => {
    dispatch(setCurrentForm(CONSTANTS.SIGN_UP_OTP_VERIFICATION));
    dispatch(setErrorMsg(""));
  }, [dispatch]);

  const handleNextPage = () => {
    if (otpVerificationStatus)
      dispatch(setCurrentForm(CONSTANTS.SIGN_UP_SUBSCRIPTION));
  };

  return (
    <Grid
      container
      direction="row"
      xs={12}
      className="w-screen h-screen relative"
    >
      {/* asset section */}
      <AssetSection
        backgroundSrc="/assets/images/signUp/otpVerificationBg.png"
        modelsSrc="/assets/images/signUp/otpVerificationModels.png"
      />
      {/* Content Area */}
      <ContentArea title="OTP Verification">
        <Grid direction="column" className="w-[70%] h-full flex justify-center">
          <p className="font-Montserrat text-sm xl:text-lg flex justify-center text-center">
            Please enter the One-Time Password to verify your account <br /> A
            One-Time Password has been sent to {email}
          </p>
          {/* OTP Input */}
          <OtpInputField />
          <Grid className="flex items-center justify-evenly w-full mt-[4%]">
            {/* Verify Button */}
            <Button
              className="bg-primary text-contrastText drop-shadow-lg xl:text-lg"
              variant="contained"
              style={{
                width: "100%",
                fontFamily: "Montserrat",
                margin: "4%",
                borderRadius: "15px",
                height: "70%",
              }}
              onClick={() => handleNextPage()}
            >
              Verify
            </Button>{" "}
          </Grid>
        </Grid>
      </ContentArea>
    </Grid>
  );
};
export default OtpVerification;
