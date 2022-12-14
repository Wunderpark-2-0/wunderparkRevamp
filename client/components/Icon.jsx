import React, { useState, useEffect } from "react";
import Modal from "./modal/modal.jsx";

//iconData should be called props
const Icon = (iconData) => {
  const [show, setShow] = React.useState(false);
  const [parkName, setName] = React.useState(iconData.park); //doesn't need to be state
  const [parkCode, setCode] = React.useState(iconData.parkCode); //doesn't need to be state
  const [visible, setVisible] = React.useState("");

  //what is set visible doing on line 25????
  return (
    <div>
      <img
        src={iconData.imgLink}
        id={iconData.park}
        className={`${iconData.className} imageIcon`}
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
      />
    </div>
  );

  // we also need an onclick handler
  //
};

// export out the MainContainer
export default Icon;
