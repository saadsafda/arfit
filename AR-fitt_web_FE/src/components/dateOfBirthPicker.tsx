import { SetStateAction, useEffect, useState } from "react";
import { Dispatch } from "redux";
import "../styles/signupStyles.css";

interface InputFieldProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  setValue?: Dispatch<SetStateAction<number | string | any>> | any;
  onErrorUpdate: (isError: boolean) => void;
}
const DateOfBirthPicker: React.FC<InputFieldProps> = ({
  onChange,
  className,
  setValue,
  onErrorUpdate,
}) => {
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birthDate = new Date(e.target.value);
    const today = new Date();
    if (today.getFullYear() - birthDate.getFullYear() >= 10) {
      setValue(e.target.value);
      setNameError(false);
      onErrorUpdate(false);
      setSelectedDate(e.target.value);
    } else {
      setNameError(true);
      setError("Invalid Date of Birth entered");
      onErrorUpdate(true);
      return;
    }
  };

  useEffect(() => {
    onErrorUpdate(false);
  }, [onErrorUpdate]);
  return (
    <>
      <input
        type="date"
        value={selectedDate}
        onChange={handleNameChange}
        className={`${className} border-0 border-b border-[#646262] m-2 w-full text-xs font-Montserrat`}
        style={{
          borderBottom: nameError ? '1px solid #f44336' : '1px solid #646262'
        }}
      />
      {nameError && (
        <div className="text-red-500 text-xs ml-2 mt-1">
          {error}
        </div>
      )}
    </>
  );
};

export default DateOfBirthPicker;
