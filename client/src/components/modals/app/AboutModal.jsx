import MyModal from "@ui/modal/MyModal";
import MyButton from "@ui/button/MyButton";
import { ABOUT_MODAL_ID } from "@src/consts";
import { useTranslation } from "react-i18next";

const AboutModal = () => {
  const { t } = useTranslation();

  return (
    <MyModal id={ABOUT_MODAL_ID} title={t("modals.app.about.title")}>
      <div className="inputs">
        <img src="/favicon.svg" style={{ width: "4rem", height: "4rem" }} />
        <h2>Minerva</h2>
        <p>
          <b>{t("modals.app.about.content.description.label")}</b>
          {t("modals.app.about.content.description.value")}
        </p>
        <p>
          <b>{t("modals.app.about.content.version.label")}</b> 0.1.0
        </p>
        <p>
          <b>{t("modals.app.about.content.languages.label")}</b>
          {t("modals.app.about.content.languages.value")}
        </p>
        <p>
          <b>{t("modals.app.about.content.author.label")}</b> Br00wnie
        </p>
        <p>
          <b>{t("modals.app.about.content.license.label")}</b> MIT
        </p>
        <p>
          <b>{t("modals.app.about.content.repository.label")}</b>{" "}
          <a href="https://github.com/Br00wnie/Minerva">
            https://github.com/Br00wnie/Minerva
          </a>
        </p>
      </div>
      <div className="buttons">
        <MyButton label={t("buttons.close.label")} data-close-modal />
      </div>
    </MyModal>
  );
};

export default AboutModal;
