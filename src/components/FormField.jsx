import { Field, Input } from "@chakra-ui/react";

function FormField({ name, label, type, placeholder, register, errors }) {
  return (
    <Field.Root invalid={errors[name]}>
      <Field.Label htmlFor={name}>{label && label}</Field.Label>
      <Input
        id={name}
        type={type ?? "text"}
        placeholder={placeholder}
        {...register(name)}
      />
      <Field.ErrorText>{errors[name]?.message}</Field.ErrorText>
    </Field.Root>
  );
}

export default FormField;
