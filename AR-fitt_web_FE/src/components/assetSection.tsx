import React from "react";
import { Grid } from "@mui/material";

interface AssetSectionProps {
  backgroundSrc: string;
  modelsSrc: string;
  className?: string;
}

const AssetSection: React.FC<AssetSectionProps> = ({
  backgroundSrc,
  modelsSrc,
  className,
}) => {
  return (
    <Grid
      item
      className={`${className} xs:hidden sm:flex w-[40%] h-screen relative`}
    >
      <img
        src={backgroundSrc}
        className="w-full h-full object-cover absolute z-1"
        alt="Background"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-gray-400 bg-opacity-20 backdrop-blur-[17.5px]"></div>

      <img
        src={modelsSrc}
        className="w-full h-full object-cover absolute z-2 right-0"
        alt="Models"
      />
    </Grid>
  );
};

export default AssetSection;
