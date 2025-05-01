import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import generateStylizedDocument from "./stylizedDocumentGeneration";
import { getDocumentStore } from "../stores/DocumentStore";
import { Previewer } from "pagedjs";

const generatePdf = async (documentStyle) => {
  try {
    const documentStore = getDocumentStore();
    const stylizedDocument = generateStylizedDocument(
      documentStore.content,
      documentStyle
    );
    const pdfContainer = document.createElement("div");
    pdfContainer.style.position = "absolute";
    pdfContainer.style.left = "-9999px";
    document.body.appendChild(pdfContainer);
    const previewer = new Previewer();
    await previewer.preview(stylizedDocument, [], pdfContainer);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const pages = pdfContainer.querySelectorAll(".pagedjs_page");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "letter",
    });
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        logging: true,
        allowTaint: true,
      });
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      if (i > 0) pdf.addPage();
      pdf.addImage(
        canvas.toDataURL("image/jpeg", 0.9),
        "JPEG",
        0,
        0,
        imgWidth,
        imgHeight
      );
    }
    document.body.removeChild(pdfContainer);
    pdf.save(`${documentStore.name}.pdf`);
  } catch (error) {
    console.error(error);
  }
};

export default generatePdf;
