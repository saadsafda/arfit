import { Button, Grid } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import InputField from "../../components/inputField";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMsg } from "../../redux/signup/SignupActions";
import HTTPService from "../../services/base.service";
import { useQuery } from "react-query";
import signupService from "../../services/signup.service";
import CONSTANTS from "../../utils/constants/CONSTANTS";

const ResetPassword: React.FC = () => {
  const email = useSelector((state: any) => state.signup.userDetails).email;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [errors, setErrors] = useState({
    password: false,
    confirmPassword: false,
  });
  const dispatch = useDispatch();
  const handleErrorUpdate = (field: any) => (isError: boolean) => {
    setErrors({
      ...errors,
      [field]: isError,
    });
  };
  const hasErrors = Object.values(errors).some((error) => error !== false);

  localStorage.setItem(CONSTANTS.ACCESS_TOKEN, token);
  HTTPService.setToken(token);

  const { refetch: resetPassword } = useQuery(
    "resetPassword",
    async () => signupService.resetPassword(email, password),
    {
      enabled: false,
      onSuccess: () => {
        navigate("/login");
      },
      onError: (err: any) => {
        dispatch(setErrorMsg(err?.response.data.message));
      },
    }
  );
  function handlePasswordReset(): any {
    if (!password) {
      dispatch(setErrorMsg("Please fill in the required fields"));
      return;
    }
    if (confirmPassword !== password) {
      dispatch(setErrorMsg("Passwords do not match"));
      return;
    }
    resetPassword();
  }
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setErrorMsg(null));
    Object.keys(localStorage).forEach((key) => {
      if (!key.startsWith("recommendedColors_")) {
        localStorage.removeItem(key); // Clear all keys except recommended colors
      }
    });
    // localStorage.clear();
    sessionStorage.clear();
  });
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
      <ContentArea title="Reset Password">
        <Grid
          direction="column"
          className="w-[70%] h-full flex justify-evenly items-center "
        >
          <p className="font-Montserrat text-sm flex justify-center text-center">
            Please enter a new password below. For security reasons, ensure that
            your new password is not similar to your previous one
          </p>
          <Grid className="flex w-full h-[70px]">
            <InputField
              type="password"
              placeholder="Password"
              className=""
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onErrorUpdate={handleErrorUpdate("password")}
            />
          </Grid>
          <Grid className="flex w-full h-[70px]">
            <InputField
              type="password"
              placeholder="Confirm Password"
              className=""
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              onErrorUpdate={handleErrorUpdate("confirmPassword")}
            />
          </Grid>

          <Grid
            direction="row"
            className="flex items-center  w-[100%] h-[40%]  "
          >
            <Button
              disabled={hasErrors}
              className={`${
                hasErrors ? "bg-gray-500" : "bg-primary"
              } text-contrastText font-bold h-12`}
              variant="contained"
              disableElevation={true}
              style={{
                width: "100%",
                fontFamily: "Montserrat",
                margin: "4%",
                borderRadius: "10px",
                // height: "30%",
              }}
              onClick={() => {
                handlePasswordReset();
              }}
            >
              Reset Password
            </Button>
          </Grid>
        </Grid>
      </ContentArea>
    </Grid>
  );
};
export default ResetPassword;
