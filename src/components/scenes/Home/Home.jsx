import style from "./Home.module.css";
import home1 from "../../../assets/home1.webp";
import home2 from "../../../assets/home2.webp";
import home3 from "../../../assets/home3.webp";
import home4 from "../../../assets/home4.webp";
import {
  Autoplay,
  Pagination,
  Navigation,
  Keyboard,
  Mousewheel,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AnchorLink from "react-anchor-link-smooth-scroll/lib/anchor-link.js";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={style.about}>
      <div className={style.aboutImageText}>
        <Swiper
          speed={350}
          centeredSlides={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          navigation={false}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img className={style.image} src={home1} alt="about" />
          </SwiperSlide>
          <SwiperSlide>
            <img className={style.image} src={home2} alt="about" />
          </SwiperSlide>
          <SwiperSlide>
            <img className={style.image} src={home3} alt="about" />
          </SwiperSlide>
          <SwiperSlide>
            <img className={style.image} src={home4} alt="about" />
          </SwiperSlide>
        </Swiper>
        <div className={style.textMain}>
          <h1>We create the future</h1>
        </div>
        <div className={style.text2}>
          <h1>Introducing Pranay Teja Engineers</h1>
        </div>
        <AnchorLink href="#about">Explore</AnchorLink>
      </div>
      <div className={style.projectContainer} id="about">
        <div className={style.swiperFlex}>
          <h2 className={style.dark}>OUR TESTIMONIAL</h2>
          <h2 className={style.white}>We care about your opinion</h2>
          <div className={style.Line} />
        </div>
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          {/* <SwiperSlide>
                        <div className={style.swiperSecond}>
                            <p>SNC has proved in completing & delivering committed assignments to the satisfaction in
                                line with industrial standards. SNC has executed NTPD project with superior quality and
                                always conforming to HSE standards. SNC has executed 5 Lakh Cum of ice cooled Reinforced
                                concrete for the project. All the required men and machinery were deployed by
                                SNC.Congratulations SNC! We wish you all</p>
                            <h3>Superintending Engineer, NSTPD Circle, APGENCO</h3>
                        </div>
                    </SwiperSlide> */}
          <SwiperSlide>
            <div className={style.swiperSecond}>
              <p>
                We wish to consign our appreciation of excellent execution and
                client relationship maintained by PranayTeja Engineers. We
                express our contentment with M/s. PranayTeja Engineers for
                maintaining for its keen sense of adherence to Quality, safety
                and statutory compliances.
              </p>
              <h3>
                Chief Engineer, Krishna Bhagya Jala Nigam Ltd, Canal Zone No.1,
                Bheemarayanagudi
              </h3>
            </div>
          </SwiperSlide>
          {/* <SwiperSlide>
                        <div className={style.swiperSecond}>
                            <p>We would like to take this opportunity to thank SNC team for providing quality service,
                                successful approach towards safety & tracking of the project, and for a very good
                                integration within the team throughout during the construction of Almatti dam Power
                                house and the project was completed ahead of schedule. SNC have set high standards of
                                excellence and apply advanced</p>
                            <h3>Chief Engineer, Karnataka Power Corporation Ltd</h3>
                        </div>
                    </SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  );
};
export default Home;
