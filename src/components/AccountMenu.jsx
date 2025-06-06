import { Button, Menu, Portal } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

function AccountMenu({ user, logout }) {
  const navigate = useNavigate();

  const getInitials = () => {
    const firstNameInitial = user.firstName[0].toUpperCase() ?? "";
    const lastNameInitial = user.lastName[0].toUpperCase() ?? "";
    return `${firstNameInitial}${lastNameInitial}`;
  };

  const handleSignout = () => {
    logout();
    navigate("/signoutSuccess");
  };

  return (
    <Menu.Root positioning={{ placement: "bottom-end" }}>
      <Menu.Trigger asChild>
        <Button borderRadius="full" width="2.5rem" height="2.5rem">
          {getInitials()}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Link to={`/profile/${user.username}`}>
              <Menu.Item cursor="pointer" value="profile">
                Profile
              </Menu.Item>
            </Link>
            <Menu.Item
              cursor="pointer"
              value="sign-out"
              onClick={handleSignout}
            >
              Sign out
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

export default AccountMenu;
