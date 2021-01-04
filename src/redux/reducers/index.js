import { combineReducers } from "redux";
import counter from "./counter";
import user from "./user";
import category from "./category";

const rootReducers = combineReducers({
  counter,
  category,
  user,
});
export default rootReducers;
