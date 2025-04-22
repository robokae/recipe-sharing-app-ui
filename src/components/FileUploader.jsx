import {
  FileUpload,
  Flex,
  Icon,
  Stack,
  Text,
  useFileUpload,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { LuUpload } from "react-icons/lu";

function FileUploader({ maxFiles, fileTypes, handleFileChange }) {
  const fileUpload = useFileUpload({ maxFiles: maxFiles });
  const files = fileUpload.acceptedFiles;

  useEffect(() => {
    handleFileChange(files);
  }, [files]);

  const supportedFiles =
    fileTypes.length === 2
      ? fileTypes.join(" and ")
      : fileTypes
          .map((fileType, index) => {
            index !== fileTypes.length - 1
              ? `${fileType}, `
              : `and ${fileType}`;
          })
          .join("");

  return (
    <FileUpload.RootProvider value={fileUpload}>
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone width={["full", "full", "sm"]}>
        <Icon size="lg" color="fg.subtle">
          <LuUpload />
        </Icon>
        <FileUpload.DropzoneContent>
          <Text>{`Click to upload or drag and drop your file${
            maxFiles > 1 ? "s" : ""
          } here`}</Text>
          <Text color="fg.subtle">{`Supports ${supportedFiles} formats`}</Text>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
      <FileUpload.List width={["full", "full", "sm"]} showSize clearable />
    </FileUpload.RootProvider>
  );
}

export default FileUploader;
