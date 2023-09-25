import {useEffect} from 'react'
import style from './Home.module.css'
import home1 from '../../../assets/home1.webp'
import home2 from '../../../assets/home2.webp'
import home3 from '../../../assets/home3.webp'
import home4 from '../../../assets/home4.webp'
import ReactSwipe from 'react-swipe';
import {Flex, Grid} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import useActions from "../../../hooks/useActions.js";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {

    const navigate = useNavigate();
    const {setPickedProject} = useActions();

    const projects = useSelector(state => state.projectsReducer.projects)
    const projectsFilteredNew = projects.filter(item => item.type === 'New Project')
    const projectsFilteredCompleted = projects.filter(item => item.type === 'Completed Projects')
    const projectsFilteredUnder = projects.filter(item => item.type === 'Under Construction')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={style.about}>
            <div className={style.aboutImageText}>
                <ReactSwipe
                    className="carousel"
                    swipeOptions={{auto: 5000, speed: 1000}}
                >
                    <img className={style.image} src={home1} alt='about'/>
                    <img className={style.image} src={home2} alt='about'/>
                    <img className={style.image} src={home3} alt='about'/>
                    <img className={style.image} src={home4} alt='about'/>
                </ReactSwipe>
                <div
                    className={style.textMain}
                >
                    <h1>We create the future</h1>
                </div>
                <div className={style.text2}>
                    <h1>Introducing Pranay Teja Engineers</h1>
                </div>
            </div>
            <div className={style.projectContainer}>
                {projectsFilteredNew.length > 0 &&
                    <>
                        <h1>New Project</h1>
                        <Grid className={style.grid}>
                            {projectsFilteredNew.map((el) => (
                                <Flex
                                    className={style.project}
                                    key={el.title}
                                    onClick={() => {
                                        setPickedProject(el);
                                        navigate(`/project/${el.title}`)
                                    }}
                                >
                                    <img style={{width: '95%', height: '13.5rem'}}
                                         src={`${API_URL}image/${el.title}/main/0.jpeg`}
                                         alt={el.title}/>
                                    <h2 className={style.text}>{el.title}</h2>
                                </Flex>
                            ))}
                        </Grid>
                    </>
                }
            </div>


            <div className={style.projectContainer}>
                {projectsFilteredCompleted.length > 0 &&
                    <>
                        <h1>Completed Projects</h1>
                        <Grid className={style.grid}>
                            {projectsFilteredCompleted.map((el) => (
                                <Flex
                                    className={style.project}
                                    key={el.title}
                                    onClick={() => {
                                        setPickedProject(el);
                                        navigate(`/project/${el.title}`)
                                    }}
                                >
                                    <img style={{width: '95%', height: '13.5rem'}}
                                         src={`${API_URL}image/${el.title}/main/0.jpeg`}
                                         alt={el.title}/>
                                    <h2 className={style.text}>{el.title}</h2>
                                </Flex>
                            ))}
                        </Grid>
                    </>
                }
            </div>


            <div className={style.projectContainer}>
                {projectsFilteredUnder.length > 0 &&
                    <>
                        <h1>Under Construction</h1>
                        <Grid className={style.grid}>
                            {projectsFilteredUnder.map((el) => (
                                <Flex
                                    className={style.project}
                                    key={el.title}
                                    onClick={() => {
                                        setPickedProject(el);
                                        navigate(`/project/${el.title}`)
                                    }}
                                >
                                    <img style={{width: '95%', height: '13.5rem'}}
                                         src={`${API_URL}image/${el.title}/main/0.jpeg`}
                                         alt={el.title}/>
                                    <h2 className={style.text}>{el.title}</h2>
                                </Flex>
                            ))}
                        </Grid>
                    </>
                }
            </div>
        </div>
    )
}
export default Home
