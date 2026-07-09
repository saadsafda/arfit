import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Dispatch } from "redux";
import { useState } from "react";
interface GenderDropDownFieldProps {
  setGender: Dispatch<React.SetStateAction<string | any>> | any;
  className?: string;
}

const GenderDropDown = ({ setGender, className }: GenderDropDownFieldProps) => {
  const [selectedGender, setSelectedGender] = useState("Gender");
  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
    setSelectedGender(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ m: 1 }} className={`${className}`}>
      <Select
        labelId="gender-label"
        onChange={handleChange}
        displayEmpty
        value={selectedGender}
        sx={{
          color: "rgb(148 148 148)",
        }}
      >
        <MenuItem value="Gender" disabled>
          Gender
        </MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Male">Male</MenuItem>
      </Select>
    </FormControl>
  );
};

export default GenderDropDown;
