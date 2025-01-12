'use client';

import logo from "../../../assets/autobusesdecolombia_logo.png";
import user from "../../../assets/dieghoatc.png";
import "./header.css";

export default function Header() {

  

  return (
    <div className={"header-container"}>
      <div className="header-logo">
        <img src={logo.src} alt="logo" className="logo" />
      </div>
      <div className="image-user-container">
        <img src={user.src} alt="user" className="image-user" />
      </div>
    </div>
  );
};
