import { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import {
  setCurrentForm,
  setErrorMsg,
  setSubscriptionFailure,
  setSubscriptionSuccess,
} from "../../redux/signup/SignupActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import signupService from "../../services/signup.service";
import { useQuery } from "react-query";

const SignupSuccess: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id") ?? "";
  const userDetails = useSelector((state: any) => state.signup.userDetails);
  const isFaceScanPresent = userDetails.isFaceScanned;
  const isBodyScanPresent = userDetails.isBodyScanned;
  const guestDetails = useSelector((state: any) => state.signup.guestDetails);
  const isGuestFaceScanPresent = guestDetails.isFaceScanned;
  const isGuestBodyScanPresent = guestDetails.isBodyScanned;
  const email = userDetails.email;
  const { refetch: getSubscriptionStatus } = useQuery(
    "getSubscriptionStatus",
    async () => signupService.getSubscriptionStatus(email, dispatch),
    {
      onSuccess: (res: any) => {
        if (res.data.messageCode === "user_not_subscribed" && session_id) {

          dispatch(setSubscriptionSuccess());
          
          // dispatch(setCurrentForm(CONSTANTS.SIGN_UP_SUBSCRIPTION));
          // dispatch(setErrorMsg(res.data.message));
          // dispatch(setSubscriptionFailure("User is not subscribed"));
        } else if (res.data.messageCode === "user_subscribed") {
          dispatch(setSubscriptionSuccess());
        }
      },

      enabled: false,
    }
  );

  useEffect(() => {
    dispatch(setCurrentForm(CONSTANTS.SIGN_UP_SUCCESS));
    dispatch(setErrorMsg(null));

    getSubscriptionStatus();
  }, [dispatch, getSubscriptionStatus]);

  return (
    <Grid
      container
      direction="row"
      xs={12}
      className="w-screen h-screen relative"
    >
      {/* asset section */}
      <AssetSection
        backgroundSrc="/assets/images/signUp/scanningBg.png"
        modelsSrc="/assets/images/signUp/scanningModels.png"
      />
      <ContentArea removeLogo>
        <Grid
          direction="row"
          className="w-[70%] h-[67%] mt-6 flex flex-col justify-start items-center  space-y-16"
        >
          <img alt="AR-fitt logo" className="" src="./assets/images/logo.png" />
          <Grid className="font-Montserrat font-bold text-center text-[#408589] max-w-xs ">
            <p className="text-3xl ">Success!</p>

            <p className="text-2xl">
              {" "}
              You have successfully subscribed to AR-Fitt!
            </p>
          </Grid>
        </Grid>
        <Button
          className="bg-primary text-contrastText font-bold"
          disableElevation={true}
          variant="contained"
          style={{
            width: "70%",
            fontFamily: "Montserrat",
            margin: "4%",
            borderRadius: "10px",
            height: "83px",
          }}
          onClick={() => {
            if (
              !(isBodyScanPresent || isGuestBodyScanPresent) 
              // &&
              // !(isFaceScanPresent || isGuestFaceScanPresent)
            ) {
              dispatch(setCurrentForm(CONSTANTS.SIGN_UP_CATEGORIES));
              
            } else {
              navigate("/home");
            }
          }}
        >
          Continue
        </Button>
      </ContentArea>
    </Grid>
  );
};
export default SignupSuccess;
