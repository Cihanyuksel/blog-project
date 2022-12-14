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
import { addNewPost } from "../services";

const AddPostForm = ({onClose, setCurrentButton}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        // The thunks generated by createAsyncThunk will always return a resolved promise with either the fulfilled action object or rejected action object inside, as appropriate.
        dispatch(addNewPost({ title, body: content, userId })).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        setCurrentButton(1)
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
        onClose();
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

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
              value={title}
              onChange={onTitleChanged}
              size="md"
              variant="filled"
              placeholder="Post Title"
            />
          </Box>
          <Box>
            <FormLabel htmlFor="postAuthor">Author:</FormLabel>
            <Select id="postAuthor" value={userId} onChange={onAuthorChanged}>
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
              onChange={onContentChanged}
            />
          </Box>
          <Button
            colorScheme="teal"
            size="md"
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
          >
            Save Post
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};
export default AddPostForm;

// Calling Logic,  bu actionlar?? orijinal "promise content"mi?? gibi ele almak isteyebilir. dispatch edilen thunk taraf??ndan return edilen promise, bir fullfilled action??n??n payload??n?? ????karmak veya hatay?? veya varsa, bir rejected action??n??n redWithValue taraf??ndan olu??turulan "payload??" atmak i??in ??a??r??labilecek bir "unwrap ??zelli??ine" sahiptir:
