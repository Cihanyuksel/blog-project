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

  const smoothScroll = {
    top: 0,
    left: 0,
    behavior: "smooth",
  };

  const prev = () => {
    setCurrentButton((prev) => (prev === 1 ? prev : prev - 1));
    if(currentButton === 1) {
      return
    }
    window.scrollTo(smoothScroll);
  };

  const next = () => {
    setCurrentButton((prev) => (prev === numOfPages.length ? prev : prev + 1));
    if(currentButton === totalPageNum) {
      return
    }
    window.scrollTo(smoothScroll);
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
          <Button marginRight={1} onClick={() => prev()} disabled={currentButton === 1}>
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
          <Button onClick={() => next()} disabled={currentButton === totalPageNum}>Next</Button>
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
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </Select>
      </UnorderedList>
    </Box>
  );
};

export default Pagination;

// currentButton
