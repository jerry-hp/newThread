import { Box, Text, Heading, Button } from "@chakra-ui/react";
import { FaHome, FaSearch, FaHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { AUTH_LOGOUT ,AUTH_ERROR} from "../../store/rootReducer";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogOut() {
    dispatch(AUTH_LOGOUT());
    // dispatch(AUTH_ERROR())
    navigate("/login");
  }

  return (
    <div>
      <Box color="white" boxSizing="border-box" p="10px 25px" display={"flex"} flexDirection={"column"} gap={"1rem"} position={"fixed"}>
        <Heading mb="1rem" color="#008000" size={"4xl"}>
          cicle
        </Heading>
        <Text display={"flex"} alignItems={"center"} gap={"10px"}>
          <FaHome /> Home
        </Text>
        <Text display={"flex"} alignItems={"center"} gap={"10px"}>
          <FaSearch />
          Search
        </Text>
        <Text display={"flex"} alignItems={"center"} gap={"10px"}>
          <FaHeart />
          Follows
        </Text>
        <Text display={"flex"} alignItems={"center"} gap={"10px"}>
          <CgProfile />
          Profile
        </Text>
        <Button mt="1rem" variant={"unstyled"} bg="#008000" p="10px 60px" borderRadius={"40px"}>
          Create Post
        </Button>
        <Button mt="1rem" variant={"unstyled"} bg="red" p="10px 60px" borderRadius={"40px"} onClick={handleLogOut}>
          Log Out
        </Button>
      </Box>
    </div>
  );
}
