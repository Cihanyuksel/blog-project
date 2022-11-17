import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import {
  Button,
  Box,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import EditPostForm from "./EditPostForm";
import { deletePost } from "../services";
import { useDispatch } from "react-redux";

const PostsExcerpt = ({ post, postsPerPage, setCurrentButton }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  const dispatch = useDispatch();

  const onDeletePostClicked = async () => {
    try {
      await dispatch(deletePost({ id: post.id })).unwrap();
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  const trunciate = (content, slice) => {
    if (content.length > 20) {
      return `${content.slice(0, slice)}...`;
    } else {
      return content;
    }
  };

  return (
    <Box key={post.id}>
      <Box
        borderWidth="2px"
        borderRadius="lg"
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        gap={1}
        h="300px"
        w="100%"
        p={5}
        borderColor="gray.500"
      >
        <Text fontSize="xl" fontWeight="bold">
          {postsPerPage === "5"
            ? trunciate(post.title)
            : trunciate(post.title, 20)}
        </Text>
        <Text>
          {postsPerPage === "5"
            ? trunciate(post.body)
            : trunciate(post.body, 100)}
        </Text>
        <Box>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </Box>
        <ReactionButtons post={post} />
        <Box display="flex" gap={5}>
          <Button
            onClick={onOpen}
            bg="blue.600"
            color="#fff"
            _hover={{ color: "black" }}
            // w={postsPerPage === "5" ? "7%" : "15%"}    
            w="70px"
            h="40px"        
            px="16px"
          >
            Edit
          </Button>
          <Button
            onClick={onDeletePostClicked}
            bg="red.600"
            color="#fff"
            _hover={{ color: "black" }}
            w="70px"
            h="40px"        
            px="16px"
          >
            Delete
          </Button>
        </Box>
      </Box>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditPostForm onClose={onClose} post={post} setCurrentButton={setCurrentButton} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PostsExcerpt;
