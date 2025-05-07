import { Flex, Text } from "@chakra-ui/react";

function NoContentPlaceholder({ contentName }) {
  return (
    <Flex height="32" justifyContent="center" alignItems="center">
      <Text color="fg.subtle">There are currently no {contentName}s.</Text>
    </Flex>
  );
}

export default NoContentPlaceholder;
