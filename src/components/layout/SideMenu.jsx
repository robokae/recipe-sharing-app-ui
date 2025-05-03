import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function SideMenu() {
  return (
    <Box
      position="fixed"
      width="48"
      height="full"
      display={["none", "none", "block"]}
      borderRightWidth="1px"
      pt="8"
    >
      <ButtonGroup flexDirection="column" width="max-content">
        <Link to="/recipe/new">
          <Button colorPalette="green" width="full" justifyContent="flex-start">
            New Recipe
          </Button>
        </Link>
        <Button width="full" justifyContent="flex-start" variant="plain">
          Home
        </Button>
        <Button width="full" justifyContent="flex-start" variant="plain">
          Explore
        </Button>
        <Button width="full" justifyContent="flex-start" variant="plain">
          Saved
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default SideMenu;
