import fileReducer from "./fileReducer";
import { combineReducers } from "redux";
export default combineReducers({
  folderSettings: fileReducer,
});
