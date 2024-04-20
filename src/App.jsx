import { Fragment } from "react";

import Toolbar from "./component/toolbar";
import Alert from "./component/alert";
import ProfileDetail from "./component/profileDetail";
import Profile from "./component/profile";
import useApp from "./hooks/useApp";

function App() {
  const {
    state,
    profileLists,
    targetRef,
    onClickEdit,
    onClickRemove,
    onMoveItem,
    onClickProfile,
    onClickAdd,
    onChangeUpdateName,
    onShowDeleteAlert,
  } = useApp();

  const {
    selectedProfile,
    isRemoveAlert,
    updatedName,
    isInput,
    selectedIndex,
  } = state;

  return (
    <div className="main-container">
      <div className="thx-wrapper flex">
        <div className="thx-drawer flex">
          <div className="main-title">Profile List</div>
          <div id="profileWrapper" className="drawer-select flex">
            <div id="profileList" className="scrollable">
              {profileLists?.length > 0 &&
                profileLists.map((list, index) => {
                  return (
                    <Fragment key={list.id}>
                      {isInput && selectedProfile.id === list.id ? (
                        <input
                          ref={targetRef}
                          type="text"
                          value={updatedName}
                          onChange={onChangeUpdateName}
                        />
                      ) : (
                        <Profile
                          name={list.name}
                          isSelected={selectedProfile.id === list.id}
                          onClick={() => onClickProfile(list, index)}
                        />
                      )}
                    </Fragment>
                  );
                })}
            </div>

            <Toolbar
              selectedProfile={selectedProfile}
              onClickRemove={onShowDeleteAlert}
              onClickEdit={onClickEdit}
              onMoveItem={onMoveItem}
              onClickAdd={onClickAdd}
              disableMoveUp={selectedIndex === 0}
              disableMoveDown={selectedIndex === profileLists.length - 1}
            />
            {isRemoveAlert && (
              <Alert onClick={() => onClickRemove(selectedProfile.id)} />
            )}
          </div>
        </div>

        <div className="thx-window">
          <ProfileDetail name={selectedProfile.name} />
        </div>
      </div>
    </div>
  );
}

export default App;
