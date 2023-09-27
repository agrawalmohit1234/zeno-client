import { combineReducers } from "redux";
import patient from "./zenoReducer";

export default combineReducers({
  patient: patient,
});
