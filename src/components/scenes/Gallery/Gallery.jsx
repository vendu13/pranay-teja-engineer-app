import s from './Gallery.module.css'
import {useSelector} from "react-redux";
import {Flex, Grid} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import useActions from "../../../hooks/useActions.js";
import {useEffect} from "react";
import style from "../AboutUs/AboutUs.module.css";
import gallery from "../../../assets/gallery.webp";

const API_URL = import.meta.env.VITE_API_URL;

const Gallery = () => {

    const navigate = useNavigate();
    const projects = useSelector(state => state.projectsReducer.projects)
    const { setPickedProject } = useActions();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={s.projectContainer}>
            <div className={style.aboutImageText}>
                <img className={style.image} src={gallery} alt='about'/>
                <div
                    className={style.text}
                >
                    <h1>Gallery</h1>
                </div>
            </div>

            <Grid className={s.grid}>
                {projects.map((el) => (
                    <Flex
                        className={s.project}
                        key={el.title}
                        onClick={() => {
                            setPickedProject(el);
                            navigate(`/gallery/${el.title}`)
                        }}
                    >
                        <img style={{width: '95%', height: '13.5rem'}} src={`${API_URL}image/${el.title}/main/0.jpeg`}
                             alt={el.title}/>
                        <h2 className={s.text}>{el.title}</h2>
                    </Flex>
                ))}
            </Grid>
        </div>
    )
}
export default Gallery
