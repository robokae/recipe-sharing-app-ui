import {
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Menu,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";

function RecipeGrid({ data, editOptions }) {
  return (
    <Grid
      templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
      gap="4"
    >
      {data.map((recipe, index) => (
        <Stack gap="4" key={index}>
          <Image height="48" objectFit="cover" src={recipe.featuredImage} />
          <Flex justify="space-between">
            <Heading lineClamp="2">
              <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            </Heading>
            {editOptions && (
              <Menu.Root positioning={{ placement: "bottom-end" }}>
                <Menu.Trigger asChild>
                  <Button padding="0" color="fg.subtle" variant="plain">
                    <HiDotsVertical />
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Link to={`/recipe/edit/${recipe.id}`}>
                        <Menu.Item cursor="pointer" value="edit">
                          Edit
                        </Menu.Item>
                      </Link>
                      <Menu.Item cursor="pointer" value="delete">
                        Delete
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            )}
          </Flex>
        </Stack>
      ))}
    </Grid>
  );
}

export default RecipeGrid;
