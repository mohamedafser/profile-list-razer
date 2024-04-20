import React from "react";
import PropTypes from "prop-types";

const ProfileDetail = ({ name }) => {
  return (
    <div className="sub-title flex">
      <h1 id="eqTitle" className="eq-title">
        {name}
      </h1>
    </div>
  );
};

ProfileDetail.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ProfileDetail;
