import React, { useState } from "react";
import { Box } from "@mui/material";

const ImageSlider = ({ images }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleThumbnailClick = (index: any) => {
    setCurrentIndex(index);
  };

  return (
    <Box
      sx={{ maxWidth: "100%", position: "relative" }}
      className="flex flex-col gap-4 items-center justify-start"
    >
      {/*  */}
      <Box
        className="max-mui_md:min-w-[50%] max-mui_md:max-w-[70%] min-w-[90%] max-w-full mui_md:min-h-[400px] mui_md:max-h-[500px]
        overflow-hidden rounded-xl bg-white flex justify-center items-center
      "
      >
        {images.map((image: any, index: any) => (
          <Box
            key={index}
            sx={{
              opacity: currentIndex === index ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
            className="w-full h-full"
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        ))}
      </Box>
      {/* Thumb Nails */}
      <Box className="flex justify-center">
        {images.map((image: any, index: any) => (
          <Box
            key={index}
            sx={{
              width: "60px",
              height: "60px",
              margin: "5px",
              borderRadius: "5px",
              overflow: "hidden",
              cursor: "pointer",
              border:
                currentIndex === index ? "2px solid #007bff" : "1px solid #ddd",
            }}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImageSlider;
