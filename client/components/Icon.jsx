import React, { useState, useEffect } from "react";
import Modal from "./modal/modal.jsx";

//props should be called props
const Icon = (props) => {
  const [show, setShow] = React.useState(false);
  const [parkName, setName] = React.useState(props.park); //doesn't need to be state
  const [parkCode, setCode] = React.useState(props.parkCode); //doesn't need to be state
  const [visible, setVisible] = React.useState("");

  //what is set visible doing on line 25????
  return (
    <div>
      <img
        src={props.imgLink}
        id={props.park}
        className={`${props.className} imageIcon`}
        onClick={(e) => {
          setShow(true);
          setVisible("visible");
        }}
      />
      <Modal
        onClose={() => {
          return setShow(false);
          setVisible("");
        }}
        show={show}
        parkName={parkName}
        parkCode={parkCode}
        className={visible}
        user={props.user}
      />
    </div>
  );

  // we also need an onclick handler
  //
};

// export out the MainContainer
export default Icon;
