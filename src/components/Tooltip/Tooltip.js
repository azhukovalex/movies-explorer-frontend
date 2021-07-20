import React from "react";
import union from "../../images/Union.svg";
import icon from "../../images/Union-1.svg";
import './Tooltip.css';

function InfoTooltip(props) {
  const { isTooltipOpen, onClose, successToolTip, isTooltipProfile, isTooltipLogin} = props;
  const errorImg = {
    backgroundImage: "url(" + union + ")",
  };
  const successImg = {
    backgroundImage: "url(" + icon + ")",
  };

  return (
    (successToolTip) ?
      ((isTooltipProfile)
        ?
        <section className={isTooltipOpen ? "popup popup_opened" : "popup"}  >
          <form className="popup__container popup__tip">
            <button onClick={onClose} className="button button_type_close" id="formError-close" type="button" />
            <div className="popup__image popup__image_login" style={successImg} />
            <h2 className="popup__title infotooltip-title">Данные обновлены!</h2>
          </form>
        </section>
      :
        <section className={isTooltipOpen ? "popup popup_opened" : "popup"}  >
          <form className="popup__container popup__tip">
            <button onClick={onClose} className="button button_type_close" id="formError-close" type="button" />
            <div className="popup__image popup__image_login" style={successImg} />
            <h2 className="popup__title infotooltip-title">Вы успешно зарегистрировались!</h2>
          </form>
        </section> )
      :
  ((isTooltipLogin) 
  ? <section className={isTooltipOpen ? "popup popup_opened" : "popup"}  >
    <form className="popup__container popup__tip">
      <button onClick={onClose} className="button button_type_close" id="formError-close" type="button" />
      <div className="popup__image popup__image_login" style={errorImg} />
      <h2 className="popup__title infotooltip-title">При авторизации произошла ошибка.</h2>
    </form>
  </section>
  :
  <section className={isTooltipOpen ? "popup popup_opened" : "popup"}  >
    <form className="popup__container popup__tip">
      <button onClick={onClose} className="button button_type_close" id="formError-close" type="button" />
      <div className="popup__image popup__image_login" style={errorImg} />
      <h2 className="popup__title infotooltip-title">При регистрации произошла ошибка.</h2>
    </form>
  </section>)
  );
}

export default InfoTooltip;