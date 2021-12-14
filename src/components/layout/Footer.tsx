import { Box, Flex, Link, Text } from "@chakra-ui/react";
import CTASection from "components/home/components/CTASection";

const Footer = () => {
  return (
    <Box as="footer" width="full" bottom={0} p={8}>
      <CTASection />
    </Box>
  );
};

export default Footer;
