import style from "./Header.module.css";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../../assets/logo.webp";
import { Link } from "react-router-dom";
import Arrow from "../Arrow/Arrow.jsx";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import useMediaQuery from "../../hooks/useMediaQuery.js";

const Header = ({ isTopOfPage }) => {
  const navbarStyle = isTopOfPage
    ? { backgroundColor: "" }
    : { backgroundColor: "black" };

  const [isMenuToggled, setIsMenuToggled] = useState(false);

  const [part1, setPart1] = useState(false);
  const [part2, setPart2] = useState(false);

  const [styleHeader, setStyleHeader] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const disableAll = () => {
    setShowProjects(false);
    setShowAbout(false);
  };

  const isAboveMobileScreens = useMediaQuery("(min-width: 1180px)");

  return (
    <>
      <div className={style.aboveHeader}>
        <img src={logo} alt="logo" className={style.logo} />
        <div className={style.headerText}>
          <h2 className={style.textAnimation}>PRANAYTEJA ENGINEERS</h2>
          <h3>Innovating with Integrity</h3>
        </div>
      </div>
      <AnimatePresence>
        {isAboveMobileScreens && (
          <div
            style={
              isTopOfPage
                ? { position: "absolute", width: "100%", zIndex: 120 }
                : { position: "fixed", top: 0, width: "100%", zIndex: 120 }
            }
          >
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
                if (showAbout) {
                  setShowAbout(true);
                }
              }}
              onMouseLeave={() => {
                setShowProjects(false);
                setShowAbout(false);
                setStyleHeader(false);
              }}
            >
              <div
                className={style.headerContainer}
                style={styleHeader ? { backgroundColor: "black" } : {}}
              >
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
                      setShowAbout(true);
                      setShowProjects(false);
                      setStyleHeader(true);
                    }}
                    onMouseLeave={() => {
                      setShowAbout(false);
                    }}
                  >
                    About Us <Arrow focus={showAbout} />
                  </li>
                  <li
                    onMouseOver={() => {
                      setShowProjects(true);
                      setShowAbout(false);
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

              {showAbout && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5 }}
                  variants={{
                    hidden: { opacity: 0, y: -50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  style={showAbout ? { backgroundColor: "black" } : {}}
                  className={style.additionalHeader}
                  onMouseOver={() => {
                    if (showAbout) {
                      setShowAbout(true);
                    }
                  }}
                  onMouseLeave={() => {
                    setShowAbout(false);
                  }}
                >
                  <ul className={style.technology}>
                    <li>
                      <Link
                        className={style.link}
                        to="/about/mission-vision-values"
                      >
                        Mission, Vision & Values
                      </Link>
                    </li>
                    <li>
                      <Link className={style.link} to="/about/safety-quality">
                        Environment, Safety & Quality
                      </Link>
                    </li>
                    <li>
                      <Link className={style.link} to="/about/key-people">
                        Key People
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={style.link}
                        to="/about/directors-message"
                      >
                        Director's Message
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              )}
            </motion.nav>
          </div>
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
            style={{ backgroundColor: "black" }}
          >
            <div
              className={style.headerContainer2}
              style={styleHeader ? { backgroundColor: "black" } : {}}
            >
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
                <div
                  className={style.part}
                  onClick={() => setPart2(!part2)}
                  style={part2 ? { backgroundColor: "#0e052d" } : {}}
                >
                  <div className={style.link}>About Us</div>
                  <Arrow style={{ fontSize: "1rem" }} focus={part2} />
                </div>
                {part2 && (
                  <div className={style.mobilePart}>
                    <div className={style.mobileLinks}>
                      <Link
                        className={style.link}
                        to="/about/mission-vision-values"
                        onClick={() => {
                          setIsMenuToggled(!isMenuToggled);
                          setPart2(!part2);
                        }}
                      >
                        Mission, Vision & Values
                      </Link>
                      <Link
                        className={style.link}
                        to="/about/safety-quality"
                        onClick={() => {
                          setIsMenuToggled(!isMenuToggled);
                          setPart2(!part2);
                        }}
                      >
                        Environment, Safety & Quality
                      </Link>
                      <Link
                        className={style.link}
                        to="/about/key-people"
                        onClick={() => {
                          setIsMenuToggled(!isMenuToggled);
                          setPart2(!part2);
                        }}
                      >
                        Key People
                      </Link>
                      <Link
                        className={style.link}
                        to="/about/directors-message"
                        onClick={() => {
                          setIsMenuToggled(!isMenuToggled);
                          setPart2(!part2);
                        }}
                      >
                        Director's Message
                      </Link>
                    </div>
                  </div>
                )}

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
                    For Enquiry: +91 8792248928
                  </a>
                </div>
                <div className={style.line} />
              </div>
            </div>
          </nav>
        )}
      </AnimatePresence>
    </>
  );
};
export default Header;
