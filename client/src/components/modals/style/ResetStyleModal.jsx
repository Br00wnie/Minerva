import { React } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import { RESET_STYLE_MODAL_ID } from "../../../consts";
import StyleService from "../../../services/StyleService";
import { useTranslation } from "react-i18next";

const ResetStyleModal = () => {
  const { t } = useTranslation();

  return (
    <MyModal
      id={RESET_STYLE_MODAL_ID}
      title={t("modals.style.reset.title")}
      description={t("modals.style.reset.description")}
    >
      <div className="buttons">
        <MyButton label={t("buttons.cancel.label")} data-close-modal />
        <MyButton
          className="danger"
          label={t("buttons.reset.label")}
          onClick={() => StyleService.reset()}
        />
      </div>
    </MyModal>
  );
};

export default ResetStyleModal;
