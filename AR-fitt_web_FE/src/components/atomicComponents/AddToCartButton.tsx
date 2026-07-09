import React from "react";
import { Button } from "@mui/material";

interface AddToCartButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onClick,
  className,
  children,
  type = "button",
}) => {
  return (
    <Button
      variant="contained"
      className={`bg-primarySaturated text-contrastText font-bold rounded-md px-6 py-2 shadow-md hover:bg-primaryDark transition-colors duration-200 ${className || ""}`}
      style={{ textTransform: "none" }}
      onClick={onClick}
      type={type}
    >
      {children || "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton; 