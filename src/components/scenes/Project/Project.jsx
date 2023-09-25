import {Flex, Grid, Text} from '@chakra-ui/react'
import {Modal} from 'antd';
import s from "./Project.module.css";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useActions from "../../../hooks/useActions.js";
import {useSelector} from "react-redux";
import ImageGallery from "react-image-gallery";
import Loader from "../../Loader/Loader.jsx";
import Button from "../../Button/Button.jsx";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {CiCamera} from "react-icons/ci";

const API_URL = import.meta.env.VITE_API_URL;

const Project = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const {setPickedProject} = useActions();
    const projectsState = useSelector(state => state.projectsReducer)
    const {name} = useParams();

    const [galleryImages, setGalleryImages] = useState([])

    const [gallery, setGallery] = useState([])

    useEffect(() => {
        if (projectsState.projects) {
            setPickedProject(projectsState.projects.find(el => el.title === name))
        }
        if (projectsState.pickedProject?.images) {
            let arrayGallery = Array.from(Array(projectsState.pickedProject.images.gallery).keys());
            arrayGallery = arrayGallery.map(el => ({
                original: `${API_URL}image/${projectsState.pickedProject.title}/gallery/${el}.jpeg`,
                thumbnail: `${API_URL}image/${projectsState.pickedProject.title}/gallery/${el}.jpeg`,
                originalHeight: '600px'
            }))
            setGallery(arrayGallery)
        }
    }, [name, projectsState, setPickedProject])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!projectsState.pickedProject) return <Loader/>;

    return (
        <div className={s.about}>
            <div className={s.aboutImageText}>
                <img className={s.image} src={`${API_URL}image/${projectsState.pickedProject.title}/main/0.jpeg`}
                     alt='about'/>
                <div
                    className={s.text}
                >
                    <h1>{projectsState.pickedProject.title}</h1>
                </div>
            </div>

            <Flex flexDirection="column" alignItems="center" gap="2rem">
                <h2 className={s.desc}>{projectsState.pickedProject.desc}</h2>
                <Button text='Enquire now' BGcolor='black'/>
                <Flex className={s.list}>
                    <Flex flexDirection="column" gap="0.5rem" alignItems="center">
                        <HiOutlineLocationMarker fontSize="2rem" color="rgba(230,120,23,1)"/>
                        <Text fontWeight="700">Location</Text>
                    </Flex>
                    <iframe
                        src={projectsState.pickedProject.location}
                        className={s.map}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </Flex>
                <Flex className={s.gallery}>
                    <Flex className={s.buttonContainer}>
                        <button
                            style={{
                                borderTopLeftRadius: '10px',
                                borderTopRightRadius: '10px',
                                height: '110px',
                                backgroundColor: 'rgba(230,120,23,1)',
                                color: 'white'
                            }}
                            className={s.button}
                        >
                            <CiCamera style={{fontSize: 45}}/>
                            Gallery
                        </button>
                    </Flex>
                </Flex>
                <Flex w="100%" justifyContent="center">
                    <div className={s.gridContainer}>
                        {gallery.length > 0
                            ?
                            <Grid className={s.grid}>
                                {gallery.map(el => (
                                    <img
                                        onClick={() => {
                                            setGalleryImages(gallery)
                                            showModal()
                                        }}
                                        key={el.original}
                                        className={s.gridImage}
                                        src={el.original}
                                        alt={el.original}
                                    />
                                ))}
                            </Grid>
                            :
                            <h2 style={{textAlign: "center"}}>Empty</h2>
                        }
                    </div>
                </Flex>
            </Flex>

            <Modal width="80%" bodyStyle={{height: '700px'}} open={isModalOpen} onCancel={handleCancel} footer={null}
                   closeIcon={false}>
                <ImageGallery style={{height: '100%'}} items={galleryImages}/>
            </Modal>

        </div>
    )
}
export default Project
