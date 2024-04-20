import React from "react";
import PropTypes from "prop-types";

const Toolbar = (props) => {
  const {
    selectedProfile,
    onClickRemove,
    onClickEdit,
    onClickAdd,
    onMoveItem,
    disableMoveUp,
    disableMoveDown,
  } = props;

  const { isEditable } = selectedProfile;
  const disableUp = disableMoveUp ? "disabled" : "";
  const disableDown = disableMoveDown ? "disabled" : "";

  return (
    <div className="toolbar flex">
      <div className="icon add" onClick={onClickAdd}></div>
      {isEditable && (
        <>
          <div className="icon edit" onClick={onClickEdit}></div>
          <div className="icon delete" onClick={onClickRemove}></div>
        </>
      )}

      <div
        className={`icon down ${disableDown}`}
        onClick={() => onMoveItem(1)}
      ></div>
      <div
        className={`icon up ${disableUp}`}
        onClick={() => onMoveItem(-1)}
      ></div>
    </div>
  );
};

Toolbar.propTypes = {
  selectedProfile: PropTypes.object.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func.isRequired,
  onMoveItem: PropTypes.func.isRequired,
  disableMoveUp: PropTypes.bool.isRequired,
  disableMoveDown: PropTypes.bool.isRequired,
};

export default Toolbar;
