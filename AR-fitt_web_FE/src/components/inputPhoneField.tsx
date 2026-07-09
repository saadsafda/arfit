import { Dispatch, SetStateAction } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";

interface InputPhoneFieldProps {
  setPhone: Dispatch<SetStateAction<number | string | any>> | any;
}

const InputPhoneField: React.FC<InputPhoneFieldProps> = ({ setPhone }) => {
  return (
    <PhoneInput
      specialLabel=""
      placeholder={"Phone Number"}
      country={"gb"}
      value={""}
      onChange={(e) => {
        setPhone(e);
      }}
      containerStyle={{
        borderBottom: "1px solid rgb(148 148 148)",
        width: "97%",
        color: "rgb(148 148 148)",
      }}
      inputStyle={{
        border: "0px",
        width: "100%",
        color: "rgb(148 148 148)",
      }}
      buttonStyle={{
        border: "0px",
        background: "transparent",
      }}
      dropdownStyle={{ maxHeight: "150px" }}
    />
  );
};

export default InputPhoneField;
