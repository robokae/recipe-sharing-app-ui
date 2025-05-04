import { Field, Input, Textarea } from "@chakra-ui/react";

function FormField({
  name,
  label,
  fieldType,
  inputType,
  placeholder,
  register,
  errors,
}) {
  return (
    <Field.Root invalid={errors[name]}>
      <Field.Label htmlFor={name}>{label && label}</Field.Label>
      {fieldType === "textarea" ? (
        <Textarea
          id={name}
          placeholder={placeholder}
          autoresize
          {...register(name)}
        />
      ) : (
        <Input
          id={name}
          type={inputType || "text"}
          placeholder={placeholder}
          {...register(name)}
        />
      )}
      <Field.ErrorText>{errors[name]?.message}</Field.ErrorText>
    </Field.Root>
  );
}

export default FormField;
