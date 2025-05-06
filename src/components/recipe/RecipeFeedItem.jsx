import { Button, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { LuBookmark, LuThumbsUp } from "react-icons/lu";
import { Link } from "react-router-dom";

function RecipeFeedItem({ data, handleSave, handleLike, isSaved }) {
  return (
    <Stack gap="4" paddingX="4">
      {data.featuredImage && (
        <Image src={data.featuredImage} borderRadius="sm" />
      )}
      <Stack gap="8">
        <Stack>
          <Heading lineClamp="2">
            <Link to={`/recipe/${data.id}`}>{data.title}</Link>
          </Heading>
          <Text lineClamp="3">{data.description}</Text>
        </Stack>
        <HStack gap="4">
          <Button variant="outline" onClick={() => handleLike(data.id)}>
            <LuThumbsUp />
            Like
          </Button>
          <Button
            variant={isSaved ? "subtle" : "outline"}
            colorPalette={isSaved ? "green" : ""}
            onClick={() => handleSave(data)}
          >
            <LuBookmark />
            {isSaved ? "Saved" : "Save"}
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
}

export default RecipeFeedItem;
