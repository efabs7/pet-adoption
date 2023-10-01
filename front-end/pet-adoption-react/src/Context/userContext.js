import { createContext, useState, useContext } from "react";
import { usersApi } from "../helpers/usersApi";
import { petsApi } from "../helpers/petsApi";
import { getUserFromStorage } from "../Auth/storage";
import { authContext } from "../Auth/AuthContext";

export const userContext = createContext({});

const Provider = userContext.Provider;

export const UserProvider = ({ children }) => {
  const { userId } = useContext(authContext);
  const [userSavedPets, setUserSavedPets] = useState([
    () => {
      petsApi.getUserPets(userId).then((resp) => {
        return resp.userSavedPets;
      });
    },
  ]);
  const [userOwnedPets, setUserOwnedPets] = useState([
    () => {
      petsApi.getUserPets(userId).then((resp) => {
        return resp.userOwnedPets;
      });
    },
  ]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [userFosteredPets, setUserFosteredPets] = useState([
    () => {
      petsApi.getUserPets(userId).then((resp) => {
        return resp.userFosteredPets;
      });
    },
  ]);
  const [adminIsEditing, setAdminIsEditing] = useState(false);

  const value = {
    userSavedPets,
    setUserSavedPets,
    userOwnedPets,
    setUserOwnedPets,
    selectedPetId,
    setSelectedPetId,
    userFosteredPets,
    setUserFosteredPets,
    adminIsEditing,
    setAdminIsEditing,
  };
  return <Provider value={value}>{children}</Provider>;
};
