import React from 'react';
import './MoreBtn.css';

function MoreBtn({ handleMoreBtn, isMoreBtnVisible }) {
  return (
    isMoreBtnVisible &&
    <div className="more-btn">
      <p className="more-btn__text" onClick={handleMoreBtn}>Ещё</p>
    </div>
  );
}

export default MoreBtn;