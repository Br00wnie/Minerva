import StyleSettingsPanel from "./StyleSettingsPanel";
import StyleSearchPanel from "./StyleSearchPanel";
import MyButton from "@ui/button/MyButton";
import MyInput from "@ui/input/MyInput";
import { useStore } from "@incrum/store";
import StyleStore from "@stores/StyleStore";
import StyleService from "@services/StyleService";
import { RESET_STYLE_MODAL_ID } from "@src/consts";
import ModalStore from "@stores/ModalStore";
import { useTranslation } from "react-i18next";

const StyleEditorSidebar = ({ selectedTab }) => {
  const [styleStore, styleServices] = useStore(
    StyleStore.store,
    StyleStore.services
  );
  const [, modalServices] = useStore(ModalStore.store, ModalStore.services);
  const { t } = useTranslation();

  return (
    <div>
      {selectedTab === "settings" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <MyInput
            label={t("inputs.styleName.label")}
            type="text"
            value={styleStore.name}
            onChange={(e) => styleServices.setName(e.target.value)}
          />
          <StyleSettingsPanel />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <MyButton
              label={t("buttons.export.label")}
              onClick={() => StyleService.export()}
            ></MyButton>
            <MyButton
              label={t("buttons.import.label")}
              onClick={() => StyleService.import()}
            ></MyButton>
            <MyButton
              label={t("buttons.reset.label")}
              onClick={() => modalServices.openModal(RESET_STYLE_MODAL_ID)}
            ></MyButton>
          </div>
        </div>
      )}
      {selectedTab === "search" && <StyleSearchPanel />}
    </div>
  );
};

export default StyleEditorSidebar;
