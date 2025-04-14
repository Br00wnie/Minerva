import { React } from "react";
import MyModal from "../../ui/modal/MyModal";
import MyButton from "../../ui/button/MyButton";
import { ABOUT_MODAL_ID } from "../../../consts";

const AboutModal = () => {
  return (
    <MyModal id={ABOUT_MODAL_ID} title="О приложении">
      <div className="inputs">
        <img
          src="/favicon.svg"
          alt="Иконка приложения"
          style={{ width: "4rem", height: "4rem" }}
        />
        <p>
          <b>Minerva</b>
        </p>
        <p>
          <b>Описание:</b> веб-приложение для преобразования Markdown в PDF-файл
          с заданным оформлением
        </p>
        <p>
          <b>Версия:</b> 1.0.0
        </p>
        <p>
          <b>Автор:</b> Br00wnie
        </p>
        <p>
          <b>Лицензия:</b> MIT
        </p>
        <p>
          <b>Репозиторий:</b>{" "}
          <a href="https://github.com/Br00wnie/Minerva">
            https://github.com/Br00wnie/Minerva
          </a>
        </p>
      </div>
      <div className="buttons">
        <MyButton label="Закрыть" data-close-modal />
      </div>
    </MyModal>
  );
};

export default AboutModal;
