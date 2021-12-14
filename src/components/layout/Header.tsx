import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { UserContext } from "../../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const bg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.500");
  const userContext = useContext(UserContext);

  return (
    <Flex
      as="header"
      width="full"
      alignSelf="center"
      justifyContent="center"
      gridGap={2}
      bgColor={bg}
      borderBottom="2px solid"
      borderColor={borderColor}
    >
      <Flex width="65%" py={2} align="center">
        <Link to="/">
          <Heading as="h1" size="sm">
            Cloudfare Social Media App
          </Heading>
        </Link>

        <Flex marginLeft="auto" align="center">
          <Text mr={4}>
            {userContext?.username || "Refresh page to login!"}
          </Text>
          <ThemeToggle />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
