import { Box, Button, ListItem, Select, UnorderedList } from "@chakra-ui/react";
import { useEffect } from "react";

const Pagination = ({
  totalPageNum,
  setCurrentPage,
  setCurrentButton,
  currentButton,
  setPostsPerPage,
  postsPerPage,
}) => {
  const numOfPages = [];

  for (let i = 1; i <= totalPageNum; i++) {
    numOfPages.push(i);
  }

  useEffect(() => {
    setCurrentPage(currentButton);
  }, [currentButton, setCurrentPage]);

  const prev = () => {
    setCurrentButton((prev) => (prev === 1 ? prev : prev - 1));
  };
  const next = () => {
    setCurrentButton((prev) => (prev === numOfPages.length ? prev : prev + 1));
  };

  useEffect(() => {
    localStorage.setItem("postsPerPage", postsPerPage);
  }, [postsPerPage]);

  return (
    <Box p={5}>
      <UnorderedList
        display="flex"
        justifyContent="flex-end"
        listStyleType="none"
      >
        <ListItem>
          <Button marginRight={1} onClick={() => prev()}>
            Previous
          </Button>
        </ListItem>
        {numOfPages.map((page, i) => {
          return (
            <ListItem key={i} marginRight={1}>
              <Button
                onClick={() => setCurrentButton(page)}
                bg={currentButton === page ? "blue.500" : "gray.300"}
                color={currentButton === page ? "white" : ""}
                disabled={numOfPages.length === 1}
              >
                {page}
              </Button>
            </ListItem>
          );
        })}
        <ListItem>
          <Button onClick={() => next()}>Next</Button>
        </ListItem>
        <Select
          w="100px"
          bg="blue.500"
          fontWeight="bold"
          marginLeft={2}
          onChange={(e) => {
            setPostsPerPage(e.target.value);
            setCurrentButton(1);
          }}
          defaultValue={localStorage.getItem("postsPerPage")}
        >
          <option value="">Select</option>
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="18">18</option>
        </Select>
      </UnorderedList>
    </Box>
  );
};

export default Pagination;

// currentButton
