import { Grid, Link } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  verifyEmailFailure,
  verifyEmailSuccess,
  setErrorMsg,
} from "../redux/signup/SignupActions";
import { useMutation, useQuery } from "react-query";
import signupService from "../services/signup.service";
import "../styles/signupStyles.css";

const OtpInputField: React.FC = () => {
  const secondsCountDown = 30 * 1; // time in seconds
  const numberOfDigits = 5;
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [otpError, setOtpError] = useState("");
  const otpBoxReference = useRef<any>([]);
  const [countdown, setCountdown] = useState<number>(secondsCountDown);
  const [triggerCountDown, setTriggerCountDown] = useState<boolean>(false);
  let countdownInterval: string | number | NodeJS.Timer | undefined;

  const userDetails = useSelector((state: any) => state.signup.userDetails);
  const email = userDetails.email;
  const dispatch = useDispatch();
  function handleChange(value: any, index: number) {
    if (typeof value === "number" || !isNaN(Number(value))) {
      let newArr = [...otp];
      newArr[index] = value;
      setOtp(newArr);
    }
  }

  function handleBackspaceAndEnter(e: any, index: number) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    } else if (e.key === "Backspace" && !e.target.value && index === 0) {
      otpBoxReference.current[index].focus();
    } else if (index < numberOfDigits - 1 && e.target.value) {
      otpBoxReference.current[index + 1].focus();
    } else if (index < numberOfDigits - 1 && !e.target.value) {
      if (typeof e.key === "number" || !isNaN(Number(e.key))) {
        handleChange(e.key, index);
        otpBoxReference.current[index + 1].focus();
      }
    }
    return;
  }

  const { refetch: sendOTP } = useQuery(
    "send-OTP",
    async () => signupService.sendOTP(email, dispatch),
    { enabled: false }
  );
  const { mutate: verifyOTP } = useMutation(
    async (otp: string) => signupService.verifyOTP(otp, email),
    {
      onSuccess: (res) => {
        dispatch(verifyEmailSuccess());
        dispatch(setErrorMsg(null));
        setOtpError("Correct OTP");
      },
      onError: (err: any) => {
        dispatch(verifyEmailFailure("You have entered an incorrect OTP"));
        setOtpError("You have entered an incorrect OTP");
        dispatch(setErrorMsg(err?.response.data.message));
      },
    }
  );
  const handleResend = () => {
    setCountdown(secondsCountDown);
    setTriggerCountDown(true);
    sendOTP();
  };
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    // Get the pasted data
    const pastedValue = event.clipboardData.getData("text");
    // Split pasted value into individual characters
    const digits = pastedValue.replace(/[^0-9]/g, "").split("");

    const newInputs = [...otp];
    // Fill the inputs with the pasted digits
    digits.forEach((digit, idx) => {
      if (idx < numberOfDigits) {
        // Only fill up to numberOfDigits fields
        newInputs[idx] = digit;
      }
    });
    setOtp(newInputs);
  };

  useEffect(() => {
    setTriggerCountDown(true);
    if (triggerCountDown && countdown > 0) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      countdownInterval = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    } else if (countdown < 0 && triggerCountDown) {
      handleResend();
      setTriggerCountDown(false);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown, triggerCountDown]);

  useEffect(() => {
    if (otp.join("").length === numberOfDigits) {
      verifyOTP(otp.join(""));
    } else {
      setOtpError("");
    }
  }, [otp, verifyOTP]);

  const isMounted = useRef(false);

  useEffect(() => {
    // Skip the effect on the initial render in development mode
    // if (!isMounted.current) {
    //   isMounted.current = true;
    //   return;
    // }
    setTimeout(() => {
      setTriggerCountDown(true);
      sendOTP();
    }, 2000);
    if (otpBoxReference.current[0]) {
      otpBoxReference.current[0].focus();
    }
  }, [sendOTP]);
  return (
    <>
      <Grid
        direction="row"
        className="flex items-center justify-center gap-4 h-[7%] m-4"
      >
        {/* Boxes for digits */}
        {otp.map((digit: any, index: number) => (
          <input
            onPaste={handlePaste}
            key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            ref={(reference) => (otpBoxReference.current[index] = reference)}
            className={`${
              otpError === "You have entered an incorrect OTP"
                ? "bg-red-500"
                : "bg-primary"
            } ${
              otpError === "You have entered an incorrect OTP"
                ? "focus:bg-red-600 "
                : "focus:bg-teal-500 "
            }  w-[20px] h-[20px] xl:w-[40px] xl:h-[40px] text-black p-3 rounded-md block bg-opacity-25 border-none font-Montserrat text-center items-center focus:outline-none appearance-none xl:text-md`}
          />
        ))}
      </Grid>
      {/* Resend OTP */}
      <Grid className="Montserrat-text text-xs xl:text-md flex justify-start items-start w-full m-4">
        <div className="w-[50%]">
          Didn’t Receive the OTP yet?{" "}
          <Link
            href="#"
            className={`${
              countdown === 0 ? "text-link" : "text-gray-500"
            }  font-bold cursor-pointer`}
            onClick={() => {
              if (countdown === 0) handleResend();
            }}
          >
            Resend
          </Link>
        </div>
        {/* &nbsp;&nbsp; */}
        <div className="text-red-500 w-[50%] flex justify-end">
          Time Remaining:&nbsp; {countdown} seconds
        </div>
      </Grid>
      {/* Error on wrong OTP */}
      <p
        className={`font-Montserrat text-xs xl:text-md h-4 flex justify-center ${
          otpError === "You have entered an incorrect OTP"
            ? "text-red-500"
            : "text-green-500"
        } ${otpError ? "error-show" : ""}`}
      >
        {otpError}
      </p>
    </>
  );
};
export default OtpInputField;
