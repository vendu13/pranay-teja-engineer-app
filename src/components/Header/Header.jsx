import style from "./Header.module.css";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../../assets/logo.webp";
import { Link } from "react-router-dom";
import Arrow from "../Arrow/Arrow.jsx";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import useMediaQuery from "../../hooks/useMediaQuery.js";

const Header = ({ isTopOfPage, show }) => {
  const navbarStyle = isTopOfPage
    ? { backgroundColor: "" }
    : { backgroundColor: "black" };

  const [isMenuToggled, setIsMenuToggled] = useState(false);

  const [part1, setPart1] = useState(false);

  const [styleHeader, setStyleHeader] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const disableAll = () => {
    setShowProjects(false);
  };

  const isAboveMobileScreens = useMediaQuery("(min-width: 1180px)");

  return (
    <AnimatePresence>
      {show && isAboveMobileScreens && (
        <motion.nav
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: -80 },
            visible: { opacity: 1, y: 0 },
          }}
          exit={{ opacity: 0, y: -80 }}
          className={style.header}
          style={navbarStyle}
          onMouseOverCapture={() => {
            if (showProjects) {
              setShowProjects(true);
            }
          }}
          onMouseLeave={() => {
            setShowProjects(false);
            setStyleHeader(false);
          }}
        >
          <div
            className={style.headerContainer}
            style={styleHeader ? { backgroundColor: "black" } : {}}
          >
            <Link to="/">
              <img src={logo} alt="logo" className={style.logo} />
            </Link>
            <ul className={style.menu}>
              <li
                onMouseOver={() => {
                  setStyleHeader(true);
                  disableAll();
                }}
              >
                <Link className={style.link} to="/">
                  Home
                </Link>
              </li>
              <li
                onMouseOver={() => {
                  setStyleHeader(true);
                  disableAll();
                }}
              >
                <Link className={style.link} to="/about">
                  About Us
                </Link>
              </li>
              <li
                onMouseOver={() => {
                  setShowProjects(true);
                  setStyleHeader(true);
                }}
                onMouseLeave={() => {
                  setShowProjects(false);
                }}
              >
                Projects <Arrow focus={showProjects} />
              </li>
              <li
                onMouseOver={() => {
                  setStyleHeader(true);
                  disableAll();
                }}
              >
                <Link className={style.link} to="/gallery">
                  Gallery
                </Link>
              </li>
              <li
                onMouseOver={() => {
                  setStyleHeader(true);
                  disableAll();
                }}
              >
                <Link className={style.link} to="/contact">
                  Contact Us
                </Link>
              </li>
              <li
                onMouseOver={() => {
                  setStyleHeader(true);
                  disableAll();
                }}
              >
                <a className={style.link} href="tel:+918792248928">
                  For Enquiry: +918792248928
                </a>
              </li>
            </ul>
          </div>

          {showProjects && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, y: -50 },
                visible: { opacity: 1, y: 0 },
              }}
              style={showProjects ? { backgroundColor: "black" } : {}}
              className={style.additionalHeader}
              onMouseOver={() => {
                if (showProjects) {
                  setShowProjects(true);
                }
              }}
              onMouseLeave={() => {
                setShowProjects(false);
              }}
            >
              <ul className={style.technology}>
                <li>
                  <Link className={style.link} to="/projects/new">
                    New Project
                  </Link>
                </li>
                <li>
                  <Link className={style.link} to="/projects/completed">
                    Completed projects
                  </Link>
                </li>
                <li>
                  <Link
                    className={style.link}
                    to="/projects/under-construction"
                  >
                    Under Construction
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </motion.nav>
      )}
      {!isAboveMobileScreens && (
        <motion.nav
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: -80 },
            visible: { opacity: 1, y: 0 },
          }}
          exit={{ opacity: 0, y: -80 }}
          className={style.header}
          style={show ? { backgroundColor: "black" } : {}}
        >
          <div
            className={style.headerContainer2}
            style={styleHeader ? { backgroundColor: "black" } : {}}
          >
            {show && !isAboveMobileScreens && (
              <Link to="/">
                <img src={logo} alt="logo" className={style.logo} />
              </Link>
            )}
            <div></div>
            <button
              className={style.menuButton}
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            >
              <Bars3Icon className={style.menuIcon} />
            </button>
          </div>
        </motion.nav>
      )}

      {!isAboveMobileScreens && isMenuToggled && (
        <nav className={style.header}>
          <div className={style.mobileNavbar}>
            {/* CLOSE ICON */}
            <div className={style.headerContainer2}>
              <Link to="/">
                <img src={logo} alt="logo" className={style.logo} />
              </Link>
              <button
                className={style.mobileCloseButton}
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <XMarkIcon className={style.mobileCloseIcon} />
              </button>
            </div>

            {/* MENU ITEMS */}
            <div className={style.mobileItems}>
              <div className={style.line} />
              <div className={style.part}>
                <Link
                  className={style.link}
                  to="/"
                  onClick={() => {
                    setIsMenuToggled(!isMenuToggled);
                  }}
                >
                  Home
                </Link>
              </div>
              <div className={style.line} />
              <div className={style.part}>
                <Link
                  className={style.link}
                  to="/about"
                  onClick={() => {
                    setIsMenuToggled(!isMenuToggled);
                  }}
                >
                  About Us
                </Link>
              </div>
              <div className={style.line} />
              <div
                className={style.part}
                onClick={() => setPart1(!part1)}
                style={part1 ? { backgroundColor: "#0e052d" } : {}}
              >
                <div className={style.link}>Projects</div>
                <Arrow style={{ fontSize: "1rem" }} focus={part1} />
              </div>
              {part1 && (
                <div className={style.mobilePart}>
                  <div className={style.mobileLinks}>
                    <Link
                      className={style.link}
                      to="/projects/new"
                      onClick={() => {
                        setIsMenuToggled(!isMenuToggled);
                        setPart1(!part1);
                      }}
                    >
                      New Project
                    </Link>
                    <Link
                      className={style.link}
                      to="/projects/completed"
                      onClick={() => {
                        setIsMenuToggled(!isMenuToggled);
                        setPart1(!part1);
                      }}
                    >
                      Completed Projects
                    </Link>
                    <Link
                      className={style.link}
                      to="/projects/under-construction"
                      onClick={() => {
                        setIsMenuToggled(!isMenuToggled);
                        setPart1(!part1);
                      }}
                    >
                      Under Construction
                    </Link>
                  </div>
                </div>
              )}

              <div className={style.line} />
              <div className={style.part}>
                <Link
                  className={style.link}
                  to="/gallery"
                  onClick={() => {
                    setIsMenuToggled(!isMenuToggled);
                  }}
                >
                  Gallery
                </Link>
              </div>
              <div className={style.line} />

              <div className={style.part}>
                <Link
                  className={style.link}
                  to="/contact"
                  onClick={() => {
                    setIsMenuToggled(!isMenuToggled);
                  }}
                >
                  Contact Us
                </Link>
              </div>
              <div className={style.line} />

              <div className={style.part}>
                <a
                  className={style.link}
                  href="tel:+918792248928"
                  onClick={() => {
                    setIsMenuToggled(!isMenuToggled);
                  }}
                >
                  For Enquiry: +918792248928
                </a>
              </div>
              <div className={style.line} />
            </div>
          </div>
        </nav>
      )}
    </AnimatePresence>
  );
};
export default Header;
