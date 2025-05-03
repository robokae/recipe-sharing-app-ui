import { Flex } from "@chakra-ui/react";
import SideMenu from "../components/layout/SideMenu";
import { useFetchRecipe } from "../hooks/useFetchRecipe";
import RecipeFeed from "../components/RecipeFeed";

function Home() {
  const { data } = useFetchRecipe();

  return (
    <Flex width="full" flexDirection="row" overflow="visible">
      <SideMenu />
      {data && <RecipeFeed data={data} title="Latest Recipes" />}
    </Flex>
  );
}

export default Home;
