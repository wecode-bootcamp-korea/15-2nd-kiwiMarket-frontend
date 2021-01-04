import { combineReducers } from "redux";
import counter from "./counter";
import user from "./user";
import category from "./category";
import postCategory from "./postCategory";

const rootReducers = combineReducers({
  counter,
  category,
  user,
  postCategory,
});
export default rootReducers;
