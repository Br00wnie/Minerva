import { createEditor } from "slate";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";

const setUpEditor = () => {
  return withHistory(withReact(createEditor()));
};

export default setUpEditor;
