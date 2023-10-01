import { NavBar } from "../components/NavBar/NavBar";
import { Center } from "../UIKit/Layouts/Center/Center";
import { Between } from "../UIKit/Layouts/Between/Between";
import { Line } from "../UIKit/Layouts/Line/Line";
import { useState } from "react";
import { Btn } from "../UIKit/Elements/Btn/Btn";
import { Rows } from "../UIKit/Layouts/Rows/Rows";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { userContext } from "../Context/userContext";
import { PetCardBasic } from "../components/PetCardBasic/PetCardBasic";
import { authContext } from "../Auth/AuthContext";
import { usersApi } from "../helpers/usersApi";
import { petsApi } from "../helpers/petsApi";
import { Grid } from "../UIKit/Layouts/Grid/Grid";
import { Around } from "../UIKit/Layouts/Around/Around";

export const MyPetsView = () => {
  const navigate = useNavigate();
  const {
    userSavedPets,
    setUserSavedPets,
    userOwnedPets,
    setUserOwnedPets,
    userFosteredPets,
    setUserFosteredPets,
    setSelectedPetId,
    selectedPetId,
  } = useContext(userContext);
  const { userId } = useContext(authContext);
  const [saved, setSaved] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadUserInfo();
  }, []);

  const clearError = () => {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  const loadUserInfo = () => {
    petsApi
      .getUserPets(userId)
      .then((resp) => {
        console.log(resp);
        if (resp.userSavedPets) {
          setUserSavedPets(resp.userSavedPets);
        }
        if (resp.userOwnedPets) {
          setUserOwnedPets(resp.userOwnedPets);
        }
        if (resp.userFosteredPets) {
          setUserFosteredPets(resp.userFosteredPets);
        } else {
          setError(true);
          setErrorMessage("no pets yet!");
          clearError();
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setErrorMessage("something happened getting ur pets");
      });
  };
  const renderUserPets = (list) => {
    if (list) {
      return list.map((i) => {
        return (
          <li key={i._id}>
            {
              <PetCardBasic
                petName={i.name}
                adoptionStatus={i.adoptionStatus}
                img={i.img}
                routeUser={() => getPetDetails(i._id)}
              />
            }
          </li>
        );
      });
    } else {
      setError(true);
      setErrorMessage("Start saving pets to see your cuties here!");
      clearError();
    }
  };

  const toggle = (e) => {
    e.preventDefault();
    setSaved(!saved);
  };

  const getPetDetails = (id) => {
    setSelectedPetId(id);
    navigate("/pets");
  };

  return (
    <div>
      <NavBar />

      <Rows>
        <Center>
          <h2>Your Pet Center!</h2>
        </Center>
        <Around>
          <h3>{!saved ? `Pets You've Adopted:` : `Your Saved Cuties!`}</h3>

          <Btn onClick={toggle}>
            {saved
              ? "Display Your Owned/Fostered Pets"
              : "Display Saved For later"}
          </Btn>
        </Around>

        <Center>
          <p>{error && `${errorMessage}`}</p>
        </Center>
      </Rows>

      <Center>
        <Rows>
          <Grid>
            {saved
              ? renderUserPets(userSavedPets)
              : renderUserPets(userOwnedPets)}
          </Grid>
          <Center>
            <h3>{!saved && `Your Fostered Cuties`}</h3>
          </Center>
          <Grid>{!saved ? renderUserPets(userFosteredPets) : ""}</Grid>
        </Rows>
      </Center>
    </div>
  );
};
