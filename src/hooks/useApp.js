import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  addProfile,
  orderProfile,
  removeProfile,
  updateProfile,
} from "../store/profileSlice";
import datas from "../data.json";

const useApp = () => {
  const targetRef = useRef(null);
  const profileLists = useSelector((state) => state.profile.profileLists);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    selectedProfile: profileLists[0],
    isRemoveAlert: false,
    updatedName: "",
    isInput: false,
    selectedIndex: null,
  });

  const { selectedProfile, updatedName, isInput, selectedIndex } = state;

  const onUpdateState = (value) => {
    setState({ ...state, ...value });
  };

  const onClickProfile = (data, index) => {
    onUpdateState({ selectedProfile: data, selectedIndex: index });
  };

  const onClickAdd = () => {
    const newProfile = {
      id: uuidv4(),
      name: "New Profile",
      isSelected: false,
      isEditable: true,
      icon: "../images/profile_sel_default.svg",
    };
    dispatch(addProfile(newProfile));
    onUpdateState({ selectedProfile: newProfile });
  };

  const onClickEdit = () => {
    onUpdateState({ isInput: true });
  };

  const onChangeUpdateName = (event) => {
    onUpdateState({ updatedName: event.target.value });
  };

  const onShowDeleteAlert = () => {
    onUpdateState({ isRemoveAlert: true });
  };

  const onClickRemove = (id) => {
    dispatch(removeProfile(id));
    const index = profileLists.findIndex(
      (list) => list.id === selectedProfile.id
    );
    if (index !== -1 && index !== 0) {
      const beforeItem = profileLists[index - 1];
      onUpdateState({ selectedProfile: beforeItem, isRemoveAlert: false });
    }
  };

  const onMoveItem = (direction) => {
    if (selectedIndex === null) return;

    const updatedItems = [...profileLists];
    const newIndex = selectedIndex + direction;

    if (newIndex >= 0 && newIndex < updatedItems.length) {
      // Swap items
      const temp = updatedItems[selectedIndex];
      updatedItems[selectedIndex] = updatedItems[newIndex];
      updatedItems[newIndex] = temp;

      dispatch(orderProfile(updatedItems));
      onUpdateState({ selectedIndex: newIndex });
    }
  };

  useEffect(() => {
    if (isInput) {
      onUpdateState({ updatedName: selectedProfile.name });
    }
  }, [isInput, selectedProfile.name]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (targetRef.current && !targetRef.current.contains(event.target)) {
        if (updatedName) {
          onUpdateState({ isInput: false });
          dispatch(
            updateProfile({ id: selectedProfile.id, name: updatedName })
          );
        }
      }
    };
    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [targetRef, selectedProfile, updatedName, dispatch]);

  useEffect(() => {
    const index = profileLists.findIndex(
      (item) => item.id === selectedProfile.id
    );

    if (index !== -1) {
      onUpdateState({ selectedIndex: index });
    }

    localStorage.setItem("profileLists", JSON.stringify(profileLists));
  }, [profileLists, selectedProfile.id]);

  return {
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
  };
};

export default useApp;
