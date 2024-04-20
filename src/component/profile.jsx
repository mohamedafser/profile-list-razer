import React from "react";
import PropTypes from "prop-types";

const iconConfig = {
  Music: "music",
  Movie: "movie",
  Game: "game",
};

const Profile = ({ name, isSelected, onClick }) => {
  const active = isSelected ? "active" : "";
  const iconClass = iconConfig[name] ? iconConfig[name] : "custom";

  return (
    <div
      id="profile1"
      className={`profile-item ${active} ${iconClass}`}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default Profile;
