import { Navbar, MyProfile, SuggestedFollow, Footer } from "../components";
import { Text, Box } from "@chakra-ui/react";
import Formstatus from "../Features/Threads/component/formThread";
import { ReactNode } from "react";

function Main({ children }: { children: ReactNode }) {
  return (
    <div style={{ width: "100%", backgroundColor: "#343a40", minHeight: "100vh" }}>
      <Box maxW="1366px" m="0 auto" display="flex" flexDirection="row">
        <Box w="20%">
          <Navbar />
        </Box>
        <Box w="50%" borderX="1px solid white">
          <Box boxSizing="border-box" p="10px">
            <Text color="white" mb="10px">
              Home
            </Text>
            <Formstatus />
          </Box>
          {children}
        </Box>
        <Box w="30%" boxSizing="border-box" p="10px 15px" position="fixed" top="0" right="0" display="flex" flexDirection="column" gap="1rem">
          <MyProfile />
          <SuggestedFollow />
          <Footer />
        </Box>
      </Box>
    </div>
  );
}

export default Main;
