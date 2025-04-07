import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./MyModal.module.css";
import { Context } from "../../../../script";

const MyModal = ({
  id,
  title = "title",
  desc,
  children,
  className = "",
  ...props
}) => {
  const { ModalStore } = useContext(Context);
  const bindCloseModalEvent = (e) => {
    if (e.target.dataset.closeModal !== undefined) ModalStore.closeModal();
  };

  return (
    <div
      className={`${styles.container} ${className}`}
      onClick={bindCloseModalEvent}
    >
      <div className={styles.modal}>
        <form {...props}>
          <h2 className={styles.title}>{title}</h2>
          {desc && <p className={styles.desc}>{desc}</p>}
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              className: `${styles[child.props.className] || ""} ${
                child.props.className || ""
              }`,
            })
          )}
        </form>
      </div>
    </div>
  );
};

export default observer(MyModal);
