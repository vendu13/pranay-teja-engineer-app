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
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
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

  // Querying projects and messages data
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

  // Handling main image change
  const onChangeMain = (imageList) => {
    setMain(imageList);
  };

  // Handling gallery images change
  const onChangeGallery = (imageList) => {
    setGallery(imageList);
  };

  // Handle project submission
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

    if (gallery.length !== 0) {
      await setProjectGallery(formDataGallery);
    }
    await setProjectMain(formDataMain);

    alert("Project successfully added");
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle loading and error states
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
        <button className={s.finalButton} onClick={() => setAdmin("add")}>
          Add Project
        </button>
        <button className={s.finalButton} onClick={() => setAdmin("delete")}>
          Delete Project
        </button>
        <button className={s.finalButton} onClick={() => setAdmin("messages")}>
          View Messages
        </button>
      </div>

      {/* Add Project Form */}
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
                {list.map((item, key) => (
                  <option key={key} value={key}>
                    {item}
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
                  }) => (
                    <Flex flexDirection="column" alignItems="center">
                      <Flex gap="2rem" justifyContent="center">
                        <button className={s.button} onClick={onImageUpload}>
                          Click here to upload
                        </button>
                        <button className={s.button} onClick={onImageRemoveAll}>
                          Remove all images
                        </button>
                      </Flex>
                      <Flex margin="1rem" gap="1rem" flexWrap="wrap">
                        {imageList.map((image, index) => (
                          <Flex
                            key={index}
                            alignSelf="flex-end"
                            flex="1 0 21%"
                            flexDirection="column"
                            alignItems="center"
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

            {/* Add gallery */}
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
                  }) => (
                    <Flex flexDirection="column" alignItems="center">
                      <Flex gap="2rem" justifyContent="center">
                        <button className={s.button} onClick={onImageUpload}>
                          Click here to upload
                        </button>
                        <button className={s.button} onClick={onImageRemoveAll}>
                          Remove all images
                        </button>
                      </Flex>
                      <Flex margin="1rem" gap="1rem" flexWrap="wrap">
                        {imageList.map((image, index) => (
                          <Flex
                            key={index}
                            alignSelf="flex-end"
                            flex="1 0 21%"
                            flexDirection="column"
                            alignItems="center"
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

      {/* Delete Project Section */}
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

      {/* Messages Section */}
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
};

export default AdminPage;
