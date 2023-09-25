import React from "react";
import Button from "../Button/Button.jsx";
import style from "./Footer.module.css";
import logo from "../../assets/logo.webp";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
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
          <a target="_blank" href="/" style={{ color: "white" }}>
            <BsFacebook />
          </a>
          {/*    <a target='_blank' href='https://www.linkedin.com/company/source-one-management-services-pvt-ltd?trk=mini-profile-title' style={{color: "white"}} rel="noreferrer"><BsLinkedin/></a>*/}
        </div>
        <div className={style.tech}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
          •
          <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
            About
          </Link>
          •
          <Link
            to="/projects/new"
            style={{ color: "white", textDecoration: "none" }}
          >
            New Project
          </Link>
          •
          <Link
            to="/projects/completed"
            style={{ color: "white", textDecoration: "none" }}
          >
            Completed Projects
          </Link>
          •
          <Link
            to="/projects/under-construction"
            style={{ color: "white", textDecoration: "none" }}
          >
            Under Construction
          </Link>
        </div>
      </div>
      <div className={style.line} />
      <div className={style.footerBlock}>
        <div className={style.copyright}>
          All Rights Reserved © 2020 – 2022, Pranay Engineers Pvt Ltd
        </div>
        <div className={style.solutions}>
          <Link
            to="/gallery"
            style={{ color: "white", textDecoration: "none" }}
          >
            GALLERY
          </Link>
          <div className={style.lineVertical} />
          <Link
            to="/contact"
            style={{ color: "white", textDecoration: "none" }}
          >
            CONTACT
          </Link>
          <div className={style.lineVertical} />
          <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>
            ADMIN
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Footer;
