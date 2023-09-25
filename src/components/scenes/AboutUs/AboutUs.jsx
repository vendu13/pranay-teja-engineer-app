import style from "./AboutUs.module.css";
import about from "../../../assets/about.webp";
import carousel from "../../../assets/carousel.webp";
import Carousel from "../../Carousel/Carousel.jsx";
import { useEffect } from "react";
import s from "./BusinessProcess.module.css";
import businessProcess2 from "../../../assets/businessProcess2.webp";

const AboutUs = () => {
  const headers = [
    "Mission",
    "Vision",
    "Engineering Excellence",
    "Craftsmanship",
  ];
  const paragraphs = [
    "To dedicate ourselves to passionately crafting unique living masterpieces as an ethical, " +
      "progressive and socially sensitive organization.",
    "To be recognised as India’s finest and most respected real estate company leveraging creativity and augmenting " +
      "life to the fullest.",
    "If there’s one thing that resonates from every project we undertake, it’s engineering excellence. Continuous research has made us " +
      "specialists in the civil work industry. And the reason the government keeps coming back to us to help design these projects is because we " +
      "understand the need of a refined and execellent service. Using the finest of materials, cutting-edge processes " +
      "and technologies, and precision quality, we engineer projects that delight right from the master plan to the concrete " +
      "that forms the foundations of the structures that define them.",
    "At Pranay Engineers, we take great pride in our creations. Built with passion and precision. And designed to deliver perfection. " +
      "No detail is too small nor any vision too big. With superior craftsmanship, creativity and extensive planning, every project we " +
      "undertake becomes a true reflection of everything that Chaithanya stands for. From the master plan to the concrete that forms the " +
      "foundations of the structures that define them. And our Clients are our constant " +
      "inspiration, challenging us to outdo and outbuild even ourselves every time." +
      " Planned, crafted, " +
      "and created with engineering excellence to constantly delight. Every Pranay Teja Engineers' project has a unique feature that reinforces " +
      "science in everyday lives. Be it the amenities that stand out and make a space for themselves or the incorporation of life " +
      "sciences that support utility and comfort.",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={style.about}>
      <div className={style.aboutImageText}>
        <img className={style.image} src={about} alt="about" />
        <div className={style.text}>
          <h1>About Pranay Engineers</h1>
        </div>
      </div>

      <div className={s.liferayOverview}>
        <div className={s.liferayOverviewText}>
          <h1>Leadership with a Mission</h1>
          <p>
            Pranay Engineers Masterpieces are the product of our visionary, Mr.
            Yadalla N. Reddy, Founder and CEO who has pioneered the development
            business in Karnataka and Andhra Pradesh. Pranay Engineers creates
            Projects that are not limited by walls of bricks and mortar among
            other clichés lies the heart of Pranay Engineers in each of its
            masterpieces. One that is crafted by the acclaimed professional
            hands of an artist.
          </p>
          <p>
            The baton of leadership has now been passed on to the hands of his
            son, Mr. Guru Prasad (MD), for whom God is in details. Perfection
            has a deeper meaning for him than what is captured in lexicons. His
            progressive and innovative vision together with global sensibilities
            guide the organization.
          </p>
        </div>
        <img className={s.liferayImg} src={businessProcess2} alt="liferay1" />
      </div>

      <div className={style.carousel}>
        <h1>We are driven by</h1>
        <Carousel img={carousel} headers={headers} paragraphs={paragraphs} />
      </div>
    </div>
  );
};
export default AboutUs;
