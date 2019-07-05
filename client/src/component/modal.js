import React from 'react';
import '../style/modal.css';


export default (props) => {
  const { show } = props.signIn;
  const { close, children } = props;
  return (
    <div className="center_wrap1" style={{ display: show ? 'flex' : 'none' }}>
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
  );
};
