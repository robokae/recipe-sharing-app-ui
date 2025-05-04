import { useParams } from "react-router-dom";
import { useFetchRecipe } from "../hooks/useFetchRecipe";
import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  List,
  Stack,
  Stat,
  StatGroup,
  Text,
} from "@chakra-ui/react";

function RecipePage() {
  const { id } = useParams();
  const { data } = useFetchRecipe(id, null);

  const getFullDate = (date) => {
    return new Date(date).toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const formattedHour = hours > 0 ? `${hours} hr${hours > 1 ? "s" : ""}` : "";
    const formattedMins = mins > 0 ? `${mins} min${mins !== 1 ? "s" : ""}` : "";
    return `${formattedHour} ${formattedMins}`;
  };

  console.log(data);

  return (
    data && (
      <Center mt="8">
        <Flex width={["full", "full", "2/3", "1/2"]} direction="column" gap="8">
          <Image rounded="sm" src={data.featuredImage} />
          <Stack gap="4">
            <Heading size="3xl">{data.title}</Heading>
            <HStack>
              <Text color="fg.subtle">{`${data.authorFirstName} ${
                data.authorLastName || ""
              }`}</Text>
              <Text color="fg.subtle">&bull;</Text>
              <Text color="fg.subtle">{getFullDate(data.createdAt)}</Text>
            </HStack>
            <Text>{data.description}</Text>
          </Stack>
          <StatGroup borderWidth="1px" rounded="sm" padding="8">
            <Stat.Root>
              <Stat.Label>Total time</Stat.Label>
              <Stat.ValueText>
                {formatTime(data.completionTimeInMinutes)}
              </Stat.ValueText>
            </Stat.Root>
            <Stat.Root>
              <Stat.Label>Servings</Stat.Label>
              <Stat.ValueText>{data.numServings}</Stat.ValueText>
            </Stat.Root>
          </StatGroup>
          <Stack gap="8">
            <Stack gap="4">
              <Heading size="2xl">Ingredients</Heading>
              <List.Root gap="2" marginLeft="4">
                {data.ingredients?.split("\n").map((ingredient, index) => (
                  <List.Item key={index}>{ingredient}</List.Item>
                ))}
              </List.Root>
            </Stack>
            <Stack gap="4">
              <Heading size="2xl">Instructions</Heading>
              <List.Root gap="4" as="ol" marginLeft="4">
                {data.instructions?.split("\n").map((step, index) => (
                  <List.Item key={index}>{step}</List.Item>
                ))}
              </List.Root>
            </Stack>
          </Stack>
        </Flex>
      </Center>
    )
  );
}

export default RecipePage;
