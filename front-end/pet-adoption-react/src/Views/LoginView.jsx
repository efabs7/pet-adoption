import { Rows } from "../UIKit/Layouts/Rows/Rows";
import { Center } from "../UIKit/Layouts/Center/Center";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Header } from "../components/Header/Header";
import { deCode } from "../helpers/deCode";
import { Line } from "../UIKit/Layouts/Line/Line";
import { useContext } from "react";
import { api } from "../Api/api";
import "../App.css";
import { authContext } from "../Auth/AuthContext";
import { Navigate } from "react-router-dom";
import Modal from "react-modal";
import { Between } from "../UIKit/Layouts/Between/Between";
import Box from "../components/Box/Box";
import { useState } from "react";
import { usersApi } from "../helpers/usersApi";
import { Btn } from "../UIKit/Elements/Btn/Btn";
import { LoginForm } from "../components/LoginForm/LoginForm";
import "../components/LoginForm/LoginForm.css";
import { Around } from "../UIKit/Layouts/Around/Around";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../helpers/loginApi";
const img = require("../imgs/dog-lick.png");
const petsExample = require("../imgs/pets.png");
const cat = require("../imgs/evil-cat.png");
const dog = require("../imgs/weird-dog.png");
export const LoginView = () => {
  const { logUserIn, isLoggedIn } = useContext(authContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("false");
  const navigate = useNavigate();
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
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
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const handleLogin = () => {
    if (email && password) {
      axios
        .post(process.env.REACT_APP_API_PORT + "login", {
          email,
          password,
        })

        .then((resp) => {
          console.log("made it to response");
          const userToken = resp.data.access_token;
          // const idExtracted = deCode(userToken);
          console.log(userToken);
          logUserIn(userToken);
        })

        .catch((err) => {
          console.log(err);
          setError(true);
          setErrorMessage(err.response.data);
        });
    } else {
      setErrorMessage(
        "must enter values for username and password- c'mon, you weren't born yesterday"
      );
    }
  };
  return (
    /*Goals: use schema validation on login; backend bcrypt and jwt ; store token as token rather than userid in local storage */

    <Rows>
      <Header openModal={openModal} />

      <Box>
        <Rows>
          <Center>
            <h2>
              The place to foster and adopt pets! Login to view your account...
            </h2>
          </Center>
          <Rows>
            <Center>
              <img src={cat} alt="cat" className="largeImg" />
              <Rows>
                <img src={dog} alt="dog" className="mediumImg" />
                <img src={img} alt="dog" className="mediumImg" />
              </Rows>
            </Center>
          </Rows>

          <Center></Center>
        </Rows>
        <Center>
          <Rows>
            <h3>
              Not a member yet? You can still search our pets below- and sign up
              today!
            </h3>

            <Between>
              <Btn onClick={() => navigate("/search")}>Search Pets</Btn>
              <Btn onClick={() => navigate("/register")}>Register Here..</Btn>
            </Between>
          </Rows>
        </Center>
      </Box>

      <Center>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Login Form"
        >
          <div className="LoginForm">
            <Between>
              <h3>Sign in to our pet world</h3>
              <Btn onClick={closeModal}>close</Btn>
            </Between>
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onSubmit={handleLogin}
            />
            <p>{error && `${errorMessage}`}</p>
          </div>
        </Modal>
      </Center>
    </Rows>
  );
};
