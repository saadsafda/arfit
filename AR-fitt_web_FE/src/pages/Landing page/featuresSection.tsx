import { Grid } from "@mui/material";
import features from "./features.json";
import CallToActionButton from "../../components/callToActionButton";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import { isTokenValid } from "../../utils/helpers/auth";

const FeaturesSection: React.FC<{}> = () => {
  const shouldShowCTA = !isTokenValid(localStorage.getItem(CONSTANTS.ACCESS_TOKEN));

  return (
    <>
      {/* Features section */}
      <Grid
        id="features"
        container
        direction="row"
        xs={12}
        className="w-screen md:h-screen relative bg-white"
      >
        <Grid
          item
          direction="row"
          className="md:h-[30%] w-[100%] flex justify-start items-start"
        >
          {/* Black Logo section */}
          <div className="w-[30%] justify-center items-center h-[100%] xs:hidden md:flex">
            {" "}
            <img
              alt="AR-fitt black logo"
              src="/assets/images/logoBlack.png"
              className="scale-75 "
            />
          </div>
          {/* Gradient section */}
          <Grid
            id="aboutUs"
            direction="column"
            className=" h-[100%] md:w-[70%] xs:w-[100%]  md:bg-gradient-to-b from-primarySaturated to-transparent flex justify-start items-center font-Dhurjati font-normal"
          >
            <div className=" w-[90%]">
              <div className=" md:text-3xl xs:text-lg leading-7 text-center md:mb-5 ">
                Fashion at Your Fingertips: Explore Your Style Now
              </div>
              <div className=" xs:text-xs xsm:text-sm  xl:text-base leading-[1.5]  text-center  ">
                AR-Fitt brings the future of fashion to your fingertips,
                offering an immersive virtual try-on experience. From clothing
                to cosmetics, discover your perfect look with ease. Our
                AI-powered recommendations and personalized skin profiles ensure
                every style choice reflects your unique personality.
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid className=" md:h-[60%] w-[100%] flex justify-center items-center xs:flex-col lg:flex-row xs:mt-0 md:mt-4">
          {/* text area */}
          <Grid item direction="column" className="w-[40%] xs:hidden lg:flex">
            {/* features */}
            <div className=" font-Dhurjati text-primarySaturated font-normal text-base leading-9">
              FEATURES
            </div>
            <div className="font-Dhurjati font-normal text-4xl leading-7">
              {" "}
              Elevate Your Style: Explore Our Platform Features.
            </div>
            <div className="font-Dhurjati font-normal text-base leading-[1.5] mt-6">
              Upon sign-up, you'll dive straight into exploring our array of
              features designed to elevate your style journey. Should you
              require assistance, our intuitive interface and comprehensive
              guides ensure a smooth onboarding process. Get ready to unlock the
              full potential of AR-Fitt and discover a world of virtual fashion
              at your fingertips
              {shouldShowCTA && (
                <div className=" mt-4 w-[50%]">
                  <CallToActionButton nav="/signup" title="Sign Up" />
                </div>
              )}
            </div>
          </Grid>
          {/*features asset area / table*/}
          {/* features */}
          <div className=" font-Dhurjati text-primarySaturated font-normal text-base leading-9 xs:flex md:hidden">
            FEATURES
          </div>
          <Grid item className="xs:w-[100%] xl:w-[40%] lg:w-[45%] self-end">
            {/* rows */}
            {Array.from({ length: 2 }).map((_, index) => (
              <Grid
                direction="row"
                item
                className="w-[100%] h-[50%] lg:justify-end xs:justify-center flex"
                key={index}
              >
                {Array.from({ length: 2 }).map((_, indexj) => (
                  <div
                    className="bg-primarySaturated w-[160px] h-[160px] md:m-2 xs:m-1 flex flex-col justify-center items-start pl-2"
                    key={indexj}
                  >
                    <div className="bg-[#d9d9d9] rounded-full w-[40px] h-[40px]  bg-opacity-15 mb-1 flex justify-center items-center">
                      <img
                        alt="features"
                        src={`/assets/images/landingPage/featuresSection/${
                          features[2 * index + indexj].icon
                        }`}
                        className="h-[60%]"
                      />
                    </div>
                    <div className=" w-[90%]  font-Dhurjati font-normal xs:text-sm sm:text-base text-white text-justify">
                      {features[2 * index + indexj].title}
                    </div>
                    <div className=" w-[90%] font-Dhurjati leading-3 text-xs text-white ">
                      {features[2 * index + indexj].description}
                    </div>
                  </div>
                ))}
              </Grid>
            ))}
          </Grid>
          <div className="font-Dhurjati font-bold xs:text leading-7 xs:flex lg:hidden">
            {" "}
            Elevate Your Style: Explore Our Platform Features.
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default FeaturesSection;
