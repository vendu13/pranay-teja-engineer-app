import style from "./AboutUs.module.css";
import { useEffect } from "react";
import s from "./BusinessProcess.module.css";
import director from "../../../assets/director.jpg";
import dir from "../../../assets/dir.png";

const DirectorsMessage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={style.about}>
      <div className={style.aboutImageText}>
        <img className={style.image} src={director} alt="about" />
        <div className={style.text}>
          <h1>Director's message</h1>
        </div>
      </div>

      <div className={s.liferayOverview}>
        <div className={s.liferayOverviewText}>
          <h1>Leveraging for a sustainable infra.</h1>
          <p>
            “At the heart of PranayTeja Engineers lies a profound respect for
            the land of Karnataka and its people. Each lift irrigation project
            we embark upon is more than a mere engineering task; it is a promise
            of commitment, a pledge to bridge divides and overcome challenges,
            and above all, a heartfelt effort to enrich lives. Water, the elixir
            of life, holds within its ripples the power to change destinies. And
            every day, as we channel this force to the thresholds of countless
            households, we are reminded of our responsibility – a responsibility
            not just to provide water, but to instill hope, assure
            sustainability, and build a resilient future for our communities.
            Our journey thus far has been enriching, filled with challenges
            turned into opportunities and obstacles transformed into stepping
            stones. The trust and support of our stakeholders, the government,
            and most importantly, the people of Karnataka have been our guiding
            light, motivating us to elevate our standards of excellence,
            innovation, and service. In the years to come, PranayTeja Engineers
            will continue to be driven by our core values, our unwavering
            commitment to the community, and an insatiable desire to make a
            difference. Together, we will craft a future where water is not just
            a resource but a testament to unity, progress, and prosperity.”
          </p>
          <p>
            I would like to thank everyone for your trust and belief in our
            mission. Here's to a future brimming with possibilities.
          </p>
          <p>Sri.P.Venkateshwara Rao</p>
        </div>
        <img className={s.liferayImg} src={dir} alt="liferay1" />
      </div>
    </div>
  );
};
export default DirectorsMessage;
