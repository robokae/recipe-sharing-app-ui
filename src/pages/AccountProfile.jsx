import {
  Center,
  Grid,
  Heading,
  HStack,
  Image,
  Stack,
  StackSeparator,
  Stat,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthProvider";
import { Link, useParams } from "react-router-dom";
import { useFetchRecipe } from "../hooks/useFetchRecipe";

function AccountProfile() {
  const { user } = useAuth();
  const { username } = useParams();
  const { data } = useFetchRecipe(null, username);

  return (
    <Center>
      <Stack
        marginY="8"
        width={["full", "full", "3/4"]}
        gap="8"
        separator={<StackSeparator />}
      >
        <Stack gap="8">
          <Heading size="3xl">{user.username}</Heading>
          <HStack gap="4" width={["3/4", "1/2", "1/4"]}>
            <Stat.Root>
              <Stat.Label>Joined</Stat.Label>
              <Stat.ValueText>
                {new Date(user.createdAt).getFullYear()}
              </Stat.ValueText>
            </Stat.Root>
            <Stat.Root>
              <Stat.Label>Recipes</Stat.Label>
              <Stat.ValueText>{data.length}</Stat.ValueText>
            </Stat.Root>
          </HStack>
        </Stack>
        {data.length > 0 && (
          <Stack gap="8">
            <Heading size="2xl">Recipes</Heading>
            <Grid
              templateColumns={[
                "repeat(1, 1fr)",
                "repeat(2, 1fr)",
                "repeat(3, 1fr)",
              ]}
              gap="4"
            >
              {data.map((recipe, index) => (
                <Stack gap="4" key={index}>
                  <Image
                    height="48"
                    objectFit="cover"
                    src={recipe.featuredImage}
                  />
                  <Heading lineClamp="2">
                    <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                  </Heading>
                </Stack>
              ))}
            </Grid>
          </Stack>
        )}
      </Stack>
    </Center>
  );
}

export default AccountProfile;
