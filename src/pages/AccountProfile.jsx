import {
  Box,
  Button,
  Center,
  Container,
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
import RecipeGrid from "../components/recipe/RecipeGrid";
import Stats from "../components/profile/Stats";
import { useSaveRecipe } from "../hooks/useSaveRecipe";
import { useFetchFeaturedImage } from "../hooks/useFetchFeaturedImage";

function AccountProfile() {
  const { user } = useAuth();
  const { username } = useParams();
  const { callApi } = useApi();
  const { data } = useFetchRecipe(null, username);
  const { savedRecipes } = useSaveRecipe(username);
  const { fetchImage } = useFetchFeaturedImage();

  const [profileData, setProfileData] = useState(null);
  const [savedRecipesData, setSavedRecipesData] = useState([]);

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

  useEffect(() => {
    if (savedRecipes) {
      const fetchSavedRecipeFeaturedImages = async () => {
        for (const savedRecipe of savedRecipes) {
          savedRecipe.featuredImage = await fetchImage(
            savedRecipe.featuredImageId
          );
        }
        setSavedRecipesData(savedRecipes);
      };
      fetchSavedRecipeFeaturedImages();
    }
  }, [savedRecipes]);

  const NoContentMessage = ({ contentName }) => {
    return (
      <Flex height="32" justifyContent="center" alignItems="center">
        <Text color="fg.subtle">
          You currently do not have any {contentName}.
        </Text>
      </Flex>
    );
  };

  const profileStats = [
    {
      label: "Joined",
      value: new Date(profileData?.createdAt).getFullYear(),
    },
    {
      label: "Recipes",
      value: data.length,
    },
  ];

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
            <Stats data={profileStats} />
          </Stack>
          <Tabs.Root defaultValue="recipes" variant="line">
            <Tabs.List marginBottom="4">
              {tabs.map((tab, index) => (
                <Tabs.Trigger key={index} value={tab}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <Tabs.Content value="recipes">
              {data.length === 0 ? (
                <NoContentMessage contentName="recipes" />
              ) : (
                <RecipeGrid
                  data={data}
                  editOptions={profileData.username === username}
                />
              )}
            </Tabs.Content>
            <Tabs.Content value="saved">
              {savedRecipesData.length === 0 ? (
                <NoContentMessage contentName="saves" />
              ) : (
                <RecipeGrid data={savedRecipesData} />
              )}
            </Tabs.Content>
          </Tabs.Root>
        </Stack>
      </Center>
    )
  );
}

export default AccountProfile;
