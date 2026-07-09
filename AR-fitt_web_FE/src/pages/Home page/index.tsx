import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RedirectionModal from "../../components/HomePage/redirectionModal";
import CONSTANTS from "../../utils/constants/CONSTANTS";

const HomePage = () => {
  const userDetails = useSelector((state: any) => state.signup.userDetails);
  const isFaceScanPresent = userDetails.isBodyScanned;
  const isBodyScanPresent = userDetails.isBodyScanned;
  const guestDetails = useSelector((state: any) => state.signup.guestDetails);
  const isGuestFaceScanPresent = guestDetails.isFaceScanned;
  const isGuestBodyScanPresent = guestDetails.isBodyScanned;
  const fullname = userDetails.firstName + " " + userDetails.lastName;
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [redirectionLink, setRedirectionLink] = useState("");

  const handleContinueClick = () => {
    if (
      isGuestBodyScanPresent ||
      isBodyScanPresent ||
      isFaceScanPresent ||
      isGuestFaceScanPresent
    )
      navigate(
        `/home/suggestion?type=${
          isBodyScanPresent || isGuestBodyScanPresent
            ? CONSTANTS.APPAREL_TITLE
            : CONSTANTS.COSMETICS_TITLE
        }`
      );
    else {
      setRedirectionLink(CONSTANTS.SIGN_UP_CATEGORIES);
      setModalOpen(true);
    }
  };

  return (
    <Grid
      item
      container
      className="my-10
        w-full sm:h-[70%] sm:min-h-[500px]
        flex max-mui_md:justify-center mui_md:justify-between
      "
      gap={1}
    >
      {/* Image Grid */}
      <Grid
        item
        xs={12}
        md={7}
        lg={5}
        className="
          inline-block
          flex flex-col justify-center
          items-center
          mui_md:h-full overflow-hidden p-0
        "
      >
        <img
          className="overflow-hidden
            max-mui_md:min-h-[200px] max-mui_md:max-h-[550px]
            mui_md:max-h-[95%] min-w-[65%] max-w-[90%]
          "
          src="assets/images/landingPage/heroSection/landingPageModels.png"
          alt="hero-img"
        />
      </Grid>
      {/* Desc Grid */}
      <Grid
        item
        xs={12}
        md={4.5}
        lg={6.5}
        className="p-0 flex max-mui_md:justify-center max-mui_md:items-start pb-10"
      >
        <Box
          className="
            inline-block max-w-[700px]
            flex flex-col justify-center items-center mui_md:items-start
          "
        >
          <h1
            className="
            font-Bungee text-white
            max-mui_md:text-center
            max-sm:text-[40px] max-mui_md:text-[60px] text-[90px]
            tracking-[10px] leading-[1] inline-block mb-0
          "
          >
            AR-FITT
          </h1>
          <Box className="inline-block w-[85%] max-mui_md:flex max-mui_md:flex-col max-mui_md:items-center max-mui_md:justify-center">
            <h2 className="font-Dhurjati max-sm:text-[25px] max-mui_md:text-[35px] text-[40px] max-mui_md:text-center text-white leading-[1]">
              Welcome! {fullname}
            </h2>
            <h2 className="font-Dhurjati max-sm:text-[18px] max-mui_md:text-[20px] text-[25px] max-mui_md:text-center text-white leading-[1] mt-0 mb-[10px]">
              Elevate Your Style: Explore Our Platform Features.
            </h2>
            <p className="font-Dhurjati mui_md:hidden mui_lg:block max-sm:text-sm max-mui_md:text-center text-lg text-white inline-block">
              Upon sign-up, you'll dive straight into exploring our array of
              features designed to elevate your style journey. Should you
              require assistance, our intuitive interface and comprehensive
              guides ensure a smooth onboarding process.
            </p>
            <Button
              className="px-2 py-1 mui_md:py-3 mui_md:px-5 bg-primaryDark rounded-lg mui_md:mt-5"
              onClick={handleContinueClick}
            >
              <Typography className="font-Dhurjati max-sm:text-[18px] text-[22px] text-white text-bold">
                Continue
              </Typography>
            </Button>
            <RedirectionModal
              open={modalOpen}
              setOpen={setModalOpen}
              redirection={redirectionLink}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomePage;
