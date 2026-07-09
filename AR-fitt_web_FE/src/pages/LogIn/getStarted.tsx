import { Button, Grid, Link } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentForm, setErrorMsg } from "../../redux/signup/SignupActions";
import { useEffect, useState } from "react";
import GuestLoginCard from "../../components/guestLoginCard";
import CONSTANTS from "../../utils/constants/CONSTANTS";

const GetStarted: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id") ?? "";

  useEffect(() => {
    dispatch(setErrorMsg(null));
    if (!session_id) {
      dispatch(setCurrentForm(CONSTANTS.SIGN_UP_BASIC_INFO));
    }
    // localStorage.clear();

    Object.keys(localStorage).forEach((key) => {
      if (!key.startsWith("recommendedColors_")) {
        localStorage.removeItem(key); // Clear all keys except recommended colors
      }
    });
    sessionStorage.clear();
  }, [dispatch, session_id]);
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
      <ContentArea removeLogo>
        <Grid
          direction="column"
          className="w-[70%] h-[90%] flex justify-start items-center "
        >
          <img
            alt="logo"
            src="/assets/images/logo.png"
            className=" mb-10 h-[20%]"
          />
          {/* Login and Guest buttons */}
          <Grid
            direction="column"
            className="flex items-center justify-center w-[80%] h-[60%] mt-[3%] "
          >
            {/* Login button */}
            <Button
              className="bg-primary text-contrastText font-bold xs:w-[200px] md:w-[300px]"
              disableElevation={true}
              variant="contained"
              style={{
                fontFamily: "Montserrat",
                margin: "4%",
                borderRadius: "10px",
                height: "50px",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            {/* OR */}
            <Grid
              direction="row"
              item
              className="font-Montserrat flex w-[90%]  my-6 "
            >
              <div className="border-b border-x-0 border-t-0 border-solid border-[#969696] w-[40%] m-2" />
              OR
              <div className="border-b border-x-0 border-t-0 border-solid border-[#969696] w-[40%] m-2" />
            </Grid>
            {/* Guest Button */}
            <Button
              className="bg-white text-primary border-solid border-black border font-bold xs:w-[200px] md:w-[300px]"
              variant="contained"
              disableElevation={true}
              style={{
                fontFamily: "Montserrat",
                margin: "4%",
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
            {/* SIGN UP TEXT */}
            <Grid className="Montserrat-text text-xs flex justify-center w-full m-4">
              Don't have an account ?&nbsp;
              <Link href="/signup" className="text-link font-bold">
                {" "}
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </ContentArea>
    </Grid>
  );
};
export default GetStarted;
