// rootReducer.ts
import { combineReducers } from "redux";
import signupReducer from "./signup/SignupReducer";
import mainReducer from "./main/mainReducer";
import cartReducer from "./cart/cartReducer";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  main: mainReducer,
  signup: signupReducer,
  cart: cartReducer,
});

export default rootReducer;
