import {useEffect} from "react";
import s from "./Contact.module.css";
import contactus from "../../../assets/contactus.webp";
import {motion} from "framer-motion";
import {GrMail, GrMapLocation, GrPhone} from "react-icons/gr";
import {useForm} from "react-hook-form";
import {useSendMessageMutation} from "../../../store/user/userApi.js";
import Loader from "../../Loader/Loader.jsx";

const Contact = () => {
    const [sendMessageHook, {isLoading}] = useSendMessageMutation();

    const {
        register,
        handleSubmit,
        formState: {isValid},
        setValue,
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
        },
        mode: "all",
    });

    const submitForm = async (values) => {
        await sendMessageHook(values);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) return <Loader/>;

    return (
        <div className={s.contact}>
            <div className={s.aboutImageText}>
                <img className={s.image} src={contactus} alt="contactus"/>
                <div className={s.text}>
                    <h1>Contact Us</h1>
                </div>
            </div>

            <div className={s.line}/>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{amount: 0.2, once: true}}
                transition={{duration: 0.5}}
                variants={{
                    hidden: {opacity: 0, x: -100},
                    visible: {opacity: 1, x: 0},
                }}
                className={s.process}
            >
                <div className={s.contactBlock}>
                    <h3>Contact Us</h3>
                    <div className={s.block}>
                        <h3>Bangalore Location :</h3>
                        <div className={s.blockItem}>
                            <GrMapLocation className={s.icon}/>
                            <p>
                                #202, second Floor, Crescent Habitat, # 9 Srikantan Layout, Off Crescent Road, 
                                Bengaluru, Karnataka - 560001
                            </p>
                        </div>
                        <div className={s.blockItem}>
                            <GrMail className={s.icon}/>
                            <p>info@peplindia.co.in</p>
                        </div>
                        <div className={s.blockItem}>
                            <GrPhone className={s.icon}/>
                            <p>Mobile : +91 8792248928</p>
                        </div>
                    </div>
                </div>
                <div className={s.contactBlock}>
                    <h3>Get In Touch With Us</h3>
                    <form className={s.form} onSubmit={handleSubmit(submitForm)}>
                        <div className={s.formBlock}>
                            <input
                                placeholder="First Name"
                                className={s.input}
                                {...register("firstName", {
                                    required: "firstName is required",
                                })}
                            />
                            <input
                                placeholder="Last Name"
                                className={s.input}
                                {...register("lastName", {
                                    required: "lastName is required",
                                })}
                            />
                        </div>
                        <div className={s.formBlock}>
                            <input
                                placeholder="Email"
                                className={s.input}
                                {...register("email", {
                                    required: "email is required",
                                })}
                            />
                            <input
                                placeholder="Phone Number"
                                className={s.input}
                                {...register("phone", {
                                    required: "phone",
                                })}
                            />
                        </div>
                        <div className={s.formArea}>
              <textarea
                  className={s.area}
                  placeholder="Message"
                  {...register("message", {
                      required: "message is required",
                  })}
              />
                        </div>

                        <button type="submit" disabled={!isValid} className={s.button}>
                            SUBMIT
                        </button>
                    </form>
                </div>
            </motion.div>
            <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{amount: 0.2, once: true}}
                transition={{duration: 0.5}}
                variants={{
                    hidden: {opacity: 0, x: 100},
                    visible: {opacity: 1, x: 0}
                }}
                className={s.process2}>
                <iframe
                    src={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.7591372658053!2d77.5818072!3d12.9872516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae178237788c13%3A0x7aa820b57fdee9f3!2sPranay%20Teja%20Engineers%20Private%20Limited!5e0!3m2!1sen!2sin!4v1696447224103!5m2!1sen!2sin'}
                    width={'100%'} height={"450"} style={{ border:0 }} allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
            </motion.div>
        </div>
    );
};
export default Contact;
