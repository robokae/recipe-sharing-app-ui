import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Menu,
  Portal,
  Stack,
  Stat,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthProvider";
import { Link, useParams } from "react-router-dom";
import { useFetchRecipe } from "../hooks/useFetchRecipe";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { HiDotsVertical } from "react-icons/hi";

function AccountProfile() {
  const { user } = useAuth();
  const { username } = useParams();
  const { callApi } = useApi();
  const [profileData, setProfileData] = useState(null);
  const { data } = useFetchRecipe(null, username);
  const tabs = ["recipes", username === profileData?.username ? "saved" : null];

  useEffect(() => {
    setProfileData(null);
    const fetchProfile = async (username) => {
      const response = await callApi(`/api/profile/${username}`, "GET");
      if (response) {
        setProfileData(response.data);
      }
    };
    fetchProfile(username);
  }, [username]);

  return (
    profileData && (
      <Center>
        <Stack marginY="8" width={["full", "full", "3/4"]} gap="8">
          <Stack gap="8">
            <Box gap="4">
              <Flex justify="space-between">
                <Heading size="3xl">{`${profileData.firstName} ${
                  profileData.lastName || ""
                }`}</Heading>
                {profileData.username === user.username && (
                  <Link to="/">
                    <Button variant="outline">Edit profile</Button>
                  </Link>
                )}
              </Flex>
              <Text color="fg.subtle">@{profileData.username}</Text>
            </Box>
            {profileData.description && <Text>{profileData.description}</Text>}
            <HStack gap="4" width={["3/4", "1/2", "1/4"]}>
              <Stat.Root>
                <Stat.Label>Joined</Stat.Label>
                <Stat.ValueText>
                  {new Date(profileData.createdAt).getFullYear()}
                </Stat.ValueText>
              </Stat.Root>
              <Stat.Root>
                <Stat.Label>Recipes</Stat.Label>
                <Stat.ValueText>{data.length}</Stat.ValueText>
              </Stat.Root>
            </HStack>
          </Stack>
          {data.length > 0 && (
            <Tabs.Root defaultValue="recipes" variant="line">
              <Tabs.List>
                {tabs.map((tab, index) => (
                  <Tabs.Trigger key={index} value={tab}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              <Tabs.Content value="recipes">
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
                      <Flex justify="space-between">
                        <Heading lineClamp="2">
                          <Link to={`/recipe/${recipe.id}`}>
                            {recipe.title}
                          </Link>
                        </Heading>
                        {profileData.username === username && (
                          <Menu.Root positioning={{ placement: "bottom-end" }}>
                            <Menu.Trigger asChild>
                              <Button
                                padding="0"
                                color="fg.subtle"
                                variant="plain"
                              >
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
              </Tabs.Content>
            </Tabs.Root>
          )}
        </Stack>
      </Center>
    )
  );
}

export default AccountProfile;
