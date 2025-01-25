'use client';

import logo from "../../../assets/autobusesdecolombia_logo.png";
import user from "../../../assets/dieghoatc.png";
import Image from "next/image";
import "./header.css";

export default function Header() {

  

  return (
    <div className="header">
      <div className="header__logo">
        <Image src={logo} alt="autobuses de colombia logo" className="header__logo" />
      </div>
      <div className="user">
        <img src={user.src} alt="user" className="user__image" />
      </div>
    </div>
  );
};
