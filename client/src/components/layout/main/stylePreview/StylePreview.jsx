import React, { useEffect, useRef } from "react";
import { Previewer } from "pagedjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DocumentStore from "../../../../stores/DocumentStore";
import { useStore } from "../../../../utils/store";
import StyleStore from "../../../../stores/StyleStore";
import parse, { attributesToProps, domToReact } from "html-react-parser";

const StylePreview = () => {
  const [documentStore] = useStore(DocumentStore.store);
  const [styleStore] = useStore(StyleStore.store);
  const previewContainerRef = useRef(null);
  const sourceContentRef = useRef(null);

  // Paged.js configuration
  useEffect(() => {
    const previewer = new Previewer();
    const sourceContent = sourceContentRef.current;
    const previewContainer = previewContainerRef.current;

    const processContent = async () => {
      if (sourceContent && previewContainer) {
        previewContainer.innerHTML = "";
        const clonedContent = sourceContent.cloneNode(true);
        previewContainer.appendChild(clonedContent);

        try {
          await previewer.preview(clonedContent, [], previewContainer);
        } catch (error) {
          console.error("Paged.js error:", error);
        }
      }
    };

    processContent();

    return () => {
      if (previewContainer) previewContainer.innerHTML = "";
    };
  }, [documentStore.content, styleStore.content]);

  // PDF generation
  const handleSavePDF = async () => {
    const pages = document.querySelectorAll(".pagedjs_page");
    const pdf = new jsPDF("p", "mm", "a4");

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      const imgData = canvas.toDataURL("image/png");

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    }

    pdf.save("document.pdf");
  };

  // Styles parsing
  const parserOptions = {
    replace: (domNode) => {
      if (domNode.type === "tag" && domNode.name === "p") {
        const props = attributesToProps(domNode.attribs);
        return (
          <p
            {...props}
            style={{
              marginBottom: `${styleStore.content["paragraph-spacing"]}em`,
            }}
          >
            {domToReact(domNode.children, parserOptions)}
          </p>
        );
      }
    },
  };

  return (
    <div>
      <style>
        {`
          @page {
            size: A4;
            margin: ${styleStore.content["margin-top"] * 10}mm ${
          styleStore.content["margin-right"] * 10
        }mm
              ${styleStore.content["margin-bottom"] * 10}mm ${
          styleStore.content["margin-left"] * 10
        }mm;
          }
          .pagedjs_page {
            background: ${styleStore.content["background-color"]} !important;
            color: ${styleStore.content["color"]} !important;
            font-family: ${styleStore.content["font-family"]} !important;
            font-size: ${styleStore.content["font-size"]} !important;
            line-height: ${styleStore.content["line-height"]} !important;
            margin: 20px auto !important;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
        `}
      </style>

      <button
        onClick={handleSavePDF}
        style={{ position: "fixed", top: 10, right: 10 }}
      >
        Save as PDF
      </button>

      <div ref={sourceContentRef} style={{ display: "none" }}>
        <div
          style={{
            width: "210mm",
            minHeight: "297mm",
            padding: `${styleStore.content["margin-top"] * 10}mm ${
              styleStore.content["margin-right"] * 10
            }mm
              ${styleStore.content["margin-bottom"] * 10}mm ${
              styleStore.content["margin-left"] * 10
            }mm`,
            textAlign: styleStore.content["text-align"],
            textIndent: `${styleStore.content["text-indent"] * 10}mm`,
          }}
        >
          {parse(documentStore.content || "", parserOptions)}
        </div>
      </div>

      <div
        ref={previewContainerRef}
        style={{
          background: styleStore.content["background-color"],
          position: "relative",
        }}
      />
    </div>
  );
};

export default StylePreview;
