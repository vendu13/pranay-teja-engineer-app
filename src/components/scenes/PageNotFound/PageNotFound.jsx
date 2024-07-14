import { Flex, Text } from '@chakra-ui/react';

function PageNotFound() {
  return (
    <Flex
      w="100%"
      h="100vh"
      flexDirection="column"
      gap="2rem"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="4xl" as="b">404</Text>
      <Text>Page is not found</Text>
    </Flex>
  );
}
export default PageNotFound;
