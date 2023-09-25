import s from './NewProject.module.css'
import {useSelector} from "react-redux";
import {Flex, Grid} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import useActions from "../../hooks/useActions.js";
import newProject from "../../assets/new.webp";
import {useEffect} from "react";

const API_URL = import.meta.env.VITE_API_URL;

const NewProject = () => {

    const navigate = useNavigate();
    const projects = useSelector(state => state.projectsReducer.projects)
    const projectsFiltered = projects.filter(item => item.type === 'New Project')
    const {setPickedProject} = useActions();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={s.projectContainer}>
            {projectsFiltered.length > 0 &&
                <>
                    <div className={s.aboutImageText}>
                        <img className={s.image} src={newProject} alt='about'/>
                        <div
                            className={s.textMain}
                        >
                            <h1>New Project</h1>
                        </div>
                    </div>

                    <Grid className={s.grid}>
                        {projectsFiltered.map((el) => (
                            <Flex
                                className={s.project}
                                key={el.title}
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
                </>
            }
        </div>
    )
}
export default NewProject
