import { Box, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      w="100%"
      h="100px"
      bg="gray.300"
      display="flex"
      alignItems="center"
      marginBottom="10px"
    >
      <Text fontSize="3xl" fontWeight="bold" pl={5}>
        BLOG POST
      </Text>
    </Box>
  );
};

export default Header;
