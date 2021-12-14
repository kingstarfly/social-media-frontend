import { Box, Button, Flex, Image, Link } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";

const CTASection = () => (
  <Box textAlign="center">
    <Link _hover={undefined} href="https://github.com/kingstarfly" isExternal>
      <Button leftIcon={<AiFillGithub />}>Check out my Github</Button>
    </Link>
  </Box>
);

export default CTASection;
