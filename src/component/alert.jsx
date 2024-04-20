import React from "react";
import PropTypes from "prop-types";

const Alert = (props) => {
  const { onClick } = props;

  return (
    <div id="profileDelCfm" className="profile-del alert flex">
      <div className="title">delete eq</div>
      <div className="body-text t-center" id="delName">
        delete eq
      </div>
      <div className="thx-btn" onClick={onClick}>
        delete
      </div>
    </div>
  );
};

Alert.propTypes = {
  onClick: PropTypes.func,
};

export default Alert;
