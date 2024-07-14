import style from "./AboutUs.module.css";
import key from "../../../assets/key.jpg";
import people from "../../../assets/profile.jpg";
import {motion} from "framer-motion";
import {useEffect} from "react";

const KeyPeople = () => {

    const peopleData = [
        {
            id: 1,
            name: 'Mr.Ajit Kulkarni (Senior V.P)',
            desc: 'Expertise in Electrical & Mechanical works and execution of works. Involve in companies works right from tendering up to commissioning of the project. Takes responsibility of procurement of materials and making necessary co-ordination with finance and execution teams and has been a big key to success.',
        },
        {
            id: 2,
            name: 'Mr.Ajit Kulkarni (Senior V.P)',
            desc: 'Expertise in Electrical & Mechanical works and execution of works. Involve in companies works right from tendering up to commissioning of the project. Takes responsibility of procurement of materials and making necessary co-ordination with finance and execution teams and has been a big key to success.',
        },
        {
            id: 3,
            name: 'Mr.Ajit Kulkarni (Senior V.P)',
            desc: 'Expertise in Electrical & Mechanical works and execution of works. Involve in companies works right from tendering up to commissioning of the project. Takes responsibility of procurement of materials and making necessary co-ordination with finance and execution teams and has been a big key to success.',
        },
        {
            id: 4,
            name: 'Mr.Ajit Kulkarni (Senior V.P)',
            desc: 'Expertise in Electrical & Mechanical works and execution of works. Involve in companies works right from tendering up to commissioning of the project. Takes responsibility of procurement of materials and making necessary co-ordination with finance and execution teams and has been a big key to success.',
        }
    ]

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={style.about}>
            <div className={style.aboutImageText}>
                <img className={style.image} src={key} alt="about"/>
                <div className={style.text}>
                    <h1>Key People</h1>
                </div>
            </div>

            <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{amount: 0.1, once: true}}
                transition={{duration: 0.5}}
                variants={{
                    hidden: {opacity: 0, y: 100},
                    visible: {opacity: 1, y: 0}
                }}
                className={style.peopleTeam}>
                <h1 className={style.overviewPart2H}>Meet our <br></br> amazing team</h1>
                <div style={{width: '100%', margin: '2rem 0'}} className={style.line}/>
                <div className={style.team}>
                    {peopleData?.map(el => (
                        <div key={el.id} className={style.teamOne}>
                            <img className={style.imageData} src={people} alt={el.name}/>
                            <h4>{el.name}</h4>
                            <p>{el.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

        </div>
    );
};
export default KeyPeople;
