import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Grid, Link, Checkbox, FormControlLabel } from "@mui/material";
import InputField from "../../components/inputField";
import ContentArea from "../../components/contentArea";
import AssetSection from "../../components/assetSection";
import GenderDropDown from "../../components/genderDropdown";
import InputPhoneField from "../../components/inputPhoneField";
import { useNavigate } from "react-router-dom";

import {
  registerUserStartAsync,
  setCurrentForm,
  setErrorMsg,
} from "../../redux/signup/SignupActions";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import DateOfBirthPicker from "../../components/dateOfBirthPicker";

const BasicInformation: React.FC<any> = () => {
    const navigate = useNavigate();
  
  const dispatch: any = useDispatch();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(new Date());
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    dateOfBirth: false,
  });
  const handleErrorUpdate = (field: any) => (isError: boolean) => {
    setErrors({
      ...errors,
      [field]: isError,
    });
  };

  const hasErrors = Object.values(errors).some((error) => error !== false);
  useEffect(() => {
    dispatch(setCurrentForm(CONSTANTS.SIGN_UP_BASIC_INFO));
    dispatch(setErrorMsg(""));
  }, [dispatch]);
  return (
    // page
    <Grid
      container
      direction="row"
      xs={12}
      className="w-screen h-screen relative"
    >
      {/* asset section */}
      <AssetSection
        backgroundSrc="/assets/images/signUp/basicInfoBg.png"
        modelsSrc="/assets/images/signUp/basicInfoModels.png"
      />
      {/* content section */}
      <ContentArea title="Create Account">
        <Grid
          direction="column"
          className="xs:w-[70%] xl:w-[80%] flex justify-center xs:gap-4 md:gap-0 h-full"
        >
          {/* First Name & Last Name */}
          <Grid
            direction="row"
            className="flex h-[55px] justify-evenly w-full mt-4"
          >
            <InputField
              type="text"
              placeholder="First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              onErrorUpdate={handleErrorUpdate("firstName")}
            />
            <InputField
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              onErrorUpdate={handleErrorUpdate("lasttName")}
            />
          </Grid>
          {/* Email */}
          <Grid className="flex h-[55px] justify-evenly w-full ">
            <InputField
              placeholder="Email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onErrorUpdate={handleErrorUpdate("email")}
            />
          </Grid>
          {/* Password & Confirm Password */}
          <Grid className="flex h-[60px] justify-evenly w-full ">
            <InputField
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onErrorUpdate={handleErrorUpdate("password")}
            />
            <InputField
              placeholder="Confirm Password"
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              onErrorUpdate={handleErrorUpdate("confirmPassword")}
            />
          </Grid>
          {/* Phone Number*/}
          <Grid className="flex justify-evenly w-full ">
            <InputPhoneField setPhone={setPhone} />
          </Grid>
          {/* DOB & Gender*/}
          <Grid className="flex h-[55px] justify-evenly w-full ">
            <DateOfBirthPicker
              setValue={setDob}
              onErrorUpdate={handleErrorUpdate("dateOfBirth")}
            />
            <GenderDropDown className="w-[30%]" setGender={setGender} />
          </Grid>
          {/* Terms and Policy Checkbox */}
          <Grid className="flex justify-center w-full mt-2 ml-6">
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  sx={{
                    color: "#408589",
                    "&.Mui-checked": {
                      color: "#408589",
                    },
                  }}
                />
              }
              label={
                <span className="text-sm font-Montserrat">
                  I agree to Terms and{" "}
                  <Link
                    href="/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link font-bold cursor-pointer"
                    underline="hover"
                    color="inherit"
                  >
                    Privacy Policy
                  </Link>
                </span>
              }
            />
          </Grid>
          {/* Sign Up Button */}
          <Grid className="flex flex-col items-center justify-evenly w-full mt-[4%]">
            <Button
              disabled={hasErrors}
              className={`${
                hasErrors ? "bg-gray-500" : "bg-primary"
              } text-contrastText drop-shadow-lg`}
              variant="contained"
              style={{
                width: "100%",
                fontFamily: "Montserrat",
                margin: "4%",
                borderRadius: "15px",
                height: "52px",
              }}
              onClick={() => {
                if (!agreed) {
                    dispatch(setErrorMsg("Please agree to Terms and Privacy Policy"));
                } else if (!(password && email && firstName && lastName)) {
                  dispatch(setErrorMsg("Please fill required fields"));
                } else if (password === confirmPassword && password) {
                  dispatch(
                    registerUserStartAsync(
                      {
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        phone: phone,
                        password: password,
                        gender: gender,
                        dob: dob,
                      },
                      setErrorMsg
                    )
                  );
                } else {
                  dispatch(setErrorMsg("Confirm Password does not match"));
                }
              }}
            >
              Sign Up
            </Button>{" "}
            {/* Sign In option */}
            <Grid className="Montserrat-text text-xs flex justify-start w-full m-4">
              Have an account ?&nbsp;

              <span
                className="text-link font-bold cursor-pointer"
                onClick={() => navigate("/login")}
              >Login</span>

            </Grid>
          </Grid>
        </Grid>
      </ContentArea>
    </Grid>
  );
};

export default BasicInformation;
