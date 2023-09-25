import {useEffect, useState} from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./components/scenes/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import AboutUs from "./components/scenes/AboutUs/AboutUs.jsx";
import NewProject from "./components/NewProject/NewProject.jsx";
import {useGetMeQuery} from "./store/user/userApi.js";
import {useGetProjectsQuery} from "./store/projects/projectsApi.js";
import Loader from "./components/Loader/Loader.jsx";
import Login from "./components/scenes/Login/Login.jsx";
import AdminPage from "./components/scenes/AdminPage/AdminPage.jsx";
import RequireUser from "./components/requireUser/requireUser.jsx";
import PageNotFound from "./components/scenes/PageNotFound/PageNotFound.jsx";
import CompletedProjects from "./components/CompletedProjects/CompletedProjects.jsx";
import UnderConstruction from "./components/scenes/UnderConstruction/UnderConstruction.jsx";
import Project from "./components/scenes/Project/Project.jsx";
import Gallery from "./components/scenes/Gallery/Gallery.jsx";
import ProjectGallery from "./components/scenes/ProjectGallery/ProjectGallery.jsx";
import Contact from "./components/scenes/ContactUs/Contact.jsx";

function App() {
    const {isLoading, isFetching} = useGetMeQuery(null);
    const {isLoading: isProjectsLoading, isFetching: isProjectsFetching} = useGetProjectsQuery(null);
    const [isTopOfPage, setIsTopOfPage] = useState(true)
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {

            if (window.scrollY < 80) {
                setIsTopOfPage(true)
            }
            if (window.scrollY > 80) setIsTopOfPage(false)

            if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
                setShow(false);
            }
            if (window.scrollY < lastScrollY) { // if scroll up show the navbar
                setShow(true);
            }

            setLastScrollY(window.scrollY)
        }
        window.addEventListener('scroll', handleScroll)
        return () => removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    if (isLoading || isFetching || isProjectsLoading || isProjectsFetching) {
        return (
            <Loader/>
        );
    }

    return (
        <>
            <BrowserRouter>
                <Header show={show} isTopOfPage={isTopOfPage}/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/about' element={<AboutUs/>}/>
                    <Route path='/contact' element={<Contact />}/>
                    <Route path='/projects/new' element={<NewProject/>}/>
                    <Route path='/projects/completed' element={<CompletedProjects/>}/>
                    <Route path='/projects/under-construction' element={<UnderConstruction/>}/>
                    <Route path='/gallery' element={<Gallery/>}/>
                    <Route path='/admin/login' element={<Login/>}/>
                    <Route path='/project/:name' element={<Project/>}/>
                    <Route path='/gallery/:name' element={<ProjectGallery/>}/>
                    <Route element={<RequireUser/>}>
                        <Route path="/admin" element={<AdminPage/>}/>
                    </Route>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    )
}

export default App
