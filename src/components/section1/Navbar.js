import React from "react";
import "./Navbar.css";
import logo from "../../assets/ClipboardOutlined.svg";

const Navbar = () => {
  return (
    // <div className="nav">
    <div className="logo">
      <img src={logo} alt="logo" />
      <h3>Resume Builder</h3>
      <div className="btns">
        <button className="import_btn">Import</button>
        <button className="export_btn">Export</button>
      </div>
    </div>
    /* </div> */
  );
};

export default Navbar;
