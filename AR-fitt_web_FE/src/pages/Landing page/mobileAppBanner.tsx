import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MobileAppBanner = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      direction="row"
      xs={12}
      className="w-screen h-80 flex justify-center items-center relative py-10"
    >
      {/* Text Area */}
      <Grid
        item
        direction="column"
        className=" w-[65%] lg:w-[55%] xl:w-[45%] md:h-[100%] sm:h-[80%] xs:h-[70%] flex justify-center xs:pl-4 md:pl-10 bg-gradient-to-b from-primarySaturated to-[#9DC3C5] rounded-3xl"
      >
        {/* Title */}
        <div className=" xs:w-[80%] lg:w-[85%] xl:w-[80%]  font-Montserrat font-bold xs:text-xs md:text-2xl xl:text-3xl leading-11 tracking-tight xs:mb-2 md:mb-4">
          Transform Your Wardrobe with a Swipe!
        </div>
        {/* Description */}
        <div className=" w-[80%] lg:w-[80%] xl:w-[70%] font-Montserrat font-normal xs:text-xs md:text-base leading-6 xs:mb-2 md:mb-4">
          Get ready to revolutionize your fashion journey with ARFitt's mobile
          app. Download now to get started and discover endless style
          possibilities!
        </div>
        {/* Google Play button */}
        <Grid
          item
          className=" h-[13%] lg:h-[13%] xl:h-[15%] flex cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate('/download-app')}
        >
          <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 5.25V4.5z" clipRule="evenodd" />
            </svg>
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] font-medium">Download for</span>
              <span className="text-sm font-bold">Android</span>
            </div>
          </div>
        </Grid>
      </Grid>

    </Grid >
  );
};

export default MobileAppBanner;
