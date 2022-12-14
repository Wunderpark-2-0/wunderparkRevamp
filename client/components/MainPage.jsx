import React, { useEffect, useState, useLayoutEffect } from "react";
import SidebarContainer from "../containers/SidebarContainer.jsx";
import MainContainer from "../containers/MainContainer.jsx";

const MainPage = () => {
  // let codes = [];
  const [codes, setCodes] = useState([]);

  const handleUpdate = (newData) => {
    setData([newData, ...data]);
  };

  //making fetch request to /user/
  useEffect(() => {
    fetch("http://localhost:3000/user/", {
      method: "GET",
      headers: { "Content-Type": "Application/JSON" },
    })
      .then((res) => res.json())
      .then((data) => {
        setCodes(data);
      })
      .catch((err) => console.log("AddPark fetch POST to api: ERROR: ", err));
  }, []);

  return (
    <div className="app">
      <SidebarContainer codes={codes} />
      <div className="right">
        <div className="float">
          <h1> WÜNDER PARKS</h1>
        </div>
        {<MainContainer codes={codes} />}
      </div>
    </div>
  );
};

export default MainPage;

//NOTES - CURRENTLY, the app on render makes a fetch request to a /user, to grab the codes of the parks the user has visited. These codes are then used to color in the IconMaker's icons, and also passed to the side bar for use in progress bar.
