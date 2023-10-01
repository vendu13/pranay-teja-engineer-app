import style from "./AboutUs.module.css";
import {useEffect} from "react";
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
                <img className={style.image} src={director} alt="about"/>
                <div className={style.text}>
                    <h1>Director's message</h1>
                </div>
            </div>

            <div className={s.liferayOverview}>
                <div className={s.liferayOverviewText}>
                    <h1>Leveraging for a sustainable infra.</h1>
                    <p>
                        “In today’s era of seamless economic and social engagement that ignores nationalities, political
                        boundaries and geographical distance, ACPL is truly one global community. We are a 24-hour-
                        per-day enterprise. Distances are collapsing. Globalization is going forward. We are better,
                        stronger and more capable because of the blending of cultures, work ethic, intellect and
                        education – and together we accept our solemn responsibility.
                        Our Goal is to remain the gold standard of the infrastructure sector – where engineering and
                        construction are only a part of what we do.”
                    </p>
                    <p>
                        I would like to thank everyone for their involvement and hard work delivering the results we
                        have seen. And make sure it makes you feel proud to be a part of ACPL.
                    </p>
                    <p>Sri.P.Venkateshwara Rao</p>
                </div>
                <img className={s.liferayImg} src={dir} alt="liferay1"/>
            </div>
        </div>
    );
};
export default DirectorsMessage;
