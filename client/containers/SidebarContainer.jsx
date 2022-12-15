import React, { useState, useEffect } from "react";
import Form from "../components/Form.jsx";
import ParkTally from "../components/ParkTally.jsx";

const SidebarContainer = (props) => {
  return (
    <div className="sidebarContainer">
      <Form codes={props.codes} user={props.user} setActiveUser={props.setActiveUser}/>
      <ParkTally codes={props.codes} />
    </div>
  );
};

export default SidebarContainer;
