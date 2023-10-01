import { useNavigate } from "react-router-dom";
import { Btn } from "../../UIKit/Elements/Btn/Btn";
import { Center } from "../../UIKit/Layouts/Center/Center";
import { Rows } from "../../UIKit/Layouts/Rows/Rows";
import { Between } from "../../UIKit/Layouts/Between/Between";
import { Around } from "../../UIKit/Layouts/Around/Around";
import { Line } from "../../UIKit/Layouts/Line/Line";
import { usersApi } from "../../helpers/usersApi";
import { api } from "../../Api/api";
import { UserCard } from "../../components/UserCard/UserCard";
import { ListItemPet } from "../../components/ListItem/ListItem";
import { ListItemUser } from "../../components/ListItem/ListItem";
import { petsApi } from "../../helpers/petsApi";
import Modal from "react-modal";
import { useState, useEffect, useContext } from "react";
import Box from "../../components/Box/Box";
import { Grid } from "../../UIKit/Layouts/Grid/Grid";
import { userContext } from "../../Context/userContext";
import { authContext } from "../../Auth/AuthContext";
export const DashboardView = () => {
  const [userList, setUserList] = useState([]);
  const [allPets, setAllPets] = useState([]);
  const [error, setError] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userToGet, setUserToGet] = useState(null);
  const [userFirst, setUserFirst] = useState("");
  const [userLast, setUserLast] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userOwned, setUserOwned] = useState([]);
  const [admins, setAdmins] = useState([]);

  const { setSelectedPetId, setAdminIsEditing } = useContext(userContext);
  const { isAdmin } = useContext(authContext);
  const navigate = useNavigate();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleRouteUser = () => {
    navigate("/addpet");
    setSelectedPetId("");
    setAdminIsEditing(false);
  };

  const routeHome = () => {
    navigate("/");
  };

  function openModal(id) {
    setUserToGet(id);
    usersApi
      .getUser(id)
      .then((resp) => {
        const userData = resp;
        const { name, lastName, phone, bio, userOwnedPets } = userData;
        setUserFirst(name);
        setUserLast(lastName);
        setUserPhone(phone);
        setUserBio(bio);
        setUserOwned(userOwnedPets);
        setIsOpen(true);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage("issue loading user");
      });
  }
  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const toPet = (petId) => {
    setSelectedPetId(petId);
    setAdminIsEditing(true);
    navigate("/pets");
  };

  useEffect(() => {
    let permission;
    console.log(isAdmin);
    if (isAdmin) {
      permission = 1;
    } else {
      permission = 0;
    }

    usersApi
      .getUsersAdmin(permission)
      .then((resp) => {
        console.log(resp);
        const users = resp;
        setUserList(users);
        const admins = users.filter(
          (i) => i.lastName === "granger" || i.email === "albus@albus.com"
        );
        setAdmins(admins);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setErrorMessage("Error loading users...");
      });

    api
      .send("get", "/pets")
      .then((resp) => {
        const pets = resp;
        setAllPets(pets);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setErrorMessage("error loading pets... they're not tamagachis");
      });
  }, []);

  const renderUsers = (list) => {
    if (!list) {
      return <h3>"sorry- no one is heree"</h3>;
    }
    return list.map((i) => {
      return (
        <ListItemUser
          key={i._id}
          onClick={() => openModal(i._id)}
          name={i.name}
          last={i.lastName}
        />
      );
    });
  };

  const renderPets = (list) => {
    return list.map((i) => {
      return (
        <ListItemPet
          key={i._id}
          type={i.type}
          name={i.name}
          breed={i.breed}
          status={i.adoptionStatus}
          onClick={() => toPet(i._id)}
        />
      );
    });
  };

  return (
    <div>
      <header>
        <Between>
          <h2>ADMIN VIEW</h2>

          <Line>
            <Btn onClick={handleRouteUser}>Add Pet </Btn>
            <Btn onClick={routeHome}>To Site Home...</Btn>
          </Line>
        </Between>
      </header>
      <Center>
        <Rows>
          <Box>
            <Rows>
              <Center>
                <h3>ADMINS</h3>
              </Center>
              <Grid>{renderUsers(admins)}</Grid>
            </Rows>
          </Box>
          <Box>
            <Center>
              <h3>USERS</h3>
            </Center>

            <Grid>{renderUsers(userList)}</Grid>
          </Box>
          <Box>
            <Rows>
              <Center>
                <h3>PETS</h3>
              </Center>
              <Grid>{renderPets(allPets)}</Grid>
            </Rows>
          </Box>

          <p>{error && `${errorMessage}`}</p>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="User Info"
          >
            <Center>
              <UserCard
                userName={userFirst}
                userLast={userLast}
                userPhone={userPhone}
                userOwned={userOwned}
                userBio={userBio}
                onClick={closeModal}
              />
            </Center>
          </Modal>
        </Rows>
      </Center>
    </div>
  );
};
