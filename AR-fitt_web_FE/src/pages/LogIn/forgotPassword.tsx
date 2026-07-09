import { Alert, Button, Grid } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import InputField from "../../components/inputField";
import { useARfittContext } from "../../context/storeContext";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setErrorMsg, setUserDetails } from "../../redux/signup/SignupActions";
import { useQuery } from "react-query";
import loginService from "../../services/login.service";

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, setEmail } = useARfittContext();
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
  });
  const handleErrorUpdate = (field: any) => (isError: boolean) => {
    setErrors({
      ...errors,
      [field]: isError,
    });
  };
  const hasErrors = Object.values(errors).some((error) => error !== false);

  const { refetch: forgetPassword } = useQuery(
    "forgetPassword",
    async () => loginService.forgetPassword(email, dispatch),
    {
      enabled: false,
      onSuccess: () => {
        setEmailSent(true);
      },
    }
  );
  function resetPasswordClicked(): any {
    if (!email) {
      dispatch(setErrorMsg("Please fill in the required fields"));
      return;
    }
    dispatch(
      setUserDetails({
        email: email,
      })
    );
    forgetPassword();
  }
  return (
    <Grid
      container
      direction="row"
      xs={12}
      className="w-screen h-screen relative"
    >
      {/* asset section */}
      <AssetSection
        backgroundSrc="/assets/images/logIn/logInBg.png"
        modelsSrc="/assets/images/logIn/logInModels.png"
      />
      <ContentArea title="Forgot Password ?">
        <Grid
          direction="column"
          className="w-[70%] h-full flex justify-center xs:items-start md:items-center "
        >
          <p className="font-Montserrat text-sm flex justify-center text-center">
            Don't worry, we'll send you instructions to reset your password via
            email. Please enter your email address below to proceed.
          </p>
          <Grid className="flex w-full h-[70px]">
            <InputField
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onErrorUpdate={handleErrorUpdate("email")}
            />
          </Grid>
          <Grid
            direction="row"
            className="flex items-center justify-center w-[100%] h-[100px]  "
          >
            <Button
              className={`bg-white text-primary border-solid border-black border h-[80%] font-bold xs:text-xs md:text-base`}
              disableElevation={true}
              variant="contained"
              style={{
                width: "100%",
                fontFamily: "Montserrat",
                margin: "4%",
                borderRadius: "10px",
                height: "50px",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Back to Login
            </Button>
            <Button
              disabled={hasErrors}
              className={`${
                hasErrors ? "bg-gray-500" : "bg-primary"
              } text-contrastText font-bold xs:text-xs md:text-base`}
              variant="contained"
              disableElevation={true}
              style={{
                width: "100%",
                fontFamily: "Montserrat",
                margin: "4%",
                borderRadius: "10px",
                height: "50px",
              }}
              onClick={() => {
                resetPasswordClicked();
              }}
            >
              Reset Password
            </Button>
          </Grid>
        </Grid>
        <Alert
          className={`${
            !emailSent ? "hidden" : ""
          } w-[80%] font-Montserrat font-normal text-sm leading-6 text-center text-black absolute bottom-0`}
          icon={<CheckCircleIcon fontSize="inherit" />}
          severity="success"
        >
          We've just sent you an email. Please check your inbox to continue
          resetting your password.
        </Alert>
      </ContentArea>
    </Grid>
  );
};
export default ForgotPassword;
