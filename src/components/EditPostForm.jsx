import {
  Button,
  Input,
  Select,
  Textarea,
  Box,
  FormLabel,
  FormControl,
  Container,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../features/userSlice";
import { updatePost } from "../services";

const EditPostForm = ({ post, onClose, setCurrentButton }) => {
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            userId,
            id: post.id,
            title,
            body: content,
            reactions: post.reactions,
          })
        );
        setCurrentButton(1);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setRequestStatus("idle");
      }
      onClose();
    }
  };

  return (
    <Container centerContent>
      <Box w="100%" maxW="100%" p={5} color="#000">
        <FormControl display="flex" flexDirection="column" gap={3}>
          <Box>
            <FormLabel color="#000" htmlFor="postTitle">
              Post Title:
            </FormLabel>
            <Input
              type="text"
              id="postTitle"
              name="postTitle"
              size="md"
              variant="filled"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box>
            <FormLabel htmlFor="postAuthor">Author:</FormLabel>
            <Select
              id="postAuthor"
              value={userId}
              onChange={(e) => setUserId(Number(e.target.value))}
            >
              <option value="">Please Choose Author</option>
              {usersOptions}
            </Select>
          </Box>
          <Box>
            <FormLabel htmlFor="postContent">Content:</FormLabel>
            <Textarea
              id="postContent"
              name="postContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Box>
          <Button
            onClick={onSavePostClicked}
            colorScheme="teal"
            size="md"
            disabled={!canSave}
          >
            Save Post
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};

export default EditPostForm;
