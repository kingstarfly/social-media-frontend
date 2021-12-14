import { FormEventHandler, useContext, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { UserContext } from "../../../App";
import { createPost } from "../../../api/posts";

interface Props {
  afterButtonClick: () => void;
}

const CreatePost = ({ afterButtonClick }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const userContext = useContext(UserContext);

  const handleButtonClick = async () => {
    if (!userContext?.username) {
      return;
    }
    await createPost({
      title,
      content,
      username: userContext?.username,
    });

    afterButtonClick();
  };
  return (
    <VStack spacing={8} flexDir="column" align="center" py={16}>
      <FormControl id="post-title" isRequired>
        <FormLabel>Title</FormLabel>
        <Input
          placeholder="Your amazing title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>

      <FormControl id="post-content" isRequired>
        <FormLabel>Content</FormLabel>
        <Textarea
          size="lg"
          placeholder="Share your story!"
          isRequired
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </FormControl>

      <Button onClick={handleButtonClick}>Create Post</Button>
    </VStack>
  );
};

export default CreatePost;
