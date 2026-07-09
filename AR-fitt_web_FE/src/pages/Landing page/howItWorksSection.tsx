import { Grid } from "@mui/material";
import Carousel from "../../components/carousel";

const HowItWorksSection: React.FC<{}> = () => {
  return (
    <>
      {/* Features section */}
      <Grid
        container
        direction="row"
        xs={12}
        className="w-screen sm:h-screen xs:h-3/4 relative bg-white"
        id="howItWorks"
      >
        <Grid
          direction="column"
          className=" h-[90%] w-[100%] flex justify-start items-center "
        >
          <div className=" font-Dhurjati text-primarySaturated font-normal text-base leading-9 mt-4">
            HOW IT WORKS
          </div>
          {/*Some Description */}
          <Grid
            direction="column"
            className=" lg:w-[40%] lg:h-[100%] xl:w-[40%] xl:h-[100%] mx-4 flex items-center xs:hidden md:flex "
          >
            <div className="font-Dhurjati font-normal text-3xl leading-7 text-center">
              Browse, Try, Transform: Elevating Your Style, Step by Step.{" "}
            </div>
          </Grid>
          {/* Carousel */}
          <Grid
            direction="column"
            className=" lg:w-[85%] lg:h-[90%] xl:w-[80%] xl:h-[100%]  flex items-center "
          >
            <div className="xs:w-[280px] md:w-[700px] lg:w-[800px] h-[100%] mt-8  flex">
              <Carousel />
            </div>
            {/*Some Description in mobile view */}
            <Grid
              direction="column"
              className=" lg:w-[40%] lg:h-[100%] xl:w-[40%] xl:h-[100%] mx-4 flex items-center xs:flex md:hidden "
            >
              <div className="font-Dhurjati font-normal text-3xl leading-7 text-center">
                Browse, Try, Transform: Elevating Your Style, Step by Step.{" "}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default HowItWorksSection;
