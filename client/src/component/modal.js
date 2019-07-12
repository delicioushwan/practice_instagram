import React from 'react';
import '../style/modal.css';


export default (props) => {
  const { show } = props;
  const { close, children } = props;
  return (
    <div className="center_wrap1" style={{ display: show ? 'flex' : 'none' }}>
      <div>
        <span
          className="close1"
          onClick={close}
        />
        <div className="center_wrap2">
          <span
            className="close"
            onClick={close}
          />
          <div>instagram</div>
          <div className="modal">
            { children }
          </div>
        </div>
      </div>
    </div>
  );
};
