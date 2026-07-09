import { Grid, useMediaQuery } from "@mui/material";
import HeroSectionCard from "../../components/heroSectionCard";
import CallToActionButton from "../../components/callToActionButton";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import { isTokenValid } from "../../utils/helpers/auth";

const HeroSection: React.FC<{}> = () => {
  const isMobileView = useMediaQuery(CONSTANTS.MOBILE_VIEW_MAX_WIDTH);
  const shouldShowCTA = !isTokenValid(localStorage.getItem(CONSTANTS.ACCESS_TOKEN));

  return (
    <>
      {/* Hero section */}
      <Grid
        id="home"
        container
        direction="row"
        xs={12}
        className="w-screen md:h-screen relative mt-[-60px]"
      >
        {/* white panel on left */}
        <Grid
          item
          className="md:bg-white xs:bg-primarySaturated h-[100%] w-[30%] xs:hidden md:flex "
        >
          <Grid
            item
            direction="column"
            className="pl-6 self-center w-[80%] h-[60%] self-center "
          >
            <img
              alt="asset1"
              src="/assets/images/landingPage/heroSection/landingPageDemoAsset.png"
              className=" self-center  mt-0 h-[80%] lg:h-[80%] xl:h-[80%] md:h-[60%] "
            />
            <div className=" lg:w-[80%] xl:w-[60%] font-Dhurjati font-normal text-lg text-gray-500">
              Style Made Simple, virtual Fashion with AR-Fitt. Let's Elevate
              Your Look
            </div>
            {shouldShowCTA && (
              <CallToActionButton
                className="z-30"
                nav="/getStarted"
                title="Get Started"
              />
            )}
          </Grid>
          {/* AR-FITT dual tone */}
          <img
            alt="asset2"
            src="/assets/images/landingPage/heroSection/landingPageHeroSectionText.png"
            className="absolute  left-[27%] xl:left-[27.5%]  lg:left-[27%] h-[77%]  xl:h-[80%] lg:h-[77%] top-[15%] xs:hidden md:flex"
          />
        </Grid>
        {/* Green panel on right */}

        <Grid
          item
          direction="row"
          className="bg-primarySaturated xs:h-[70%] xsm:h-[80%] sm:h-[90%] md:h-[100%] xs:w-[100%] md:w-[70%] flex md:justify-start xs:justify-center  xs:items-end"
        >
          <Grid className="xs:h-[80%]  md:h-[85%] xs:w-[80%] md:w-[100%] flex  xs:items-end xs:justify-center lg:justify-center md:justify-end">
            {/* Hero Section Models + Grafitti*/}
            <div className="flex flex-col md:justify-end xs:justify-end relative h-[100%]">
              <img
                alt="asset3"
                className="z-10 xs:max-w-full sm:max-w-none xs:h-[90%] md:h-[100%] mt-12"
                src={`/assets/images/landingPage/heroSection/${
                  isMobileView
                    ? "heroSectionModelsMobile.png"
                    : "heroSectionModels.png"
                }`}
              />
              <div className=" absolute bg-gradient-to-b from-transparent to-primarySaturated w-[100%] h-[4%] z-20 xs:hidden lg:block " />
            </div>
          </Grid>
          {/* Explore your style cards */}
          <Grid className="z-20 absolute h-[35%] w-full right-0 mb-4 flex md:justify-end xs:justify-center xs:top-1/2 md:top-auto">
            <Grid className="xs:w-[45%] lg:w-[35%] md:items-end xs:items-center xs:flex flex-col md:block">
              <div className="flex justify-center items-center xs:bg-opacity-80  xs:bg-white  md:bg-[#282828] md:bg-opacity-80 rounded-md  md:w-[200px] xs:w-[250px] font-Dhurjati font-normal text-base md:text-lg lg:text-xl xl:text-2xl text-center leading-tight tracking-wide md:text-white xs:text-black">
                {isMobileView
                  ? "Style Made Simple, virtual Fashion with AR-Fitt. Let's Elevate Your Look"
                  : "EXPLORE YOUR STYLE"}
              </div>
              {shouldShowCTA && (
                <CallToActionButton
                  className="xs:block md:hidden"
                  nav="/getStarted"
                  title="Get Started"
                />
              )}
              <Grid direction="row" className="h-[100%] xs:hidden md:flex">
                <HeroSectionCard
                  color="blue"
                  title="SUGGESTIONS"
                  icon="landingPageSuggestionsIcon.png"
                />
                <HeroSectionCard
                  color="pink"
                  title="COSMETICS"
                  icon="landingPageCosmeticsIcon.png"
                />
                <HeroSectionCard
                  color="purple"
                  title="APPARELS"
                  icon="landingPageApparelsIcon.png"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* Features section */}
    </>
  );
};
export default HeroSection;
