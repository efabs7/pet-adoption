import { NavBar } from "../components/NavBar/NavBar";
import { Center } from "../UIKit/Layouts/Center/Center";
import { Rows } from "../UIKit/Layouts/Rows/Rows";
import { Input } from "../components/Input/Input";
import Box from "../components/Box/Box";
import { api } from "../Api/api";
import { Grid } from "../UIKit/Layouts/Grid/Grid";
import { Line } from "../UIKit/Layouts/Line/Line";
import { useState, useContext } from "react";
import { Btn } from "../UIKit/Elements/Btn/Btn";
import { Between } from "../UIKit/Layouts/Between/Between";
import { petsApi } from "../helpers/petsApi";
import { PetCardBasic } from "../components/PetCardBasic/PetCardBasic";
import { userContext } from "../Context/userContext";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "../components/Dropdown/Dropdown.css";
import { ToastContainer, toast } from "react-toastify";
import { authContext } from "../Auth/AuthContext";

export const SearchView = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedAdoption, setSelectedAdoption] = useState(null);
  const [selectedHeight, setSelectedHeight] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const { setSelectedPetId } = useContext(userContext);
  const [searchResults, setSearchResults] = useState([]);
  const [basic, setBasic] = useState(true);
  const [userInput, setUserInput] = useState("");
  const { isLoggedIn } = useContext(authContext);
  const navigate = useNavigate();
  const toggleSearchBasic = () => {
    setBasic(!basic);
  };

  const clearError = () => {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  const notifyUserError = (message) => {
    toast.error(`${message}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const type = [
    { value: "Cat", label: "Cat" },
    { value: "Dog", label: "Dog" },
  ];
  const adoptionStatus = [
    { value: "Adopted", label: "Adopted" },

    { value: "Available", label: "Available" },
    { value: "Fostered", label: "Fostered" },
  ];
  const height = [
    { value: "large", label: "large" },

    { value: "small", label: "small" },
  ];
  const weight = [
    { value: "large", label: "large" },

    { value: "small", label: "small" },
  ];

  const morePetDetails = (id) => {
    if (!isLoggedIn) {
      notifyUserError("sorry, log in to see more details!");
      return;
    }
    setSelectedPetId(id);
    navigate("/pets");
  };

  const searchPetsBasic = () => {
    if (selectedType) {
      const params = new URLSearchParams();
      const userSelected = selectedType.value;
      params.append("type", userSelected.toLowerCase());
      api
        .send("get", "/pets", params)

        .then((resp) => {
          console.log(resp);
          const petsList = resp;
          const filteredList = petsList.filter((i) => i.type == userSelected);
          console.log(filteredList);
          setSearchResults(filteredList);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          setErrorMessage(err);
        });
    } else {
      setError(true);
      notifyUserError("please select a value...");
      clearError();
    }
  };

  const renderUserSearch = (list) => {
    if (list) {
      return list.map((i) => {
        return (
          <li key={i._id}>
            {
              <PetCardBasic
                petName={i.name}
                adoptionStatus={i.adoptionStatus}
                img={i.img}
                routeUser={() => morePetDetails(i._id)}
              />
            }
          </li>
        );
      });
    } else {
      setError(true);
      notifyUserError("No results for this search!");
      clearError();
    }
  };

  const clearSearch = () => {
    setSearchResults([]);
  };

  const searchPetsDetailed = () => {
    if ((selectedType, selectedAdoption, selectedHeight, selectedWeight)) {
      let params = new URLSearchParams();
      params.append("adoptionStatus", selectedAdoption.value.toLowerCase());
      params.append("type", selectedType.value.toLowerCase());
      params.append("height", selectedHeight.value.toLowerCase());
      params.append("weight", selectedWeight.value.toLowerCase());

      api
        .send("get", "/pets", params)

        .then((resp) => {
          const petsList = resp;

          const filteredType = petsList.filter(
            (i) => (i.type = selectedType.value)
          );
          console.log(filteredType);
          const filteredAdopted = filteredType.filter(
            (i) => i.adoptionStatus == selectedAdoption.value
          );
          console.log(filteredAdopted);

          const filteredHeight = filteredAdopted.filter(
            (i) => i.height == selectedHeight.value
          );
          console.log(filteredHeight);
          const filteredWeight = filteredHeight.filter(
            (i) => i.weight == selectedWeight.value
          );
          console.log(filteredWeight);
          // setSearchResults(filteredWeight);
          setSearchResults(filteredWeight);
          if (filteredWeight.length < 1) {
            notifyUserError("sorry... no pets fit this search!");
            clearError();
          }
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          notifyUserError(
            `Something went wrong- try searching with different values :(`
          );
          clearError();
        });
    } else {
      setError(true);
      notifyUserError("please select values...");
      clearError();
    }
  };

  const nameSearch = () => {
    if (userInput) {
      console.log(userInput);
      let params = new URLSearchParams();
      params.append("name", userInput.toLowerCase());
      api
        .send("get", "/pets", params)

        .then((resp) => {
          const list = resp;
          console.log(resp);
          const filteredList = list.filter((i) => {
            return i.name == userInput;
          });
          if (!filteredList) {
            setError(true);
            notifyUserError("no pets with this name :(");
            clearError();
          } else {
            setSearchResults(filteredList);
            setUserInput("");
          }
        })
        .catch((err) => {
          setError(true);
          setErrorMessage(`no pets :(`);
          notifyUserError("no pets with this name");
          clearError();
        });
    } else {
      setError(true);
      setErrorMessage("please enter a name:(");
      clearError();
    }
  };

  return (
    <div>
      <NavBar />

      <Center>
        <div>
          <ToastContainer theme="dark" />
        </div>
        <Rows>
          <Between>
            <h3>Welcome to the Search Portal!</h3>

            <Btn onClick={toggleSearchBasic}>
              {basic ? `Detailed Search` : `Basic Search`}
            </Btn>
          </Between>

          {basic ? (
            <Box>
              <Select
                defaultValue={selectedType}
                onChange={setSelectedType}
                placeholder="Select Animal Type.."
                options={type}
                isClearable={true}
              />
            </Box>
          ) : (
            <div>
              <Rows>
                <h3>Select Type:</h3>
                <Select
                  defaultValue={selectedType}
                  onChange={setSelectedType}
                  placeholder="Select Animal Type.."
                  options={type}
                  isClearable={true}
                />
                <h3>Select By Adoption Status:</h3>
                <Select
                  defaultValue={selectedAdoption}
                  onChange={setSelectedAdoption}
                  placeholder="Select By Adoption Status.."
                  options={adoptionStatus}
                  isClearable={true}
                />
                <h3>Select By Height:</h3>
                <Select
                  defaultValue={selectedHeight}
                  onChange={setSelectedHeight}
                  placeholder="Select By Height.."
                  options={height}
                  isClearable={true}
                />
                <h3>Select By Weight:</h3>
                <Select
                  defaultValue={selectedWeight}
                  onChange={setSelectedWeight}
                  placeholder="Select By Weight u judgy bish.."
                  options={weight}
                  isClearable={true}
                />
                <Box>
                  <Between>
                    {" "}
                    <h3>Search By Pet Name ..</h3>
                    <Btn onClick={nameSearch}>Search..</Btn>
                  </Between>

                  <Input
                    placeholder="Enter pet name here"
                    value={userInput}
                    onChange={setUserInput}
                  />
                </Box>
              </Rows>
            </div>
          )}
          <Between>
            <Btn onClick={basic ? searchPetsBasic : searchPetsDetailed}>
              Search...
            </Btn>
            {searchResults && <Btn onClick={clearSearch}>Clear Results</Btn>}
          </Between>
          <Center>
            <h3>{`${errorMessage}`}</h3>
          </Center>
        </Rows>
      </Center>
      <Grid>{renderUserSearch(searchResults)}</Grid>
    </div>
  );
};
