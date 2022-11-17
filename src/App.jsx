import PostList from "./components/PostList";
import { ChakraProvider, Container} from "@chakra-ui/react";
import Header from "./components/Header";

function App() {
  return (
    <ChakraProvider>
      <Container maxW="100%" bg="gray.200" color="#262626">
        <Header />
        <PostList />
      </Container>
    </ChakraProvider>
  );
}

export default App;
