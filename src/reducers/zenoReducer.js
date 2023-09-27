import * as actionTypes from "../actions/actionType";

const reducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.CREATE_NEW_PATIENT:
      return [...action.patient];
    case actionTypes.REMOVE_PATIENT_BY_ID:
      let newState = state.filter((st) => st._id !== action.id);
      return [...newState];
    case actionTypes.UPDATE_PATIENT_BY_ID:
      for (let i = 0; i < state.length; i++) {
        if (state[i]._id === action.id) {
          state[i].name = action.patient.name;
          state[i].age = action.patient.age;
          state[i].medical_history = action.patient.medicalHistory;
        }
      }
      return [...state];
    default:
      return state;
  }
};

export default reducer;
