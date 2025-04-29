import { useStore } from "../incrum/store";
import StyleStore from "../stores/StyleStore";

const useDocumentStyle = () => {
  const [styleStore] = useStore(StyleStore.store);

  return `
.pagedjs_sheet {
  background-color: ${styleStore.content["background-color"]};
}

.content-container { 
  color: ${styleStore.content["color"]};
}
`;
};

export default useDocumentStyle;
