import React from "react";
import BaseModal from "../../components/BaseModal";
import BaseButton from "../../components/BaseButton";
import "./style.scss";

interface Props {
  onCloseModal: () => void;
}

export default function ModalAddCard({ onCloseModal }: Props) {
  return (
    <BaseModal onCloseModal={onCloseModal}>
      <form className="modal-add-card">
        <fieldset>
          <legend className="modal-add-card__title fw-bold header-2">Editing</legend>
          <div className="modal-add-card__editing">
            <label htmlFor="targetWord">
              <h3 className="modall-add-card__subtitle header-3">Tagret word:</h3>
              <textarea className="modal-add-card__textarea" name="targetWord" id="targetWord" />
            </label>
            <label htmlFor="translatedWord">
              <h3 className="modall-add-card__subtitle header-3">Your prompt:</h3>
              <textarea className="modal-add-card__textarea" name="translatedWord" id="translatedWord" />
            </label>
          </div>
        </fieldset>
        <div className="modal-add-card__btn-wrapper">
          <BaseButton className="modal-add-card__submit-btn" type={"submit"}>
            Save
          </BaseButton>
          <BaseButton className="modal-add-card__cansel-btn" negative onClick={onCloseModal}>
            Cansel
          </BaseButton>
        </div>
      </form>
    </BaseModal>
  );
}
