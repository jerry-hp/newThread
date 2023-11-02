import { Box, Image, Button, Text } from "@chakra-ui/react";

export  function SuggestedFollow() {
  return (
    <>
      <Box position="relative" bg="#403d39" boxSizing="border-box" p="10px" borderRadius="20px">
        <Text color="white" mb="10px">
          Suggested for you
        </Text>
        <Box display="flex" flexDirection="column" gap="15px">
          <Box display="grid" gridTemplateAreas="'image name btn' 'image username btn'" gridTemplateColumns="1fr 4fr 2fr" gridTemplateRows="auto auto" columnGap={1}>
            <Image src="https://source.unsplash.com/random/500x500" gridArea="image" w="40px" borderRadius="50%" />
            <Text color="white" gridArea="name">
              M. Jawir
            </Text>
            <Text color="grey" fontSize="13px" gridArea="username">
              @M.Jawir
            </Text>
            <Button variant="outline" color="white" gridArea="btn">
              Follow
            </Button>
          </Box>
          <Box display="grid" gridTemplateAreas="'image name btn' 'image username btn'" gridTemplateColumns="1fr 4fr 2fr" gridTemplateRows="auto auto" columnGap={1}>
            <Image src="https://source.unsplash.com/random/500x500" gridArea="image" w="40px" borderRadius="50%" />
            <Text color="white" gridArea="name">
              M. Jawir
            </Text>
            <Text color="grey" fontSize="13px" gridArea="username">
              @M.Jawir
            </Text>
            <Button variant="outline" color="white" gridArea="btn">
              Follow
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
