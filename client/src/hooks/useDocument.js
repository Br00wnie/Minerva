import DocumentStore from "../stores/DocumentStore";

const useDocument = () => {
  return {
    name: DocumentStore.name,
    setName: DocumentStore.setName,
    content: DocumentStore.content,
    setContent: DocumentStore.setContent,
  };
};

export default useDocument;
