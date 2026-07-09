import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import HomeNavbar from "../components/HomePage/homeNavbar";
import CONSTANTS from "../utils/constants/CONSTANTS";
import UnauthorisedPage from "../pages/Unauthorised page/unauthorisedPage";
import { jwtDecode } from "jwt-decode";

const HomeLayout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";
  const userDetails = useSelector(
    (state: RootState) => state.signup.userDetails
  );
  const guestDetails = useSelector(
    (state: RootState) => state.signup.guestDetails
  );

  const [token, setToken] = useState(
    localStorage.getItem(CONSTANTS.ACCESS_TOKEN)
  );

  const isTokenExpired = () => {
    if (token) {
      const exp = jwtDecode(token).exp;
      if (exp) return exp < Math.floor(Date.now() / 1000);
    } else return true;
  };
  useEffect(() => {
    setToken(localStorage.getItem(CONSTANTS.ACCESS_TOKEN));
  }, [userDetails, guestDetails]);

  return (
    <>
      {!isTokenExpired() && (userDetails.isSubscribed || guestDetails.id) ? (
        <Grid
          className="p-2 h-screen overflow-auto flex justify-center"
          style={
            isHomePage
              ? {
                  backgroundImage:
                    'url("/assets/images/homePage/homeHeroBg.png")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  overflowY: "auto",
                  maxHeight: "100vh",
                }
              : { backgroundColor: "white" }
          }
        >
          <Grid className="max-w-[1440px] w-full min-h-screen">
            <HomeNavbar />
            <Outlet />
          </Grid>
        </Grid>
      ) : (
        <UnauthorisedPage />
      )}
    </>
  );
};

export default HomeLayout;
