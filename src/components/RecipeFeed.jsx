import {
  Box,
  Heading,
  Image,
  Stack,
  StackSeparator,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function RecipeFeed({ data, title }) {
  return (
    <Stack marginLeft={["0", "0", "48"]} padding="8">
      <Heading padding="4" paddingTop="0" size="2xl">
        {title}
      </Heading>
      <Stack
        width={["full", "full", "7/12"]}
        gap="8"
        separator={<StackSeparator />}
      >
        {data.map((recipe, index) => (
          <Stack key={index} gap="4" padding="4">
            {recipe.featuredImage && (
              <Image src={recipe.featuredImage} borderRadius="sm" />
            )}
            <Stack gap="4">
              <Heading lineClamp="2">
                <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
              </Heading>
              <Text lineClamp="3">{recipe.description}</Text>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default RecipeFeed;
