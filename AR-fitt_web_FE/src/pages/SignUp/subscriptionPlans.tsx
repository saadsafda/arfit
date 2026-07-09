import { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ContentArea from "../../components/contentArea";
import AssetSection from "../../components/assetSection";
import SubscriptionCard from "../../components/subscriptionCard";
import { setCurrentForm, setErrorMsg } from "../../redux/signup/SignupActions";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "react-query";
import signupService from "../../services/signup.service";

const SubscriptionPlans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id") ?? "";
  const token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
  const userDetails = useSelector((state: any) => state.signup.userDetails);
  const email = userDetails.email;
  const handleNextPage = (nextPage: string) => {
    dispatch(setCurrentForm(nextPage));
  };

  const { refetch: getSubscriptionStatus } = useQuery(
    "getSubscriptionStatus",
    async () => signupService.getSubscriptionStatus(email, dispatch, session_id),
    {
      onSuccess: (res: any) => {
        console.log("Subscription status response:", res.data);
        if (res.data.messageCode === "user_not_subscribed" && session_id) {
          dispatch(setCurrentForm(CONSTANTS.SIGN_UP_SUBSCRIPTION));
          dispatch(setErrorMsg(res.data.message));
        } else if (res.data.messageCode === "user_subscribed" && session_id) {
          dispatch(setErrorMsg("")); // Clear any error messages
          handleNextPage(CONSTANTS.SIGN_UP_SUCCESS);
        }
      },

      enabled: false,
    }
  );

  useEffect(() => {
    // dispatch(setErrorMsg(null));
    dispatch(setCurrentForm(CONSTANTS.SIGN_UP_SUBSCRIPTION));
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (!decodedToken.exp || decodedToken?.exp < currentTime) {
        navigate("/");
        dispatch(setCurrentForm(CONSTANTS.SIGN_UP_BASIC_INFO));
      } else {
        getSubscriptionStatus();
      }
    } else {
      navigate("/");
      dispatch(setCurrentForm(CONSTANTS.SIGN_UP_BASIC_INFO));
    }

    // if (session_id) dispatch(setCurrentForm(CONSTANTS.SIGN_UP_BODY_SCANNING));
  }, [dispatch, getSubscriptionStatus, navigate, token]);

  return (
    <Grid
      container
      direction="row"
      xs={12}
      className="w-screen h-screen relative"
    >
      {/* asset section */}
      <AssetSection
        backgroundSrc="/assets/images/signUp/subscriptionPlansBg.png"
        modelsSrc="/assets/images/signUp/subscriptionPlansModels.png"
      />
      <ContentArea title="Subscription Plans">
        <Grid className="w-[100%] xs:h-[80%] md:h-[80%] flex justify-center items-center mt-6 xs:flex-col md:flex-row">
          {/* One Time */}
          
          {/* Monthly */}

          <SubscriptionCard
            title="Monthly"
            color="purple"
            icon="./assets/images/signUp/subscriptionPlan2.png"
            price="5"
          />
          {/* Yearly */}

          <SubscriptionCard
            title="Yearly"
            color="primaryLight"
            icon="./assets/images/signUp/subscriptionPlan3.png"
            price="30"
          />


          <SubscriptionCard
            title="Quarterly"
            color="primaryLight"
            icon="./assets/images/signUp/subscriptionPlan3.png"
            price="10"
          />


        </Grid>
      </ContentArea>
    </Grid>
  );
};
export default SubscriptionPlans;
