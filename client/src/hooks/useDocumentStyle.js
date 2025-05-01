import { useStore } from "@incrum/store";
import StyleStore from "@stores/StyleStore";

const useDocumentStyle = () => {
  const [styleStore] = useStore(StyleStore.store);

  return `
.pagedjs_sheet {
  background-color: ${styleStore.content["background-color"]};
  --pagedjs-margin-top: ${styleStore.content["margin-top"] * 10}mm;
  --pagedjs-margin-right: ${styleStore.content["margin-right"] * 10}mm;
  --pagedjs-margin-bottom: ${styleStore.content["margin-bottom"] * 10}mm;
  --pagedjs-margin-left: ${styleStore.content["margin-left"] * 10}mm;
}

.content-container { 
  color: ${styleStore.content["color"]};
  font-size: ${styleStore.content["font-size"]}pt;
  font-family: ${styleStore.content["font-family"]};
  text-align: ${styleStore.content["text-align"]};
  line-height: ${styleStore.content["line-height"]};
  text-indent: ${styleStore.content["text-indent"] * 10}mm !important;
}

.content-container p {
  margin-bottom: ${
    styleStore.content["paragraph-spacing"] - styleStore.content["line-height"]
  }em;
}
`;
};

export default useDocumentStyle;
