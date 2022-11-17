import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Grid,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import AddPostForm from "./AddPostForm";
import {
  getPostsError,
  getPostsStatus,
  selectAllPosts,
} from "../features/postSlice";
import Pagination from "./Pagination";
import PostsExcerpt from "./PostsExcerpt";
import { fetchPosts } from "../services";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(
    localStorage.getItem("postsPerPage")
  );
  const [currentButton, setCurrentButton] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage; //1 * 9
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 9 - 9
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); //slice(0, 9)
  const totalPageNum = Math.ceil(posts.length / postsPerPage); // 100 / 9 = 12

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts("name"));
      // .unwrap()
      // .then((item) => console.log(item));
    }
  }, [dispatch, postsStatus]);

  let content;
  if (postsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postsStatus === "succeeded") {
    content = currentPosts.map((post) => (
      <PostsExcerpt
        key={post.id}
        post={post}
        postsPerPage={postsPerPage}
        setCurrentButton={setCurrentButton}
      />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  // grid design
  const gridDesign = (item) => {
    switch (item) {
      case "5":
        return "repeat(1, 1fr)";
      case "10":
        return "repeat(2, 1fr)";
      case "15":
        return "repeat(3, 1fr)";
      default:
        console.log("asfa");
    }
  };

  return (
    <Box bg="gray.200" p={2}>
      <Box>
        <Button
          mt={4}
          onClick={onOpen}
          bg="blue.600"
          color="white"
          marginBlock={5}
        >
          Add New Post
        </Button>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AddPostForm
                setCurrentButton={setCurrentButton}
                onClose={onClose}
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Grid templateColumns={gridDesign(postsPerPage)} gap={5}>
          {content}
        </Grid>
      </Box>
      <Pagination
        setPostsPerPage={setPostsPerPage}
        currentButton={currentButton}
        setCurrentButton={setCurrentButton}
        totalPageNum={totalPageNum}
        setCurrentPage={setCurrentPage}
        postsPerPage={postsPerPage}
      />
    </Box>
  );
};

export default PostList;
