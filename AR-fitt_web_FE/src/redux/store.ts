import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import rootReducer from "./rootReducer";
import storageSession from "redux-persist/lib/storage/session";

// Configuration object for Redux Persist
const persistConfig = {
  key: "root",
  storage: storageSession,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
const store = createStore(persistedReducer, applyMiddleware(thunk));

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
