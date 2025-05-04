import { Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function RecipeFeedItem({ data }) {
  return (
    <Stack gap="4" padding="4">
      {data.featuredImage && (
        <Image src={data.featuredImage} borderRadius="sm" />
      )}
      <Stack gap="4">
        <Heading lineClamp="2">
          <Link to={`/recipe/${data.id}`}>{data.title}</Link>
        </Heading>
        <Text lineClamp="3">{data.description}</Text>
      </Stack>
    </Stack>
  );
}

export default RecipeFeedItem;
