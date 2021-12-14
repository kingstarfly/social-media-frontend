import {
  Box,
  Center,
  Container,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const bg = useColorModeValue("gray.50", "gray.900");

  return (
    <Flex
      margin="0 auto"
      transition="0.5s ease-out"
      bgColor={bg}
      minH="100vh"
      flexDir="column"
    >
      <Meta />
      <Flex flexDir="column" minHeight="full" w="full">
        <Header />
        <Box width="full" as="main">
          {children}
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
