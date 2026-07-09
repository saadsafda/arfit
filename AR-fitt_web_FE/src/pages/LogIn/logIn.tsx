import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import InputField from "../../components/inputField";
import {
  registerUserStart,
  setCurrentForm,
  setErrorMsg,
  setSubscriptionFailure,
  setSubscriptionSuccess,
  setUserDetails,
} from "../../redux/signup/SignupActions";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import { useDispatch } from "react-redux";
import GuestLoginCard from "../../components/guestLoginCard";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HTTPService from "../../services/base.service";
import loginService from "../../services/login.service";
import { useMutation } from "react-query";
import { isTokenValid } from "../../utils/helpers/auth";

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleErrorUpdate = (field: any) => (isError: boolean) => {
    setErrors({
      ...errors,
      [field]: isError,
    });
  };
  const hasErrors = Object.values(errors).some((error) => error !== false);
  const { mutate: login } = useMutation(
    async () => loginService.login(email, password),
    {
      onSuccess: (res: any) => {
        dispatch(registerUserStart());

        console.log("login details");
        console.log(res.data.message);

        dispatch(setUserDetails(res.data.message));

        const token = res.headers[CONSTANTS.ACCESS_TOKEN];
        if (token) {
          localStorage.setItem(CONSTANTS.ACCESS_TOKEN, token);
          HTTPService.setToken(token);
        }
        if (!res.data.message.isVerified) {
          dispatch(setCurrentForm(CONSTANTS.SIGN_UP_OTP_VERIFICATION));
          navigate("/signup");
        } else if (!res.data.message.isSubscribed) {
          dispatch(setSubscriptionFailure("User is not subscribed"));
          dispatch(setCurrentForm(CONSTANTS.SIGN_UP_SUBSCRIPTION));
          navigate("/signup");
        } else {
          navigate("/home");
          dispatch(setSubscriptionSuccess());
        }
      },
      onError: (err: any) => {
        setError(err?.response.data.message);
      },
    }
  );
  function authenticateUser(): any {
    if (!(email && password)) {
      setError("Please fill in the required fields");
      return;
    }
    login();
  }
  useEffect(() => {
    const token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
    if (isTokenValid(token)) {
      navigate("/home");
      return;
    }
    dispatch(setErrorMsg(null));
    Object.keys(localStorage).forEach((key) => {
      if (!key.startsWith("recommendedColors_")) {
        localStorage.removeItem(key); // Clear all keys except recommended colors
      }
    });
    sessionStorage.clear();
  }, [dispatch, navigate]);
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
      <ContentArea title="Let's sign you in.">
        {error && (
          <Alert severity="error" className="absolute">
            {error}{" "}
          </Alert>
        )}
        <Grid
          direction="column"
          className="w-[70%] h-full flex justify-center items-center"
        >
          <p className="font-Montserrat text-sm flex justify-center text-center">
            Welcome Back!
          </p>
          <Grid className="flex h-[72px] justify-evenly w-full ">
            <InputField
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onErrorUpdate={() => handleErrorUpdate("email")}
            />
          </Grid>

          {/* password field without validation checks */}
          <Grid className="flex h-[72px] justify-evenly w-full ">
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className={`border-0 border-b border-[#646262] m-2 w-full text-xs font-Montserrat`}
              inputProps={{ color: "#00ff00" }}
              variant="standard"
              type={showPassword ? "text" : "password"}
              placeholder={"Password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid
            direction="column"
            className="flex items-center justify-center w-[80%] mt-[3%] "
          >
            <Button
              disabled={hasErrors}
              className={`${hasErrors ? "bg-gray-500" : "bg-primary"
                } text-contrastText font-bold xs:w-[200px] md:w-[300px]`}
              disableElevation={true}
              variant="contained"
              style={{
                fontFamily: "Montserrat",
                margin: "4%",
                borderRadius: "10px",
                height: "50px",
              }}
              onClick={() => {
                authenticateUser();
              }}
            >
              Login
            </Button>
            <Button
              className="bg-white text-primary border-solid border-black border font-bold xs:w-[200px] md:w-[300px]"
              variant="contained"
              disableElevation={true}
              style={{
                fontFamily: "Montserrat",
                margin: "4px",
                borderRadius: "10px",
                height: "50px",
              }}
              onClick={() => {
                setOpen(true);
              }}
            >
              Continue As Guest
            </Button>
            <GuestLoginCard open={open} setOpen={setOpen} />

            <Grid className="Montserrat-text text-xs flex justify-center w-full m-4">
              Don't have an account ?&nbsp;
              <span
                className="text-link font-bold cursor-pointer"
                onClick={() => navigate("/signup")}
              >Signup</span>

            </Grid>
          </Grid>
        </Grid>
      </ContentArea>
    </Grid>
  );
};
export default LogIn;
