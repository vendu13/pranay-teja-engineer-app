import React from "react";
import Button from "../Button/Button.jsx";
import style from "./Footer.module.css";
import logo from "../../assets/logo.webp";
import { BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.footerBlock}>
        <div>
          <Link to="/">
            <img src={logo} alt="logo" className={style.image} />
          </Link>
        </div>
        <Button text="CONTACT US" />
      </div>
      <div className={style.line} />
      <div className={style.footerBlock}>
        <div className={style.links}>
          <a target="_blank" href="/" style={{ color: "black" }}>
            <BsFacebook />
          </a>
          {/*    <a target='_blank' href='https://www.linkedin.com/company/source-one-management-services-pvt-ltd?trk=mini-profile-title' style={{color: "white"}} rel="noreferrer"><BsLinkedin/></a>*/}
        </div>
        <div className={style.tech}>

        </div>
      </div>
      <div className={style.line} />
      <div className={style.footerBlock}>
        <div className={style.copyright}>
          All Rights Reserved © 2020 – 2023, Pranay Teja Engineers Pvt Ltd
        </div>
        <div className={style.solutions}>
          <Link
            to="/gallery"
            style={{ color: "black", textDecoration: "none" }}
          >
            GALLERY
          </Link>
          <div className={style.lineVertical} />
          <Link
            to="/contact"
            style={{ color: "black", textDecoration: "none" }}
          >
            CONTACT
          </Link>
          <div className={style.lineVertical} />
          <Link to="/admin" style={{ color: "black", textDecoration: "none" }}>
            ADMIN
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Footer;
