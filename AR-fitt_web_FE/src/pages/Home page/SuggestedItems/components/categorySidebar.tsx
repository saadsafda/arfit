import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/rootReducer";

interface Props {
  categories: any;
  handleTypeCategory: (type: string) => void;
  handleCategory: (category: any) => void;
}
const CategorySidebar: React.FC<Props> = ({
  categories,
  handleTypeCategory,
  handleCategory,
}) => {
  const selectedCategory = useSelector(
    (state: RootState) => state.main.selectedCategory
  );
  return (
    <Grid
      item
      xs={12}
      md={3}
      lg={3}
      className="bg-gray-100 rounded-xl py-4 max-mui_md:px-2 px-6 flex flex-col w-full"
    >
      <Typography
        variant="h6"
        className="font-Dhurjati text-[220%] font-normal text-gray-300 leading-[1]"
      >
        Filters
      </Typography>
      <hr className="my-2 bg-gray-200 w-full h-[2px] border-none" />
      <Typography
        variant="h6"
        className="font-Dhurjati font-md text-[180%] text-gray-300 leading-[1]"
      >
        Categories
      </Typography>
      {Object.keys(categories).map((key) => (
        <>
          <div className="mt-4 max-mui_md:hidden">
            <Typography
              variant="body1"
              className={`font-Dhurjati font-thin text-[150%] ${
                selectedCategory?.type === key
                  ? "text-primaryDark"
                  : "text-gray-300"
              } leading-[1] cursor-pointer`}
              onClick={() => {
                handleTypeCategory(key);
              }}
            >
              {key}
            </Typography>
            <ul className="pl-4 list-none">
              {categories[key]?.map((item: any) =>
                (
                  <li
                    key={item?.id}
                    className="pt-2"
                    onClick={() => {
                      handleCategory(item);
                    }}
                  >
                    <Typography
                      variant="body2"
                      className={`font-Dhurjati font-thin text-[150%] ${
                        selectedCategory?.category?.name === item?.name
                          ? "text-primaryDark"
                          : "text-gray-300"
                      } leading-[1] cursor-pointer`}
                    >
                      {item?.name}
                    </Typography>
                  </li>
                )
              )}
            </ul>
          </div>
          <Accordion
            className="mui_md:hidden bg-transparent"
            sx={{ boxShadow: "none" }}
          >
            <AccordionSummary
              id="panel-header"
              aria-controls="panel-content"
              className={`font-Dhurjati font-thin text-[150%] ${
                selectedCategory?.type === key
                  ? "text-primaryDark"
                  : "text-gray-300"
              } leading-[0] cursor-pointer`}
              onClick={() => {
                handleTypeCategory(key);
              }}
            >
              {key}
            </AccordionSummary>
            <AccordionDetails className="mt-0 pt-0">
              <ul
                className="
                  flex gap-4 flex-wrap
                  pl-0 list-none
                "
              >
                {categories[key]?.map((item: any) => (
                  <li
                    key={item?.id}
                    onClick={() => {
                      handleCategory(item);
                    }}
                  >
                    <Typography
                      variant="body2"
                      className={`font-Dhurjati font-thin text-[150%] ${
                        selectedCategory?.category?.name === item?.name
                          ? "text-primaryDark"
                          : "text-gray-300"
                      } leading-[1] cursor-pointer`}
                    >
                      {item?.name}
                    </Typography>
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        </>
      ))}
    </Grid>
  );
};

export default CategorySidebar;
