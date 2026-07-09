import { useEffect } from "react";
import { Grid } from "@mui/material";
import AssetSection from "../../components/assetSection";
import ContentArea from "../../components/contentArea";
import SignUpCamera from "../../components/signUpCamera";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setErrorMsg } from "../../redux/signup/SignupActions";

interface ScanProps {
  type: string;
}

const Scan: React.FC<ScanProps> = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setErrorMsg(null));
    // if (!isSubscribed) dispatch(setCurrentForm(CONSTANTS.SIGN_UP_SUBSCRIPTION));
  });
  return (
    <Grid
      container
      direction="row"
      xs={12}
      className="w-screen h-screen relative"
    >
      {/* asset section */}
      <AssetSection
        backgroundSrc="/assets/images/signUp/scanningBg.png"
        modelsSrc="/assets/images/signUp/scanningModels.png"
      />
      <ContentArea title={type === "body" ? "Body Scanning" : "Face Scanning"}>
        <SignUpCamera type={type} />
        <Grid
          className=" w-[100%] h-[40px] pr-[20px] flex flex-row justify-end font-Montserrat font-bold xs:text-lg md:text-2xl text-[#408589] cursor-pointer"
          onClick={() => {
            navigate("/home");
          }}
        >
          Skip
        </Grid>
      </ContentArea>
    </Grid>
  );
};
export default Scan;
