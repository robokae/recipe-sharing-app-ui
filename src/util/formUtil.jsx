import FormField from "../components/FormField";

const getSchemaShape = (schema) => {
  return schema._def.typeName === "ZodEffects"
    ? schema._def.schema.shape
    : schema.shape;
};

const getLabel = (fieldName) => {
  fieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  return fieldName
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (firstChar) => firstChar.toUpperCase());
};

export const mapToFormFieldsFromSchema = (schema, register, errors) => {
  return Object.entries(getSchemaShape(schema)).map(([fieldName], index) => (
    <FormField
      key={index}
      name={fieldName}
      label={getLabel(fieldName)}
      type={fieldName.includes("password") ? "password" : "text"}
      register={register}
      errors={errors}
    />
  ));
};
