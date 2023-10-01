import "./Header.css";
import { useNavigate } from "react-router-dom";
import { Line } from "../../UIKit/Layouts/Line/Line";
import { Btn } from "../../UIKit/Elements/Btn/Btn";
import { Between } from "../../UIKit/Layouts/Between/Between";
import { useContext, useState, useEffect } from "react";
import { authContext } from "../../Auth/AuthContext";
import { usersApi } from "../../helpers/usersApi";

export const Header = ({ openModal }) => {
  const { isLoggedIn, userId } = useContext(authContext);
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const navigate = useNavigate();
  const routeUser = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  useEffect(() => {
    if (isLoggedIn) {
      usersApi
        .getUser(userId)
        .then((resp) => {
          const { name, lastName } = resp;
          console.log(name, lastName);
          setUserName(name);
          setUserLastName(lastName);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setUserName(" new friend");
    }
  }, []);

  return (
    <header className="Header">
      <Between>
        <Line>
          <p>
            Welcome to the Secrets of Pets,{" "}
            {isLoggedIn ? `${userName} ${userLastName}` : `${userName}`}!
          </p>
        </Line>
        <Line>
          {isLoggedIn ? (
            <Btn onClick={routeUser}>Profile</Btn>
          ) : (
            <Btn onClick={openModal}>Login</Btn>
          )}
        </Line>
      </Between>
    </header>
  );
};
