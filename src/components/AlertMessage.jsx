import { Alert } from "@chakra-ui/react";

function AlertMessage({ status, description }) {
  return (
    <Alert.Root width="full" status={status} variant="surface">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Description>{description}</Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
}

export default AlertMessage;
