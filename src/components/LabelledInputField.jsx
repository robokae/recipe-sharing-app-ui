import { Field, Input } from "@chakra-ui/react";

function LabelledInputField({ label, value, type = "text", onChange }) {
  return (
    <Field.Root>
      <Field.Label mb="2">{label}</Field.Label>
      <Input type={type} value={value} onChange={onChange} />
    </Field.Root>
  );
}

export default LabelledInputField;
