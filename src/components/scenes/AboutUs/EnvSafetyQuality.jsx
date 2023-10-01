import style from "./AboutUs.module.css";
import env2 from "../../../assets/env2.jpg";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import s from "./BusinessProcess.module.css";
import env1 from "../../../assets/env1.jpg";

const EnvSafetyQuality = () => {
    const [selected, setSelected] = useState([])
    const servicesH = ['Environmental protection', 'Satisfy applicable requirements', 'Timely implementation of quality projects',
    'Protection', 'Communication', 'Setting measurable goals']
    const servicesP = ['Environmental protection through pollution prevention and implementation\n' +
    'environmentally friendly practices to carry out our processes to minimize impact\n' +
    'on the environment.', 'Satisfy applicable requirements and comply with related compliance obligations\n' +
    'with the field of our activity.', 'Timely implementation of quality projects and raising the level\n' +
    'customer satisfaction.', 'Protection of biodiversity and ecosystems.', 'Communication of this policy to all interested parties associated\n' +
    'and stakeholders in business associations with us.', 'Setting measurable goals for environmental improvement\n' +
    'and quality activities of the organization.']


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={style.about}>
            <div className={style.aboutImageText}>
                <img className={style.image} src={env1} alt="about" />
                <div className={style.text}>
                    <h1>Environment, Safety & Quality</h1>
                </div>
            </div>


            <div className={s.liferayOverview}>
                <div className={s.liferayOverviewText}>
                    <h1>INTEGRATED QUALITY AND ENVIRONMENT POLICY</h1>
                    <p>
                        We at Amrutha Constructions Private Limited are engaged in designing
                        infrastructure, construction and project management, we strive
                        to continuous improvement of the quality management system and
                        environment of our organization.
                    </p>
                </div>
                <img className={s.liferayImg} src={env2} alt="liferay1" />
            </div>

            <div className={s.liferayOverview2}>
                <motion.div
                    initial='hidden'
                    whileInView='visible'
                    viewport={{amount: 0.3, once: true}}
                    transition={{duration: 0.5}}
                    variants={{
                        hidden: {opacity: 0, x: -100},
                        visible: {opacity: 1, x: 0}
                    }}
                    className={s.liferayOverviewText22}>
                    <h1>We will achieve this by:</h1>
                </motion.div>
                <motion.div
                    initial='hidden'
                    whileInView='visible'
                    viewport={{amount: 0.3, once: true}}
                    transition={{duration: 0.5}}
                    variants={{
                        hidden: {opacity: 0, x: -200},
                        visible: {opacity: 1, x: 0}
                    }}
                    className={s.services}>
                    {servicesH.map((el, index) => (
                        <div key={index} className={s.service}>
                            <div style={{width: '100%', margin: '0'}} className={s.line}/>
                            <div
                                className={s.serviceH}
                                onClick={() => {
                                    if (selected.includes(el)) {
                                        setSelected(selected.filter(e => e !== el))
                                    } else {
                                        setSelected([...selected, el])
                                    }
                                }}

                            >
                                <h2 style={selected.includes(el) ? {color: "black"} : {}}>
                                    {el}
                                </h2>
                                {!selected.includes(el)
                                    ? <h2 className={s.plus}>+</h2>
                                    :
                                    <h2 className={s.plus}
                                        style={selected.includes(el) ? {color: "black"} : {}}>-</h2>
                                }
                            </div>
                            <p style={selected.includes(el) ? {display: "block"} : {}}>
                                {servicesP[index]}
                            </p>
                        </div>
                    ))}
                    <div style={{width: '100%', margin: '0'}} className={s.line}/>
                </motion.div>
            </div>

        </div>
    );
};
export default EnvSafetyQuality;
