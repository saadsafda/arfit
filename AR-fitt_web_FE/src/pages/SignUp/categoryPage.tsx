import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import {
  setCurrentForm,
  setInterestCategory,
} from "../../redux/signup/SignupActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import categories from "./categories.json";

const CategoryPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [clickedImages, setClickedImages] = useState<Array<string>>([]);

  const handleImageClick = (categoryName: string, itemName: string) => {
    const key = `${categoryName}-${itemName}`;
    setClickedImages((prevState) =>
      prevState.includes(key)
        ? prevState.filter((imageKey) => imageKey !== key)
        : [...prevState, key]
    );

    dispatch(setInterestCategory([...clickedImages, key]));
  };
  const handleNext = () => {
    // const apparels = clickedImages.some((item) => item.includes("apparels"));
    // const cosmetics = clickedImages.some((item) => item.includes("cosmetics"));
    // if (apparels) {
    //   dispatch(setCurrentForm(CONSTANTS.SIGN_UP_BODY_SCANNING));
    // } else if (cosmetics) {
    //   dispatch(setCurrentForm(CONSTANTS.SIGN_UP_FACE_SCANNING));
    // } else {
    //   navigate("/home");
    // }

    dispatch(setCurrentForm(CONSTANTS.SIGN_UP_BODY_SCANNING));
    
  };

  useEffect(() => {});
  return (
    <Grid
      container
      direction="row"
      xs={12}
      className="w-screen h-screen flex flex-row justify-center pt-4 overflow-auto"
    >
      <Grid className="font-Montserrat font-bold xs:text-2xl md:text-3xl text-primary flex justify-center items-center w-[100%]">
        Choose Your Interests
      </Grid>
      <Grid className="font-Montserrat font-bold text-xl text-primary opacity-50 flex justify-center text-center">
        Simply click on one or more categories that you are interested in
      </Grid>
      <Grid container className="mt-6">
        {Object.entries(categories).map(
          ([categoryName, items], categoryIndex) => (
            <Grid
              item
              xs={12}
              key={categoryIndex}
              className="w-full flex flex-wrap justify-center"
            >
              {items.map((item, itemIndex) => {
                const key = `${categoryName}-${item.name}`;
                const isClicked = clickedImages.includes(key);

                return (
                  <div
                    key={itemIndex}
                    className="flex justify-center items-center"
                  >
                    <div
                      className="pl-6 cursor-pointer"
                      onClick={() => {
                        handleImageClick(categoryName, item.name);
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`${
                          isClicked
                            ? "rounded-full border-solid border-primary border-4"
                            : "rounded-full border-solid border-transparent border-4"
                        } xs:h-[100px] md:h-[200px]`}
                      />
                    </div>
                  </div>
                );
              })}
            </Grid>
          )
        )}
      </Grid>
      <Grid className=" w-[100%] h-[40px] pr-[20px] flex flex-row justify-end font-Montserrat font-bold xs:text-lg md:text-2xl text-[#408589] cursor-pointer">
        <div
          className=" pr-[50px]"
          onClick={() => {
            handleNext();
          }}
        >
          {" "}
          Next
        </div>{" "}
        <div
          onClick={() => {
            dispatch(setInterestCategory([]));
            navigate("/home");
          }}
        >
          {" "}
          Skip
        </div>
      </Grid>
    </Grid>
  );
};
export default CategoryPage;
