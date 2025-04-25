import { useStore } from "../incrum/store";
import StyleStore from "../stores/StyleStore";

const useDocumentStyle = () => {
  const [styleStore] = useStore(StyleStore.store);

  return `
    @page {
      size: A4;            
    }
    .pagedjs_page {
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .document-content {
      width: 210mm;
      min-height: 297mm;
      background-color: ${styleStore.content["background-color"]};
      padding: ${styleStore.content["margin-top"] * 10}mm 
               ${styleStore.content["margin-right"] * 10}mm
               ${styleStore.content["margin-bottom"] * 10}mm 
               ${styleStore.content["margin-left"] * 10}mm;
      text-align: ${styleStore.content["text-align"]};
      text-indent: ${styleStore.content["text-indent"] * 10}mm;
      color: ${styleStore.content["color"]} !important;
    }`;
};

export default useDocumentStyle;
