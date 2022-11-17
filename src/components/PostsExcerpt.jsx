import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import {
  Button,
  Box,
  Container,
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
import { useRef, useState } from "react";
import EditPostForm from "./EditPostForm";
import { deletePost } from "../services";
import { useDispatch } from "react-redux";

const PostsExcerpt = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  // const [requestStatus, setRequestStatus] = useState("idle");
  const dispatch = useDispatch();

  const onDeletePostClicked = async () => {
    try {
        // setRequestStatus('pending')
        await dispatch(deletePost({ id: post.id })).unwrap()
    } catch (err) {
        console.error('Failed to delete the post', err)
    } finally {
        // setRequestStatus('idle')
    }
  }


  return (
    <Container key={post.id}>
      <Box
        borderWidth="2px"
        borderRadius="lg"
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        gap={1}
        h="300px"
        p={5}
        borderColor="gray.500"
      >
        <Text fontSize="xl" fontWeight="bold">
          {post.title.substring(0, 30)}...
        </Text>
        <Text>{post.body.substring(0, 100)}...</Text>
        <Box>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </Box>
        <ReactionButtons post={post} />
        <Box display="flex" justifyContent="space-around">
        <Button onClick={onOpen} bg="blue.600" color="#fff" _hover={{color: "black"}} w="40%">
          Edit
        </Button>
        <Button onClick={onDeletePostClicked} bg="red.600" color="#fff" _hover={{color: "black"}} w="40%">
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
            <EditPostForm onClose={onClose} post={post} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default PostsExcerpt;
