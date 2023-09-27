import React from "react";
import Action from "../Action/action";

const Card = ({ userData, onDeleteCard, onViewCard, onEditCard }) => {
  function getRightColorStyle(age) {
    if (age >= 0 && age <= 18) {
      return "cirlePurple";
    } else if (age > 18 && age <= 60) {
      return "cirleGreen";
    } else {
      return "cirleOrange";
    }
  }
  return (
    <>
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "8px",
            alignItems: "center",
          }}
        >
          <div>{userData.name}</div>
          <div className={getRightColorStyle(userData.age)}></div>
        </div>
        <hr />
        <div
          style={{
            padding: "8px",
          }}
        >
          <div>
            Patient Id: <strong>{new Date(userData.created).valueOf()}</strong>
          </div>
          <div>
            AGE: <strong>{userData.age}</strong>
          </div>
          <div>
            Medical History: <strong>{userData.medical_history}</strong>
          </div>
          <div>
            Last Visit:{" "}
            <strong>
              {new Date(userData.updated).toISOString().split("T")[0]}
            </strong>
          </div>
        </div>
        <hr />
        <div>
          <div
            style={{
              padding: "6px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Action
              type="DELETE"
              className="deleteBtn"
              handleClick={() => onDeleteCard(userData._id)}
            />
            <Action type="VIEW" handleClick={() => onViewCard(userData)} />
            <Action
              type="EDIT"
              handleClick={() => onEditCard(userData._id, userData)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
