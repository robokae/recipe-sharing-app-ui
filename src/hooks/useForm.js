import { useState } from "react";

export const useForm = (initialData) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return { formData, handleChange };
};
