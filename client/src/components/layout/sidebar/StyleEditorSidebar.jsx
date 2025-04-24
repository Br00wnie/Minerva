import React from "react";
import StyleSettingsPanel from "./StyleSettingsPanel";
import StyleSearchPanel from "./StyleSearchPanel";
import MyButton from "../../ui/button/MyButton";
import MyInput from "../../ui/input/MyInput";
import { useStore } from "../../../utils/store";
import StyleStore from "../../../stores/StyleStore";
import StyleService from "../../../services/StyleService";
import { RESET_STYLE_MODAL_ID } from "../../../consts";
import ModalStore from "../../../stores/ModalStore";

const StyleEditorSidebar = ({ selectedTab }) => {
  const [styleStore, styleServices] = useStore(
    StyleStore.store,
    StyleStore.services
  );
  const [modalStore, modalServices] = useStore(
    ModalStore.store,
    ModalStore.services
  );

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
            label="Название стиля"
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
              label="Экспортировать"
              onClick={() => StyleService.export()}
            ></MyButton>
            <MyButton
              label="Импортировать"
              onClick={() => StyleService.import()}
            ></MyButton>
            <MyButton
              label="Сбросить"
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
