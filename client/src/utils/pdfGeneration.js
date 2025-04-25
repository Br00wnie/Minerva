import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import generateStylizedDocument from "../utils/stylizedDocumentGeneration";
import { getDocumentStore } from "../stores/DocumentStore";

const generatePdf = async (documentStyle) => {
  try {
    // 1. Generate fresh stylized document
    const documentStore = getDocumentStore();
    const tempContainer = generateStylizedDocument(
      documentStore.content,
      documentStyle
    );

    document.body.appendChild(tempContainer);

    // 2. Create PDF with proper scaling
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const SCALE = 2;
    const contentElement = tempContainer.querySelector(".document-content");

    // Ensure content is visible for rendering
    tempContainer.style.display = "block";

    const canvas = await html2canvas(contentElement, {
      scale: SCALE,
      useCORS: true,
      logging: true,
      allowTaint: true,
    });

    // Calculate dimensions maintaining aspect ratio
    const imgWidth = pdf.internal.pageSize.getWidth() - 20; // margin
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add image to PDF with proper dimensions
    pdf.addImage(
      canvas.toDataURL("image/jpeg", 0.9),
      "JPEG",
      10, // x position (margin)
      10, // y position (margin)
      imgWidth,
      imgHeight
    );

    // Clean up
    document.body.removeChild(tempContainer);

    pdf.save(`${documentStore.name}.pdf`);
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  }
};

export default generatePdf;
