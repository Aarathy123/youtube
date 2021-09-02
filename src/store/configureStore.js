import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import userReducer from "../reducers/users";
import videoReducer from "../reducers/videos";
import filterReducer from "../reducers/filter";

const composeEnhances = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      user: userReducer,
      video: videoReducer,
      filters: filterReducer,
    }),
    composeEnhances(applyMiddleware(thunk))
  );
  return store;
};
