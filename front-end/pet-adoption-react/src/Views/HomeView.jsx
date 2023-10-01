import { Header } from "../components/Header/Header";
import { NavBar } from "../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { Center } from "../UIKit/Layouts/Center/Center";
import { Btn } from "../UIKit/Elements/Btn/Btn";
import { Rows } from "../UIKit/Layouts/Rows/Rows";
import { useContext } from "react";
import { Between } from "../UIKit/Layouts/Between/Between";
import { authContext } from "../Auth/AuthContext";
import Box from "../components/Box/Box";
import { Navigate } from "react-router-dom";
const pic = require("../imgs/pets.png");
const image = require("../imgs/dog-lick.png");
const dog = require("../imgs/weird-dog.png");
const cat = require("../imgs/evil-cat.png");

export const HomeView = ({}) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(authContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const toSearch = () => {
    navigate("/search");
  };
  const toPets = () => {
    navigate("/my-pets");
  };

  return (
    <div>
      <NavBar />
      <Header></Header>

      <Rows>
        <Center>
          {" "}
          <Box>
            <Center>
              <Rows>
                <Center>
                  <h3>Home of the pets!</h3>
                </Center>
                <Center>
                  <p>
                    Welcome to our pet adoption portal! Here you can adopt pets.
                    Check out all the cute animals we are not worthy of.
                  </p>
                </Center>

                <Center>
                  <h4>
                    Add pets to your saved list, adopt and foster cuties, enrich
                    your life with animals.
                  </h4>
                </Center>
                <Center>
                  <img src={cat} alt="cute animals" className="mediumImg" />

                  <img src={dog} alt="cute animals" className="mediumImg" />
                </Center>
              </Rows>
            </Center>
          </Box>
        </Center>
        <Center>
          <Between>
            <Btn onClick={toSearch}>Search Pets</Btn>
            <Btn onClick={toPets}>My Pets</Btn>
          </Between>
        </Center>
      </Rows>
    </div>
  );
};
