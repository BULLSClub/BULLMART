import React from "react";

const CustomAlert = ({ message }) => {
  return (
    <div className="custom-alert">
      <div className="custom-alert-content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default CustomAlert;
