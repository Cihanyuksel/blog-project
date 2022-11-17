import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../features/userSlice";

const PostAuthor = ({userId}) => {
  const users = useSelector(selectAllUsers);
  const author = users.find((user) => user.id === userId);

  return <Box fontWeight="bold" as='span'> by {author ? author.name : "Unknown author"}</Box>;
};

export default PostAuthor;
