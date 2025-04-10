import { useContext } from "react";
import { Context } from "../../script";

const useDocument = () => {
  const context = useContext(Context);
  return {
    name: context.DocumentStore.name,
    setName: context.DocumentStore.setName,
    content: context.DocumentStore.content,
    setContent: context.DocumentStore.setContent,
  };
};

export default useDocument;
