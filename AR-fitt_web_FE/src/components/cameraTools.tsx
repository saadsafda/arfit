import { Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";
import { CameraType } from "react-camera-pro";
interface CameraToolsProps {
  cameraRef: React.RefObject<CameraType>;
  type?: string;
  onCapture: () => void;
  onRetry: () => void;
  onCancel: () => void;
  onSetTimer: () => void;
  onConfirm: () => void;
}

const CameraTools: React.FC<CameraToolsProps> = ({
  cameraRef,
  type,
  onCancel,
  onRetry,
  onCapture,
  onConfirm,
  onSetTimer,
}) => {
  const [isCountdown, setIsCountdown] = useState<boolean>(false);
  return (
    <Grid className="bg-primary h-[50px] w-[80%] rounded-xl	mt-4 flex justify-between items-center">
      {/* Cancel button */}
      <div className=" h-[73%] w-[35%] flex justify-end items-center">
        <div
          className={`${
            !isCountdown ? "bg-gray-500" : "bg-primaryDark"
          } h-[73%] w-[85%] rounded-xl font-Montserrat font-semibold text-xs leading-10 text-white flex justify-center items-center`}
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </div>
      </div>
      {/* Retry button */}
      <div className="h-[73%] w-[35%] flex justify-center items-center">
        <RefreshIcon
          sx={{ color: "white" }}
          onClick={() => {
            onRetry();
          }}
        />
      </div>
      {/* Capture button */}
      <div
        className="h-8 w-28 flex justify-center items-center "
        onClick={() => {
          onCapture();
        }}
      >
        <div className="border-4 border-solid border-white bg-red-500 h-[100%] w-[55%] xl:w-[50%] rounded-full flex justify-center items-center"></div>
      </div>
      {/* Tick button */}
      <div className=" h-[73%] w-[35%] flex justify-center items-center">
        <CheckCircleIcon
          sx={{ color: "white" }}
          onClick={() => {
            onConfirm();
            setIsCountdown(true);
          }}
        />
      </div>

      {/* Timer button */}
      <div className="h-[73%] w-[35%] flex  items-center">
        <div
          className="bg-primaryDark h-[73%] w-[85%] rounded-xl font-Montserrat font-semibold text-xs leading-10 text-white flex justify-center items-center cursor-pointer"
          onClick={() => {
            onSetTimer();
          }}
        >
          Timer
        </div>
      </div>
    </Grid>
  );
};

export default CameraTools;
