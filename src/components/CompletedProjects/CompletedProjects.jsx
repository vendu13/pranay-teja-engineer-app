import s from './CompletedProjects.module.css'
import {useSelector} from "react-redux";
import {Flex, Grid} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import useActions from "../../hooks/useActions.js";
import completed from "../../assets/completed.webp";
import {useEffect} from "react";

const API_URL = import.meta.env.VITE_API_URL;

const CompletedProject = () => {

    const navigate = useNavigate();
    const projects = useSelector(state => state.projectsReducer.projects)
    const projectsFiltered = projects.filter(item => item.type === 'Completed Projects')
    const {setPickedProject} = useActions();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={s.projectContainer}>

            <>
                <div className={s.aboutImageText}>
                    <img className={s.image} src={completed} alt='about'/>
                    <div
                        className={s.textMain}
                    >
                        <h1>Completed Projects</h1>
                    </div>
                </div>
                {projectsFiltered.length > 0 &&
                    <Grid className={s.grid}>
                        {projectsFiltered.map((el, index) => (
                            <Flex
                                className={s.project}
                                key={index}
                                onClick={() => {
                                    setPickedProject(el);
                                    navigate(`/project/${el.title}`)
                                }}
                            >
                                <img style={{width: '95%', height: '13.5rem'}}
                                     src={`${API_URL}image/${el.title}/main/0.jpeg`}
                                     alt={el.title}/>
                                <h2 className={s.text}>{el.title}</h2>
                            </Flex>
                        ))}
                    </Grid>
                }
            </>
        </div>
    )
}
export default CompletedProject
