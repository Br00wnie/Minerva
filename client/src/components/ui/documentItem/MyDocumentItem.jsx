import React, { useContext } from "react";
import MyButton from "../button/MyButton";
import styles from "./MyDocumentItem.module.css";
import DocumentService from "../../../services/DocumentService";
import { Context } from "../../../../index";
import toast from "../toast/MyToast";
import { write } from "../../../utils/storageManagement";

const MyDocumentItem = ({
  name = "name",
  preview,
  className = "",
  documentId,
  ...props
}) => {
  const { DocumentStore, ModalStore } = useContext(Context);
  const handleLoad = async () => {
    try {
      const res = await DocumentService.get({ documentId }, {});
      if (res.status === 200) {
        DocumentStore.setDocument({
          name: res.data.document_name,
          content: res.data.document_content,
        });
        write("documentId", res.data.document_id);
        toast("Документ загружен");
        ModalStore.openModal(null);
      }
    } catch (error) {
      toast("Непредвиденная Ошибка при загрузке документа:", error);
    }
  };

  return (
    <div className={`${styles.container} ${className}`} {...props}>
      <div className={styles.info}>
        <label className={styles.name}>{name}</label>
        {preview && <p className={styles.preview}>{preview}</p>}
      </div>

      <div className={styles.buttons}>
        <MyButton label="Загрузить" onClick={handleLoad} />
      </div>
    </div>
  );
};

export default MyDocumentItem;
