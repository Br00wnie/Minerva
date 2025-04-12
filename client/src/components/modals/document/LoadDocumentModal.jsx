import { React, useState, useEffect } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import { LOAD_DOCUMENT_MODAL_ID } from "../../../consts";
import DocumentService from "../../../services/DocumentService";
import MyDocumentItem from "../../ui/documentItem/MyDocumentItem";
import toast from "../../../utils/toast";

const LoadDocumentModal = () => {
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchDocuments = async (page) => {
      try {
        const res = await DocumentService.getDocuments(page, itemsPerPage);
        setDocuments(res.data);
        setTotalPages(res.totalPages);
      } catch (error) {
        toast("Ошибка при загрузке документов");
      }
    };
    fetchDocuments(currentPage);
  }, [currentPage]);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const truncateContent = (content) => {
    try {
      const parsedContent = JSON.parse(content);
      let truncatedText = "";
      let count = 0;
      for (let paragraph of parsedContent) {
        if (paragraph.type === "paragraph") {
          paragraph.children.forEach((child) => {
            truncatedText += child.text + " ";
          });
          count += 1;
          if (count >= 2) break;
        }
      }
      return truncatedText.trim();
    } catch (error) {
      console.error("Ошибка при обработке контента:", error);
      return "Ошибка при обработке текста";
    }
  };

  return (
    <MyModal id={LOAD_DOCUMENT_MODAL_ID} title="Загрузить документ">
      <div className="inputs">
        {documents.length > 0 ? (
          documents.map((doc, i) => (
            <MyDocumentItem
              key={doc.document_id}
              documentId={doc.document_id}
              name={doc.document_name}
              preview={truncateContent(JSON.stringify(doc.document_content))}
            />
          ))
        ) : (
          <p>Документы не найдены</p>
        )}
      </div>
      <div className="buttons">
        <MyButton label="Отмена" data-close-modal />
        <MyButton
          label="Предыдущая"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        />
        <MyButton
          label="Следующая"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        />
      </div>
    </MyModal>
  );
};

export default LoadDocumentModal;
