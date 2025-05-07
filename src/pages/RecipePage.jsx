import { useNavigate, useParams } from "react-router-dom";
import { useFetchRecipe } from "../hooks/useFetchRecipe";
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  List,
  Stack,
  StackSeparator,
  Stat,
  StatGroup,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import ReviewForm from "../components/form/ReviewForm";
import { useAuth } from "../context/AuthProvider";
import { useFetchReviews } from "../hooks/useFetchReviews";

function RecipePage() {
  const { id } = useParams();
  const { data } = useFetchRecipe(id, null);
  const { reviews } = useFetchReviews(id);
  const [showReviewForm, setShowReviewForm] = useState();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleAddReview = () => {
    user ? setShowReviewForm(true) : navigate("/login");
  };

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
          <Stack gap="8" separator={<StackSeparator />}>
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
            <Stack gap="8" separator={<StackSeparator />}>
              <HStack justifyContent="space-between">
                <Heading size="2xl">Reviews</Heading>
                <Stack gap="4">
                  <Button
                    width="max-content"
                    variant="outline"
                    onClick={handleAddReview}
                  >
                    <LuPlus />
                    Add review
                  </Button>
                </Stack>
              </HStack>
              {showReviewForm && (
                <ReviewForm
                  recipeId={id}
                  username={user.username}
                  handleClose={() => setShowReviewForm(false)}
                />
              )}
              {reviews?.length > 0 && (
                <Stack separator={<StackSeparator />} gap="4">
                  {reviews.map((review, index) => (
                    <Stack key={index} gap="4">
                      <Text>{getFullDate(review.createdAt)}</Text>
                      <Text>Rating: {review.score} / 5</Text>
                      <Text>{review.description}</Text>
                    </Stack>
                  ))}
                </Stack>
              )}
            </Stack>
          </Stack>
        </Flex>
      </Center>
    )
  );
}

export default RecipePage;
