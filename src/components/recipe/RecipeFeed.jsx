import { Box, Heading, Stack, StackSeparator } from "@chakra-ui/react";
import RecipeFeedItem from "./RecipeFeedItem";

function RecipeFeed({ data, title }) {
  return (
    <Stack
      marginLeft={["0", "0", "48"]}
      paddingX={["0", "0", "8"]}
      paddingY="8"
    >
      <Heading padding="4" paddingTop="0" size="2xl">
        {title}
      </Heading>
      <Stack
        width={["full", "full", "full", "2/3"]}
        gap="8"
        separator={<StackSeparator />}
      >
        {data.map((recipe, index) => (
          <RecipeFeedItem data={recipe} key={index} />
        ))}
      </Stack>
    </Stack>
  );
}

export default RecipeFeed;
