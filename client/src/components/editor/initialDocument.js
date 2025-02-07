import { logAction } from "../../utils/logging";
import { read } from "../../utils/storageManagement";

const initialDocument = () => {
  return { name: defaultName, content: defaultContent };
};

const defaultName = "";
const defaultContent = [
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
];

export default initialDocument();
