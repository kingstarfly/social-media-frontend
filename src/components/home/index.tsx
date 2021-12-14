import { useCallback, useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { fetchAllPosts } from "../../api/posts";
import { PostDetails } from "types";

import Post from "./components/Post";
import Login from "./components/Login";
import { UserContext } from "../../App";
import CreatePost from "./components/CreatePost";

const Home = () => {
  const [posts, setPosts] = useState<PostDetails[]>();
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const userContext = useContext(UserContext);

  const getAndSet = useCallback(async () => {
    // console.log("Get and set called");
    const _posts = await fetchAllPosts();
    setPosts(_posts);
  }, []);

  useEffect(() => {
    getAndSet();
  }, [userContext]);

  useEffect(() => {
    if (!userContext?.username) {
      setIsLoginOpen(true);
    } else {
      setIsLoginOpen(false);
    }
  }, [userContext]);

  const onLoginClose = () => {
    setIsLoginOpen(false);
  };

  const LoginModal = (
    <Modal
      isOpen={isLoginOpen}
      onClose={onLoginClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Please Login!</ModalHeader> <ModalCloseButton />
        <ModalBody>
          <Login />
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  const CreatePostModal = (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Create a Post!</ModalHeader> <ModalCloseButton />
        <ModalBody>
          <CreatePost
            afterButtonClick={() => {
              getAndSet().then(() => onClose());
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  return (
    <Container>
      <Flex align="center" justify="space-between">
        {LoginModal}
        {CreatePostModal}
        <Heading fontSize={"5xl"} my={4}>
          For You
        </Heading>
        <Button onClick={onOpen} colorScheme="orange">
          Create New Post
        </Button>
      </Flex>

      <Divider mb={8} />
      <Grid gap={4}>
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
