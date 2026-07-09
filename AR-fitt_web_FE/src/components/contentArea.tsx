/* eslint-disable jsx-a11y/alt-text */
import { Alert, Grid } from "@mui/material";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { setCurrentForm } from "../redux/signup/SignupActions";
import "../styles/signupStyles.css";

interface ContentAreaProps {
  children: ReactNode;
  title?: string;
  removeLogo?: boolean;
  className?: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({
  children,
  title,
  removeLogo,
  className,
}) => {
  const navigate = useNavigate();
  const error = useSelector((state: any) => state.signup.errorMessage);
  const getPreviousForm = (title?: string, setCurrentForm?: any) => {
    navigate(-1);
  };
  return (
    <Grid
      className={`${className} bg-white sm:rounded-tl-[40px] xs:w-[100%] sm:w-[65%] sm:absolute left-[35%] h-screen flex flex-col items-center overflow-y-auto`}
    >
      {error && (
        <Alert severity="error" className="absolute">
          {error}{" "}
        </Alert>
      )}
      {/* logo and back button */}
      <Grid
        direction="row"
        className=" w-[100%] h-[100px] flex justify-between"
      >
        <div className="w-[30%] h-[100%] flex justify-start items-end">
          <ArrowBackRoundedIcon
            onClick={() => {
              getPreviousForm(title, setCurrentForm);
            }}
            sx={{ color: "white" }}
            className="self-center bg-primary rounded-[50%] scale-150 ml-8 mt-6 cursor-pointer"
          />
        </div>
        {/* title */}
        <Grid className="font-Montserrat font-bold xs:text-xl md:text-3xl text-primary flex justify-center items-end text-center">
          {title}
        </Grid>
        {/* logo */}
        <div className="w-[30%] h-[100%] flex justify-end ">
          <img
            className="self-end flex justify-end mr-6 h-[60%]"
            style={{ display: `${removeLogo ? "none" : "block"}` }}
            src="/assets/images/logo.png"
          />
        </div>
      </Grid>

      {children}
    </Grid>
  );
};

export default ContentArea;
