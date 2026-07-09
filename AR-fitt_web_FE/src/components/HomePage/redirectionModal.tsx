import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  Grid,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentForm } from "../../redux/signup/SignupActions";

interface RedirectionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  redirection: string;
}
const RedirectionModal = ({
  open,
  setOpen,
  redirection,
}: RedirectionModalProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        className:
          "bg-[#F3F3F3] flex flex-col xs:pb-[30px] md:pb-[36px] xs:h-[250px] md:h-[225px] ",
      }}
    >
      {" "}
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            handleClose();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </DialogActions>
      <DialogContentText
        id="alert-dialog-description"
        className="flex flex-col items-center justify-center"
      >
        <h1 className="font-Montserrat font-bold xs:text-xl md:text-2xl text-[#646464] flex justify-center ">
          Attention Required
        </h1>

        {/* Description*/}
        <Grid className="flex flex-col items-center justify-center w-3/4">
          <p className="font-Montserrat text-sm flex justify-center text-center mt-0">
            To proceed, please enable your camera for facial and body
            credentials verification.
          </p>

          {/* Continue Button */}
          <Button
            className="bg-primary text-white h-[40px] font-bold"
            variant="contained"
            disableElevation={true}
            style={{
              width: "157px",
              fontFamily: "Montserrat",
              borderRadius: "10px",
            }}
            onClick={() => {
              dispatch(setCurrentForm(redirection));
              navigate("/signup");
            }}
          >
            Continue
          </Button>
        </Grid>
      </DialogContentText>
    </Dialog>
  );
};
export default RedirectionModal;
