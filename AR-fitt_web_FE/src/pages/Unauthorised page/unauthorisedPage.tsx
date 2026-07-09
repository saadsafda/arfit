import { Grid } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";
const UnauthorisedPage = () => {
  const navigate = useNavigate();
  return (
    <Grid
      className="p-2 h-screen overflow-auto flex justify-center"
      style={{
        backgroundImage: 'url("/assets/images/homePage/homeHeroBg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflowY: "auto",
        maxHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <p className="py-10 px-5 text-bold font-Montserrat text-xl text-white text-center">
        PLEASE LOGIN OR SIGNUP TO CONTINUE
      </p>
      <ArrowBackRoundedIcon
        onClick={() => {
          Object.keys(localStorage).forEach((key) => {
      if (!key.startsWith("recommendedColors_")) {
        localStorage.removeItem(key); // Clear all keys except recommended colors
      }
    });
          // localStorage.clear();
          sessionStorage.clear();
          navigate("/");
        }}
        sx={{ color: "white" }}
        className=" rounded-[50%] scale-150  cursor-pointer border-white border-solid border-1 self-center"
      />
    </Grid>
  );
};

export default UnauthorisedPage;
