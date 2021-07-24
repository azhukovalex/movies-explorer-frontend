import React from 'react';
import './MoreBtn.css';

function MoreBtn({ setmoviesRendering, moviesRendering, moviesRenderingAdd }) {
  return (
    <div className="more-btn">
      <p className="more-btn__text" onClick={() => setmoviesRendering(moviesRendering + moviesRenderingAdd)}>Ещё</p>
    </div>
  );
}

export default MoreBtn;

