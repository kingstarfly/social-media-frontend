import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { fetchPost, updatePost } from "../../../api/posts";
import { UserContext } from "../../../App";
import { useContext, useEffect, useState } from "react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { PostDetails } from "types";

interface Props {
  post: PostDetails;
}

const Post = ({ post }: Props) => {
  const userContext = useContext(UserContext);

  const borderColor = useColorModeValue("gray.200", "gray.500");
  const barBgColor = useColorModeValue("gray.100", "gray.800");

  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(
    post.likedUsers?.length || 0
  );

  useEffect(() => {
    if (
      post.likedUsers?.some((username) => {
        return username === userContext?.username;
      })
    ) {
      setLiked(true);
    }
  }, [userContext]);

  const handleLikeClick = async () => {
    if (!userContext?.username) {
      return;
    }
    try {
      if (liked) {
        setLiked(false);
        setLikeCount((prev) => Math.max(prev - 1, 0));
        (post.likedUsers = post?.likedUsers?.filter(
          (username) => username !== userContext?.username
        )),
          // Remove the like
          await updatePost({
            ...post,
            likedUsers: post.likedUsers,
          });
      } else {
        setLiked(true);
        setLikeCount((prev) => prev + 1);
        // Add the like
        const newLikedUsers = post.likedUsers || [];
        if (userContext?.username) {
          newLikedUsers.push(userContext.username);
        }
        await updatePost({
          ...post,
          likedUsers: newLikedUsers,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderLikePreview = (usernames: string[] | undefined) => {
    if (!usernames || usernames.length === 0) {
      return "";
    }
    if (usernames.length == 1) {
      return `${usernames[0]} liked this`;
    } else if (usernames.length == 2) {
      return `${usernames[0]} and ${usernames[1]} liked this`;
    } else {
      return `${usernames[0]}, ${usernames[1]} and others liked this`;
    }
  };

  return (
    <Flex
      textAlign="center"
      flexDir="column"
      border="1px solid"
      borderColor={borderColor}
      alignItems="flex-start"
      rounded={10}
      boxShadow="md"
      my={4}
    >
      <Flex
        p={4}
        textAlign="center"
        flexDir="column"
        alignItems="flex-start"
        rounded={10}
      >
        <Heading fontSize={"2xl"}>{post.title}</Heading>
        <Text fontSize="md" opacity={0.7}>
          {post.username}
        </Text>

        <Text mt={8} noOfLines={8} textAlign="left">
          {post.content}
        </Text>
      </Flex>

      <Flex
        bgColor={barBgColor}
        width="full"
        mt={4}
        align="center"
        roundedBottom={10}
      >
        <IconButton
          aria-label="like"
          variant="ghost"
          size="md"
          icon={liked ? <RiHeartFill /> : <RiHeartLine />}
          onClick={handleLikeClick}
          _focus={{ boxShadow: "none" }}
        />
        <Text mr={4}>{likeCount || 0}</Text>
        <Text fontSize="xs">{renderLikePreview(post?.likedUsers)}</Text>
      </Flex>
    </Flex>
  );
};

export default Post;
