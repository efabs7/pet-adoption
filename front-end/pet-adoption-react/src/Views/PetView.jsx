import { PetCardBig } from "../components/PetCardBig/PetCardBig";
import { userContext } from "../Context/userContext";
import { useContext, useState, useEffect } from "react";
import { petsApi } from "../helpers/petsApi";
import { usersApi } from "../helpers/usersApi";
import { authContext } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Rows } from "../UIKit/Layouts/Rows/Rows";
import { Btn } from "../UIKit/Elements/Btn/Btn";
import { Center } from "../UIKit/Layouts/Center/Center";
import { Between } from "../UIKit/Layouts/Between/Between";
import { ToastContainer, toast } from "react-toastify";

import Box from "../components/Box/Box";

export const PetView = () => {
  const notifyUserError = (message) => {
    toast.error(`${message}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const notifyUserSuccess = (message) => {
    toast.success(`${message}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const navigate = useNavigate();
  const {
    userSavedPets,
    setUserSavedPets,
    userOwnedPets,
    setUserOwnedPets,
    userFosteredPets,
    setUserFosteredPets,
    selectedPetId,
    setAdminIsEditing,
  } = useContext(userContext);

  const { userId, isAdmin, isLoggedIn } = useContext(authContext);
  const [petDetails, setPetDetails] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [owned, setIsOwned] = useState(false);
  const [fostered, setIsFostered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isError, setIsError] = useState(false);

  const loadPetDetails = () => {
    petsApi
      .getPet(selectedPetId)
      .then((resp) => {
        const pet = resp;
        setPetDetails(pet);

        if (userSavedPets) {
          const saved = userSavedPets.find((i) => i._id == selectedPetId);
          if (saved) {
            setIsSaved(true);
          }
        }
        if (userOwnedPets) {
          const adopted = userOwnedPets.find((i) => i._id == selectedPetId);
          if (adopted) {
            setIsOwned(true);
          }
        }
        if (userFosteredPets) {
          const foster = userFosteredPets.find((i) => i._id == selectedPetId);
          if (foster) {
            setIsFostered(true);
          }
        }
      })
      .catch((err) => {
        setIsError(true);
        setErrorMessage(err);
      });
  };

  const loadUserInfo = () => {
    petsApi
      .getUserPets(userId)
      .then((resp) => {
        console.log(resp);
        const { userSavedPets, userOwnedPets, userFosteredPets } = resp;

        setUserSavedPets(userSavedPets);
        setUserOwnedPets(userOwnedPets);
        setUserFosteredPets(userFosteredPets);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setErrorMessage("something happened getting ur pets");
      });
  };

  useEffect(() => {
    loadUserInfo();
    loadPetDetails();
  }, []);

  const returnPet = () => {
    //with new route

    if (owned) {
      petsApi
        .removeUserOwned(userId, { petId: selectedPetId })
        .then((resp) => {
          console.log(resp);
          notifyUserSuccess(
            "Successfully returned..have fun with ur empty life"
          );
          setIsOwned(false);
          setTimeout(() => {
            navigate("/my-pets");
          }, 4000);
        })
        .catch((err) => {
          console.log(err);
          notifyUserError("sorry, issue rreturning... guess you gotta keep!");
        });
    } else if (fostered) {
      petsApi
        .removeUserFostered(userId, {
          petId: selectedPetId,
        })
        .then((resp) => {
          console.log(resp);
          setIsFostered(false);
          notifyUserSuccess("successfully returned");

          setTimeout(() => {
            navigate("/my-pets");
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
          notifyUserError("sorry, you gotta keep em");
        });
    } else {
      notifyUserError(`you don't own this pet sorry!`);
    }
  };
  const saveOrUnsavePet = () => {
    if (isSaved && userSavedPets) {
      petsApi
        .removeUserSaved(userId, { petId: selectedPetId })
        .then((resp) => {
          console.log(resp);
          setIsSaved(false);
          notifyUserSuccess("Removed Pet from Saved List (why tho)");
        })
        .catch((err) => {
          console.log(err);
          notifyUserError("hmm, something went wrong");
        });
    } else {
      petsApi
        .addUserSave(userId, {
          petId: selectedPetId,
        })
        .then((resp) => {
          console.log(resp);
          setIsSaved(true);
          notifyUserSuccess("pet saved to list!");
        })
        .catch((err) => {
          console.log(err);
          notifyUserError("sorry, we had an issue saving");
        });
    }
  };

  const addToAdopted = () => {
    if (petDetails.adoptionStatus !== "Available") {
      notifyUserError("sorry, this pet already has a home!");
      return;
    }
    if (!owned) {
      petsApi
        .addUserAdopt(userId, { petId: selectedPetId })
        .then((resp) => {
          console.log(resp);
          setIsOwned(true);
          notifyUserSuccess(`Successfully Adopted!`);
        })
        .catch((err) => {
          console.log(err);
          notifyUserError("issue adopting this pet...");
        });
    } else {
      notifyUserError("lol- this pet is already at your house!");
    }
  };

  const addToFostered = () => {
    if (petDetails.adoptionStatus !== "Available") {
      notifyUserError("sorry, this pet already has a home!");
      return;
    }
    if (!fostered) {
      petsApi
        .addUserFoster(userId, { petId: selectedPetId })
        .then((resp) => {
          console.log(resp);
          setIsFostered(true);
          notifyUserSuccess(`Successfully Fostered!`);
        })
        .catch((err) => {
          console.log(err);
          notifyUserError("issue fostering this pet, sorry..");
        });
    } else {
      notifyUserError("you already foster this pet, silly goose");
    }
  };

  const backToSearch = () => {
    navigate("/search");
  };

  return (
    <Center>
      <div>
        <ToastContainer theme="dark" />
      </div>
      <Rows>
        <PetCardBig
          returnPet={returnPet}
          saveOrUnsavePet={saveOrUnsavePet}
          type={petDetails.type}
          diet={petDetails.diet}
          petName={petDetails.name}
          adoptionStatus={petDetails.adoptionStatus}
          height={petDetails.height}
          weight={petDetails.weight}
          color={petDetails.color}
          breed={petDetails.breed}
          petBio={petDetails.bio}
          isHypoallergenic={petDetails.hypoallergenic}
          isSaved={isSaved}
          isError={isError}
          img={petDetails.img}
          isUserOwned={owned}
          isUserFostered={fostered}
          adoptPet={addToAdopted}
          fosterPet={addToFostered}
        />
        <Box>
          <Between>
            {isLoggedIn && (
              <Btn
                onClick={() => {
                  loadPetDetails();
                  navigate("/my-pets");
                }}
              >
                Back to Your Pets
              </Btn>
            )}
            {isLoggedIn && isAdmin && (
              <Btn
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Back to Dashboard
              </Btn>
            )}
            {isLoggedIn && isAdmin && (
              <Btn
                onClick={() => {
                  setAdminIsEditing(true);
                  navigate("/addpet");
                }}
              >
                Edit Pet
              </Btn>
            )}
            <Btn onClick={backToSearch}>Back to Search...</Btn>
          </Between>
        </Box>
        )<h3>{`${errorMessage}`}</h3>
      </Rows>
    </Center>
  );
};
