import { Button, CloseButton, Flex, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function ListInput({ fieldName, itemName, setValue }) {
  const [items, setItems] = useState([""]);

  const updateLatestItem = (e, index) => {
    const listItems = [...items];
    listItems[index] = e.target.value;
    setItems(listItems);
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const addItem = () => {
    setItems((prev) => [...prev, ""]);
  };

  useEffect(() => {
    setValue(fieldName, items);
  }, [items, fieldName, setValue]);

  return (
    <Flex direction="column" width="full" gap="4">
      {items.map((_, index) => (
        <Flex key={index} gap="4">
          <Input onChange={(e) => updateLatestItem(e, index)} />
          <CloseButton onClick={() => removeItem(index)} />
        </Flex>
      ))}
      <Button width="1/2" color="fg.subtle" variant="outline" onClick={addItem}>
        Add {itemName || "item"}
      </Button>
    </Flex>
  );
}

export default ListInput;
