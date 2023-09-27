import * as actionTypes from "./actionType";

export const createPatient = (patient) => {
  return {
    type: actionTypes.CREATE_NEW_PATIENT,
    patient: patient,
  };
};

export const removePatient = (id) => {
  return {
    type: actionTypes.REMOVE_PATIENT_BY_ID,
    id: id,
  };
};

export const updatePatient = (id, patient) => {
  return {
    type: actionTypes.UPDATE_PATIENT_BY_ID,
    id: id,
    patient: patient,
  };
};
