import { HStack, Stat } from "@chakra-ui/react";

function Stats({ data }) {
  return (
    <HStack gap="4" width={["3/4", "1/2", "1/4"]}>
      {data.map((stat, index) => (
        <Stat.Root key={index}>
          <Stat.Label>{stat.label}</Stat.Label>
          <Stat.ValueText>{stat.value}</Stat.ValueText>
        </Stat.Root>
      ))}
    </HStack>
  );
}

export default Stats;
