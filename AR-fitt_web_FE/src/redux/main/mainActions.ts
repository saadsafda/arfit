import MainActionTypes from "./mainActionTypes";

export const setSelectedRoute = (value: any) => ({
  type: MainActionTypes.SET_SELECTED_ROUTE,
  payload: value,
});
export const setSelectedCategory = (value: any) => ({
  type: MainActionTypes.SET_SELECTED_CATEGORY,
  payload: value,
});
export const setSelectedItem = (value: any) => ({
  type: MainActionTypes.SET_SELECTED_ITEM,
  payload: value,
});
export const setOpenCameraModule = (value: boolean) => ({
  type: MainActionTypes.SET_OPEN_CAMERA_MODULE,
  payload: value,
});
