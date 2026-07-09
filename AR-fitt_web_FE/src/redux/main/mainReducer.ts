import { Reducer, AnyAction } from "redux";
import MainActionTypes from "./mainActionTypes";
import navbarData from "../../utils/constants/JSON/homeNavbarLinks.json";

type MainAction = {
  type: string;
  payload?: any;
};

interface MainState {
  selectedCategory: any;
  selectedItem: any;
  selectedRoute: any;
  openCameraModule: boolean;
}

const INITIAL_STATE: MainState = {
  selectedCategory: {},
  selectedItem: {},
  selectedRoute: navbarData[0],
  openCameraModule: false,
};

const mainReducer: Reducer<MainState, AnyAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case MainActionTypes.SET_SELECTED_ROUTE:
      return {
        ...state,
        selectedRoute: action.payload,
      };
    case MainActionTypes.SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case MainActionTypes.SET_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: action.payload,
      };
    case MainActionTypes.SET_OPEN_CAMERA_MODULE:
      return {
        ...state,
        openCameraModule: action.payload,
      };
    default:
      return state;
  }
};

export default mainReducer;
