import { IconButton, InputAdornment, TextField } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Dispatch } from "redux";
import "../styles/signupStyles.css";

interface InputFieldProps {
  placeholder: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  setValue?: Dispatch<SetStateAction<number | string | any>> | any;
  onErrorUpdate: (isError: boolean) => void;
}
const InputField: React.FC<InputFieldProps> = ({
  onChange,
  placeholder,
  type,
  className,
  setValue,
  onErrorUpdate,
}) => {
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    specialChar: false,
  });

  const [error, setError] = useState("");
  const [nameError, setNameError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const dispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleNameChange = (e: any) => {
    if (onChange) {
      onChange(e);
    }
    if (setValue) {
      if (type === "date") {
        var today = new Date();
        const birthDate = new Date(e.target.value);
        if (today.getFullYear() - birthDate.getFullYear() >= 10) {
          setValue(e.target.value);
        } else {
          setNameError(true);
          setError("Invalid Date of Birth entered");
          onErrorUpdate(true);
          // dispatch(setErrorMsg("Invalid Date of Birth entered"));

          return;
        }
      }
    }
    if (e.target.validity.valid) {
      setNameError(false);
      onErrorUpdate(false);
    } else {
      setNameError(true);
      onErrorUpdate(true);

      if (placeholder.includes("Email")) {
        setError("Should follow the correct email format");
      } else {
        setError("Wrong Entry");
      }
    }
  };

  const handlePasswordChange = (e: any) => {
    if (onChange) {
      onChange(e);
    }

    // Validate password
    const lengthValid = e.target.value.length >= 8;
    const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(e.target.value);

    setPasswordErrors({
      length: !lengthValid,
      specialChar: !specialCharValid,
    });
    if (!lengthValid || !specialCharValid) {
      // dispatch(setErrorMsg("Password Error"));
      onErrorUpdate(true);
    } else {
      onErrorUpdate(false);
      //   dispatch(setErrorMsg(null));
    }
  };
  useEffect(() => {
    onErrorUpdate(false);
    // dispatch(setErrorMsg(null));
  }, [onErrorUpdate]);
  return (
    <>
      <TextField
        // error
        helperText={
          nameError
            ? error
            : (passwordErrors.length && "Must have 8 characters") ||
              (passwordErrors.specialChar && "Must have a special character.")
        }
        onChange={(e) => {
          type === "password" ? handlePasswordChange(e) : handleNameChange(e);
        }}
        error={nameError || passwordErrors.length || passwordErrors.specialChar}
        required
        className={` ${className} border-0 border-b border-[#646262] m-2 w-full text-xs font-Montserrat`}
        variant="standard"
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        InputProps={{
          endAdornment: type === "password" && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* {type === "password" && (
        <InputAdornment position="start">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            // onMouseDown={handleMouseDownPassword}
            edge="start"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      )} */}
    </>
  );
};

export default InputField;
