import { Box, Image, Button, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
export function MyProfile() {
  const dataProfil = useSelector((item: any) => item.auth);

  return (
    <>
      <Box position="relative" bg="#403d39" boxSizing="border-box" p="10px" borderRadius="20px">
        <Text color="white" mb="10px">
          My Profile
        </Text>
        <Image src={dataProfil.profile_picture} w="100%" h="80px" borderRadius="10px" />
        <Image src={dataProfil.profile_picture} borderRadius="50%" w="60px" h="60px" m="0 20px" position="absolute" top="80px" border="5px solid #403d39" />
        <Box display="flex" justifyContent="end" mt="1rem">
          <Button variant="outline" borderRadius="20px" color="white" h="25px">
            Edit Profil
          </Button>
        </Box>
        <Text color="white" fontSize="20px">
          {dataProfil.full_name}
        </Text>
        <Text fontSize={"10px"} color="#ccc5b9" mb="8px">
          @{dataProfil.username}
        </Text>
        <Text color="white" fontSize="15px" mb="8px">
          {dataProfil.profile_description}
        </Text>
        <Box display="flex" gap="1rem" color="white" fontSize="12px" mb="8px">
          <Text>291 Following</Text>
          <Text>31 Followers</Text>
        </Box>
      </Box>
    </>
  );
}
