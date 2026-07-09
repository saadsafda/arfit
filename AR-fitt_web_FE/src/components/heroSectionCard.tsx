import { Grid } from "@mui/material";
interface LandingPageCard {
  color: string;
  title: string;
  icon: string;
}
const HeroSectionCard: React.FC<LandingPageCard> = ({ color, title, icon }) => {
  const colorVariants = {
    pink: " bg-pink",
    purple: "bg-[#49416D]",
    blue: "bg-[#0C5D98]",
  };

  return (
    <Grid className="w-[200px] h-[75%] mt-4 mr-4 ">
      <div
        className={`${
          (colorVariants as any)[color]
        } rounded-t-xl w-[100%] h-[70%] bg-opacity-90 flex justify-center items-center`}
      >
        {
          <img
            alt="icon"
            className="h-[80%]"
            src={`/assets/images/landingPage/heroSection/${icon}`}
          />
        }
      </div>
      <div className=" flex  justify-center items-center bg-white rounded-b-xl w-[100%] h-[25%] font-Bungee text-center font-normal text-xs  xl:text-md ">
        {title}
      </div>
    </Grid>
  );
};

export default HeroSectionCard;
