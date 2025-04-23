import React from "react";
import styles from "./MyModal.module.css";
import ModalStore from "../../../stores/ModalStore";
import { useStore } from "../../../utils/store";

const MyModal = ({ title = "title", description, children }) => {
  const [modalStore, modalServices] = useStore(
    ModalStore.store,
    ModalStore.services
  );

  return (
    <div
      className={styles.container}
      onClick={(e) => {
        if (e.target.dataset.closeModal !== undefined)
          modalServices.closeModal();
      }}
    >
      <div className={styles.modal}>
        <div className={styles.info}>
          <h2 className={styles.title}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        <div className={styles.form}>
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              className: `${styles[child.props.className] || ""}`,
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MyModal;
