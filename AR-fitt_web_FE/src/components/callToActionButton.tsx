import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
interface CallToActionButtonProps {
  nav: string;
  title: string;
  className?: string;
}
const CallToActionButton: React.FC<CallToActionButtonProps> = ({
  nav,
  title,
  className,
}) => {
  const navigate = useNavigate();
  return (
    <Button
      className={`${className} font-Montserrat font-bold bg-primarySaturated text-contrastText h-[40px] w-[130px] mt-4 text-xs lg:text-xs xl:text-sm`}
      variant="contained"
      style={{
        borderRadius: "7px",
      }}
      onClick={() => {
        navigate(`${nav}`);
      }}
    >
      {title}
    </Button>
  );
};
export default CallToActionButton;
