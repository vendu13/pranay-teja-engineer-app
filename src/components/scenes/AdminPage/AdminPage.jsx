import s from "./AdminPage.module.css";
import { Flex, Text, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import {
  useAddProjectGalleryMutation,
  useAddProjectMainMutation,
  useDeleteProjectMutation,
} from "../../../store/projects/projectsApi.js";
import Loader from "../../Loader/Loader.jsx";
import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../../../store/user/userApi.js";

const API_URL = import.meta.env.VITE_API_URL;

const AdminPage = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found, please log in again.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(data.user);
      } else {
        setError("Failed to fetch user data");
      }
    } catch (err) {
      setError("An error occurred while fetching user data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const { isLoading: isLoadingQuery, isFetching } = useGetMessagesQuery(null);
  const projects = useSelector((state) => state.projectsReducer.projects);
  const messages = useSelector((state) => state.userReducer.messages);

  const [admin, setAdmin] = useState("add");
  const [setProjectGallery, { isLoading: isLoadingGallery }] =
    useAddProjectGalleryMutation();
  const [setProjectMain, { isLoading: isLoadingMain }] =
    useAddProjectMainMutation();
  const [deleteProject, { isLoading: isLoadingDelete }] =
    useDeleteProjectMutation();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("New Project");

  const [main, setMain] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [list, setList] = useState([
    "New Project",
    "Completed Projects",
    "Under Construction",
  ]);

  const onChangeMain = (imageList) => {
    setMain(imageList);
  };

  const onChangeGallery = (imageList) => {
    setGallery(imageList);
  };

  const handleSubmit = async () => {
    if (!main[0]?.file || !title || !desc || !location || !type) {
      alert("All fields required except gallery and plan images");
      return;
    }

    const formDataGallery = new FormData();
    for (let i = 0; i < gallery.length; i++) {
      formDataGallery.append("images", gallery[i].file);
    }
    formDataGallery.append("projectName", title);

    const formDataMain = new FormData();
    formDataMain.append("images", main[0].file);
    formDataMain.append("title", title);
    formDataMain.append("desc", desc);
    formDataMain.append("location", location);
    formDataMain.append("type", type);
    formDataMain.append("gallery", String(gallery.length));

    try {
      // Gallery upload
      if (gallery.length !== 0) {
        await setProjectGallery(formDataGallery);
      }

      // Main project upload
      const response = await setProjectMain(formDataMain);

      // Add a better success response validation
      if (response.error) {
        throw new Error(response.error);
      }

      alert("Project successfully added");
    } catch (err) {
      alert(`Error adding project: ${err.message}`);
      console.error("Project submission error:", err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (
    isLoadingGallery ||
    isLoadingMain ||
    isLoadingDelete ||
    isLoadingQuery ||
    isFetching
  ) {
    return <Loader />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={s.admin}>
      <h2>Welcome to the Admin Page, {userData && userData.name}!</h2>
      <div className={s.adminButtons}>
        <button className={s.finalButton}>Manage Users</button>
        <button className={s.finalButton}>Manage Projects</button>
      </div>

      {/* Add form for adding projects */}
      <div>
        <h3>Add a New Project</h3>
        <form onSubmit={handleSubmit}>
          {/* Add input fields */}
          <input
            type="text"
            placeholder="Project Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Project Description"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />

          {/* Add image upload */}
          <ImageUploading
            value={main}
            onChange={onChangeMain}
            dataURLKey="data_url"
          >
            {({ onImageUpload }) => (
              <button onClick={onImageUpload}>Upload Main Image</button>
            )}
          </ImageUploading>

          {/* Submit button */}
          <button type="submit">Add Project</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
