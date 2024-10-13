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
  // State to store user data, loading state, and error message
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch user data
  const fetchUserData = async () => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    if (!token) {
      setError("No token found, please log in again.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(data.user); // Store user data in state
      } else {
        setError("Failed to fetch user data");
      }
    } catch (err) {
      setError("An error occurred while fetching user data");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Call fetchUserData when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.admin}>
      <h2>Welcome to the Admin Page, {userData && userData.name}!</h2>
      <div className={styles.adminButtons}>
        <button className={styles.finalButton}>Manage Users</button>
        <button className={styles.finalButton}>Manage Projects</button>
      </div>
    </div>
  );
};
const { isLoading, isFetching } = useGetMessagesQuery(null);
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

  gallery.length !== 0 && (await setProjectGallery(formDataGallery));
  await setProjectMain(formDataMain);

  alert("Project successfully added");
};

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

if (
  isLoadingGallery ||
  isLoadingMain ||
  isLoadingDelete ||
  isLoading ||
  isFetching
) {
  return <Loader />;
}

return (
  <div className={s.admin}>
    <Flex gap="2rem" className={s.adminButtons}>
      <button
        style={
          admin === "add" ? { backgroundColor: "gray", cursor: "default" } : {}
        }
        className={s.button}
        onClick={() => setAdmin("add")}
      >
        Add Project
      </button>
      <button
        style={
          admin === "delete"
            ? { backgroundColor: "gray", cursor: "default" }
            : {}
        }
        className={s.button}
        onClick={() => setAdmin("delete")}
      >
        Delete Project
      </button>
      <button
        style={
          admin === "messages"
            ? { backgroundColor: "gray", cursor: "default" }
            : {}
        }
        className={s.button}
        onClick={() => setAdmin("messages")}
      >
        Messages
      </button>
    </Flex>

    {admin === "add" && (
      <Box>
        <Flex flexDirection="column" gap="2rem">
          <Flex flexDirection="column">
            <Text>Project title</Text>
            <input
              className={s.input}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Flex>
          <Flex flexDirection="column">
            <Text>Project Description</Text>
            <textarea
              className={s.input}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Flex>
          <Flex flexDirection="column">
            <Text>Location</Text>
            <input
              className={s.input}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Flex>
          <Flex flexDirection="column">
            <Text>Choose category</Text>
            <select
              onChange={(e) => setType(list[e.target.value])}
              className={s.input}
            >
              {list.map((address, key) => (
                <option key={key} value={key}>
                  {address}
                </option>
              ))}
            </select>
          </Flex>
          <Flex flexDirection="column">
            <Text>Main image of project (jpg, jpeg, png)</Text>
            <Flex
              alignItems="center"
              justifyContent="center"
              padding="2rem"
              className={s.border}
            >
              <ImageUploading
                value={main}
                onChange={onChangeMain}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <Flex flexDirection="column" alignItems="center">
                    <Flex gap="2rem" justifyContent="center">
                      <button
                        className={s.button}
                        style={isDragging ? { color: "red" } : null}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Click here to upload
                      </button>
                      <button className={s.button} onClick={onImageRemoveAll}>
                        Remove all images
                      </button>
                    </Flex>
                    <Flex margin="1rem" gap="1rem" flexWrap="wrap">
                      {imageList.map((image, index) => (
                        <Flex
                          alignSelf="flex-end"
                          flex="1 0 21%"
                          flexDirection="column"
                          alignItems="center"
                          key={index}
                          className="image-item"
                        >
                          <img src={image.data_url} alt="" width="100" />
                          <Flex margin="1rem 0" gap="1rem">
                            <button
                              className={s.button}
                              onClick={() => onImageUpdate(index)}
                            >
                              Update
                            </button>
                            <button
                              className={s.button}
                              onClick={() => onImageRemove(index)}
                            >
                              Remove
                            </button>
                          </Flex>
                        </Flex>
                      ))}
                    </Flex>
                  </Flex>
                )}
              </ImageUploading>
            </Flex>
          </Flex>

          <Flex flexDirection="column">
            <Text>Gallery images (jpg, jpeg, png)</Text>
            <Flex
              alignItems="center"
              justifyContent="center"
              padding="2rem"
              className={s.border}
            >
              <ImageUploading
                value={gallery}
                onChange={onChangeGallery}
                multiple
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <Flex flexDirection="column" alignItems="center">
                    <Flex gap="2rem" justifyContent="center">
                      <button
                        className={s.button}
                        style={isDragging ? { color: "red" } : null}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Click here to upload
                      </button>
                      <button className={s.button} onClick={onImageRemoveAll}>
                        Remove all images
                      </button>
                    </Flex>
                    <Flex margin="1rem" gap="1rem" flexWrap="wrap">
                      {imageList.map((image, index) => (
                        <Flex
                          alignSelf="flex-end"
                          flex="1 0 21%"
                          flexDirection="column"
                          alignItems="center"
                          key={index}
                          className="image-item"
                        >
                          <img src={image.data_url} alt="" width="100" />
                          <Flex margin="1rem 0" gap="1rem">
                            <button
                              className={s.button}
                              onClick={() => onImageUpdate(index)}
                            >
                              Update
                            </button>
                            <button
                              className={s.button}
                              onClick={() => onImageRemove(index)}
                            >
                              Remove
                            </button>
                          </Flex>
                        </Flex>
                      ))}
                    </Flex>
                  </Flex>
                )}
              </ImageUploading>
            </Flex>
          </Flex>
        </Flex>

        <button className={s.finalButton} onClick={handleSubmit}>
          Add project
        </button>
      </Box>
    )}
    {admin === "delete" && (
      <Box>
        <Flex flexDirection="column" gap="2rem">
          <Text>Projects list</Text>
          <Flex flexDirection="column" gap="2rem">
            {projects?.map((el) => (
              <Flex
                key={el.id}
                flexDirection="column"
                alignItems="center"
                gap="2rem"
                className={s.item}
              >
                <Text maxW="100%" style={{ wordWrap: "break-word" }}>
                  {el.title}
                </Text>
                <img
                  className={s.image}
                  src={`${API_URL}image/${el.title}/main/0.jpeg`}
                  alt={el.title}
                />
                <button
                  className={s.button}
                  onClick={async () => await deleteProject(el)}
                >
                  Delete Project
                </button>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Box>
    )}

    {admin === "messages" && (
      <Box>
        <Flex flexDirection="column" gap="2rem">
          <Text>Messages list</Text>
          <Flex flexDirection="column" gap="2rem">
            {messages?.map((el) => (
              <Flex
                key={el.id}
                flexDirection="column"
                alignItems="flex-start"
                gap="2rem"
                className={s.item}
              >
                <Text maxW="100%" style={{ wordWrap: "break-word" }}>
                  First Name: {el.firstName}
                </Text>
                <Text maxW="100%" style={{ wordWrap: "break-word" }}>
                  Last Name: {el.lastName}
                </Text>
                <Text maxW="100%" style={{ wordWrap: "break-word" }}>
                  Email: {el.email}
                </Text>
                <Text maxW="100%" style={{ wordWrap: "break-word" }}>
                  Phone: {el.phone}
                </Text>
                <Text maxW="100%" style={{ wordWrap: "break-word" }}>
                  Message: {el.message}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Box>
    )}
  </div>
);

export default AdminPage;
