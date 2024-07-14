import s from './Carousel.module.css'
import {useState} from "react";
import {motion} from "framer-motion";

const Carousel = ({img, headers, paragraphs, style={}}) => {

    const [selected, setSelected] = useState(headers[0])

    return (
        <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{amount: 0.2, once: true}}
            transition={{duration: 0.5}}
            variants={{
                hidden: {opacity: 0, x: -200},
                visible: {opacity: 1, x: 0}
            }}
            className={s.carousel}>
            <img  src={img} alt='carousel' className={s.carouselImg}/>
            <div className={s.carouselMain}>
                {headers.map((el, index) => (
                    <div key={index}>
                        <h2
                            style={style}
                            className={selected === el ? s.carouselMainH2 : s.carouselMainH}
                            onClick={() => setSelected(el)}
                        >
                            {el}
                        </h2>
                        {selected === el &&
                            <motion.p
                                initial='hidden'
                                whileInView='visible'
                                transition={{duration: 0.5}}
                                variants={{
                                    hidden: {opacity: 0, y: -50},
                                    visible: {opacity: 1, y: 0},
                                }}
                                className={selected === el ? s.carouselMainP2 : s.carouselMainP}>
                                {paragraphs[index]}
                            </motion.p>}
                    </div>
                    )
                )}
            </div>
        </motion.div>
    )
}
export default Carousel
