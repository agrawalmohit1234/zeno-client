import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as zenoAction from "./actions/zenoAction";

import Modal from "@mui/material/Modal";
import PatientInventory from "./components/PatientInventory/patientInventory";
import Action from "./components/Action/action";
import { list, remove, create, update } from "./api/api";
import "./App.css";

function App({ patient, createPatient, removePatient, updatePatient }) {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [medicalHistory, setmedicalHistory] = useState("");
  const [cardToEdit, setCardToEdit] = useState(false);
  const [id, setId] = useState("");
  const [showView, setShowView] = useState(true);

  useEffect(() => {
    list().then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        createPatient(data);
      }
    });
  }, [createPatient]);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAge = (e) => {
    setAge(e.target.value);
  };

  const handlemedicalHistory = (e) => {
    setmedicalHistory(e.target.value);
  };

  const handleSubmit = () => {
    setOpenModal(!openModal);
    if (cardToEdit) {
      update({ userId: id }, { name, age, medical_history: medicalHistory });
      updatePatient(id, { name, age, medicalHistory });
    } else {
      let user = { name, age, medical_history: medicalHistory };
      create(user).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          list().then((data) => createPatient(data));
        }
      });
    }
    setName("");
    setAge("");
    setmedicalHistory("");
  };

  const handleDeleteCard = (id) => {
    remove({
      userId: id,
    }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        removePatient(id);
      }
    });
  };

  const handleViewCard = (userData) => {
    setShowView(false);
    setOpenModal(!openModal);
    setName(userData.name);
    setAge(userData.age);
    setmedicalHistory(userData.medical_history);
  };

  const handleEditCard = (id, userData) => {
    handleViewCard(userData);
    setShowView(true);
    setCardToEdit(true);
    setId(id);
  };

  function checkDisabled() {
    if (name === "" || age === "" || medicalHistory === "") {
      return true;
    }
    return false;
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "#686868",
          color: "white",
          padding: "15px",
          fontWeight: "bolder",
        }}
      >
        <div>Zeno Health</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "15px",
          fontWeight: "bolder",
        }}
      >
        <div>List of Patients</div>
        <Action
          type="Add Patients"
          handleClick={() => {
            setOpenModal(!openModal);
            setCardToEdit(false);
            setShowView(true);
            setName("");
            setAge("");
            setmedicalHistory("");
          }}
        />
        <Modal
          open={openModal}
          onClose={() => {
            setOpenModal(!openModal);
          }}
        >
          <div className="modalBox">
            <div className="modalHeading">ADD USER</div>
            <div>
              <label>NAME</label>
              <br />
              <input
                type="text"
                onChange={handleName}
                value={name}
                style={{ marginBottom: "10px", width: "100%" }}
              />
              <br />
              <label>AGE</label>
              <br />
              <input
                type="number"
                onChange={handleAge}
                value={age}
                style={{ marginBottom: "10px", width: "100%" }}
              />
              <br />
              <label>Medical History</label>
              <br />
              <textarea
                type="text"
                onChange={handlemedicalHistory}
                value={medicalHistory}
                style={{ marginBottom: "10px", width: "100%" }}
              />
            </div>
            {showView ? (
              <>
                <div
                  style={{
                    float: "right",
                    marginRight: "-6px",
                    marginTop: "15px",
                  }}
                >
                  <Action
                    type="CANCEL"
                    className="deleteBtn"
                    handleClick={() => setOpenModal(!openModal)}
                  />
                  <Action
                    type={cardToEdit ? "UPDATE" : "SUBMIT"}
                    handleClick={handleSubmit}
                    disabled={checkDisabled()}
                  />
                </div>
              </>
            ) : (
              <>
                <div style={{ float: "right" }}>
                  <Action
                    type="CLOSE"
                    handleClick={() => setOpenModal(!openModal)}
                  />
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>
      <PatientInventory
        usersData={patient}
        onDeleteCard={handleDeleteCard}
        onViewCard={handleViewCard}
        onEditCard={handleEditCard}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  patient: state.patient,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createPatient: (patient) => dispatch(zenoAction.createPatient(patient)),
    removePatient: (id) => dispatch(zenoAction.removePatient(id)),
    updatePatient: (id, patient) =>
      dispatch(zenoAction.updatePatient(id, patient)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
