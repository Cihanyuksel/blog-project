import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "../features/postSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <Button
        key={name}
        type="button"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
        _hover={{ color: '#444', bg: 'gray.200' }}
        w="25px"
        h="25px"
        p={3}
        marginRight={5}
      >
        {emoji} {post.reactions[name]}
      </Button>
    );
  });

  return <div>{reactionButtons}</div>;
};
export default ReactionButtons;
