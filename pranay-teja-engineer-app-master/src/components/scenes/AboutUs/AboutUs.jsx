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
    "Our mission is to harness the transformative power of lift irrigation to nurture and sustain communities throughout Karnataka." +
      " By making water accessible to every doorstep, we not only aim to quench thirst but to foster growth, prosperity, and well-being for every individual.",
    "We envision a Karnataka where every household is enriched by the life-giving force of water, irrespective of their location or challenges." +
      " As pioneers in lift irrigation, we aim to be the beacon of hope, ensuring that water scarcity becomes a forgotten narrative in the annals of our state's history.",
    "Our ethos revolves around blending the art and science of engineering." +
      " With a profound respect for both traditional wisdom and modern innovation, our solutions embody efficiency, resilience, and sustainability." +
      " Each endeavor is championed by a dedicated team who work tirelessly, ensuring that the trust placed in us by the communities and the government is always upheld.",
    "At PranayTeja Engineers, craftsmanship goes beyond construction; it is a heartfelt commitment to the communities we serve." +
      " Every element of our projects, be it a brick or a canal, reflects our deep-seated passion and meticulous attention to detail." +
      " It's not just about building infrastructures, but about sculpting landmarks of hope, reliability, and lasting service.",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={style.about}>
      <div className={style.aboutImageText}>
        <img className={style.image} src={about} alt="about" />
        <div className={style.text}>
          <h1>Mission, Vision & Values</h1>
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
            The baton of leadership is now shared with his son, Mr. Pranay Teja
            Reddy (MD), for whom God is in details. Perfection has a deeper
            meaning for him than what is captured in lexicons. His progressive
            and innovative vision together with global sensibilities guides the
            organization.
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
