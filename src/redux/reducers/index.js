import { combineReducers } from "redux";
import counter from "./counter";
import user from "./user";

const rootReducers = combineReducers({
  counter,
  user,
});
export default rootReducers;
