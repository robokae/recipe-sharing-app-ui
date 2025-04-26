import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function SideMenu() {
  return (
    <Box width="2/12">
      <ButtonGroup flexDirection="column" width="max-content">
        <Button colorPalette="green" width="full" justifyContent="flex-start">
          <Link to="/recipe/new">Create Recipe</Link>
        </Button>
        <Button width="full" justifyContent="flex-start" variant="plain">
          Saved
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default SideMenu;
