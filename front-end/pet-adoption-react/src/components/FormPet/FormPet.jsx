import { Input } from "../Input/Input";
import Box from "../Box/Box";
import { Center } from "../../UIKit/Layouts/Center/Center";
import { Btn } from "../../UIKit/Elements/Btn/Btn";
import { Rows } from "../../UIKit/Layouts/Rows/Rows";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { petsApi } from "../../helpers/petsApi";
import "./FormPet.css";
import { userContext } from "../../Context/userContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Between } from "../../UIKit/Layouts/Between/Between";
import { InputImg } from "../InputImg/InputImg";
import { authContext } from "../../Auth/AuthContext";

export const FormPet = () => {
  const { selectedPetId, setSelectedPetId, adminIsEditing } =
    useContext(userContext);
  const { userToken, isAdmin, setIsAdmin } = useContext(authContext);
  const [petName, setPetName] = useState("");
  const [type, setType] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [bio, setBio] = useState("");
  const [img, setImg] = useState(null);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [hypoallergenic, setHypoallergenic] = useState("");
  const [diet, setDiet] = useState("");
  const [breed, setBreed] = useState("");
  const [editing, setIsEditing] = useState(false);
  const [error, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [permission, setPermission] = useState(null);
  const [imgLink, setImgLink] = useState("");
  const navigate = useNavigate();

  const notifyAdded = () => {
    toast.success("Added pet to system!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const notifyImageUpl = () => {
    toast.success("please wait while we upload!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const notifyEdited = () => {
    toast.success("edited pet!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const clearValues = () => {
    setSelectedPetId(null);
    setPetName("");
    setType("");
    setDiet("");
    setColor("");
    setWeight("");
    setHeight("");
    setBreed("");
    setAdoptionStatus("");
    setImg(null);
  };

  const handleImage = (e) => {
    e.preventDefault();

    const pic = e.target.files[0];
    setImg(pic);
    console.log("set image");

    const petForm = new FormData();

    petForm.append("file", img);
    notifyImageUpl();

    setTimeout(() => {
      petsApi
        .addImg(petForm, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((resp) => {
          console.log("made it to response");
          console.log(resp);
          console.log(resp.url);
          setImgLink(resp.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  };

  const sendToServer = () => {
    console.log("creating pet");
    petsApi
      .add(permission, {
        name: petName,
        type: type,
        adoptionStatus: adoptionStatus,
        bio: bio,
        img: imgLink,
        height: height,
        weight: weight,
        hypoallergenic: hypoallergenic,
        diet: diet,
        breed: breed,
      })
      .then((resp) => {
        console.log(resp);
        notifyAdded();
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setErrorMessage(err);
      });

    console.log("here we send to server lol");
  };
  const updatePetInServer = (id) => {
    console.log("updating pet");
    petsApi
      .update(id, permission, {
        name: petName,
        type: type,
        adoptionStatus: adoptionStatus,
        bio: bio,
        img: imgLink,
        height: height,
        weight: weight,
        hypoallergenic: hypoallergenic,
        diet: diet,
        breed: breed,
      })
      .then((resp) => {
        console.log(resp);
        setIsEditing(false);
        setSelectedPetId(null);
        notifyEdited();
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      })

      .catch((err) => {
        console.log(err);
        setIsError(true);
        setErrorMessage(err);
      });

    //
  };

  useEffect(() => {
    setIsAdmin(true);
    if (isAdmin) {
      setPermission(1);
    } else {
      setPermission(0);
    }
    if (adminIsEditing) {
      setIsEditing(true);
      petsApi
        .getPet(selectedPetId)
        .then((resp) => {
          const petInfo = resp;

          const {
            type,
            diet,
            name,
            adoptionStatus,
            img,
            height,
            weight,
            color,
            breed,
          } = petInfo;
          setPetName(name);
          setType(type);
          setDiet(diet);
          setColor(color);
          setWeight(weight);
          setHeight(height);
          setBreed(breed);
          setAdoptionStatus(adoptionStatus);
          setImg(img);
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
          setErrorMessage("error loading this pet");
        });
    } else return;
  }, []);

  return (
    <div>
      <ToastContainer theme="dark" />
      <div className="FormPet">
        <Center>
          <h3>{editing ? `Edit Pet Details` : `Add Pet`}</h3>
        </Center>
        <Box>
          <Rows>
            <p>Pet Name:</p>
            <Input
              placeholder="pet name.."
              value={petName}
              onChange={setPetName}
            />
            <p>Pet Type:</p>
            <Input
              placeholder="pet type..? dog or cat. no dragons"
              value={type}
              onChange={setType}
            />
            <p>Adoption Status:</p>
            <Input
              placeholder="adoption status (adopted, fostered, available)"
              value={adoptionStatus}
              onChange={setAdoptionStatus}
            />
            <p>Optional details about pet:</p>
            <Input
              placeholder="optional enter a little info about pet!"
              value={bio}
              onChange={setBio}
            />
            <p>Upload Cute Image:</p>
            <InputImg
              placeholder="link to image.."
              onChange={handleImage}
              type="file"
            />
            <p>Height: large or small</p>
            <Input
              placeholder="height.. large or small"
              value={height}
              onChange={setHeight}
            />
            <p>Weight: large or small</p>
            <Input
              placeholder="weight.. large or small"
              value={weight}
              onChange={setWeight}
            />
            <p>Color:</p>
            <Input placeholder="color.." value={color} onChange={setColor} />
            <p>Hypoallergenic? True or false..</p>
            <Input
              placeholder="hypoallergenic? true or false.."
              value={hypoallergenic}
              onChange={setHypoallergenic}
            />
            <p>What do they eat:</p>
            <Input placeholder="diet info..." value={diet} onChange={setDiet} />
            <p>Breed:</p>
            <Input placeholder="breed.." value={breed} onChange={setBreed} />
            <Between>
              <Btn
                onClick={
                  !adminIsEditing
                    ? sendToServer
                    : () => updatePetInServer(selectedPetId)
                }
              >
                {editing ? `Save Changes` : `Add Pet`}
              </Btn>
              <Btn onClick={clearValues}>Clear Values</Btn>
            </Between>
            <p>{error && `${errorMessage}`}</p>
          </Rows>
        </Box>
      </div>
    </div>
  );
};
