import { React } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import { RESET_STYLE_MODAL_ID } from "../../../consts";
import StyleService from "../../../services/StyleService";

const ResetStyleModal = () => {
  return (
    <MyModal
      id={RESET_STYLE_MODAL_ID}
      title="Сбросить стиль"
      description="Перед сбросом стиля, экспортируйте или сохраните на аккаунт 
      текущий стиль, чтобы не потерять прогресс."
    >
      <div className="buttons">
        <MyButton label="Отмена" data-close-modal />
        <MyButton
          className="danger"
          label="Сбросить"
          onClick={() => StyleService.reset()}
        />
      </div>
    </MyModal>
  );
};

export default ResetStyleModal;
