import { Field, Input } from "@chakra-ui/react";

function LabelledInputField({
  label,
  value,
  type = "text",
  placeholder,
  onChange,
}) {
  return (
    <Field.Root>
      {label && <Field.Label mb="2">{label}</Field.Label>}
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Field.Root>
  );
}

export default LabelledInputField;
