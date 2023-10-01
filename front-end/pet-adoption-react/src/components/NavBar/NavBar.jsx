import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Between } from "../../UIKit/Layouts/Between/Between";
import { Line } from "../../UIKit/Layouts/Line/Line";
import { BtnSmall } from "../../UIKit/BtnSmall/BtnSmall";
import "./NavBar.css";
import { authContext } from "../../Auth/AuthContext";
import { userContext } from "../../Context/userContext";
export const NavBar = () => {
  const { isLoggedIn, logUserOut, userId } = useContext(authContext);
  const { setUserOwnedPets, setUserFosteredPets, setUserSavedPets } =
    useContext(userContext);
  const clearUserPetsFromContext = () => {
    setUserOwnedPets([]);
    setUserFosteredPets([]);
    setUserSavedPets([]);
  };
  return (
    <nav className="NavBar">
      <Between>
        <Line>
          {isLoggedIn && <NavLink to="/profile">Profile</NavLink>}
          <NavLink to="/">Home</NavLink>
          <NavLink to="/search">Search</NavLink>
          {isLoggedIn && <NavLink to="/my-pets">My Pets</NavLink>}
          {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
          {!isLoggedIn && <NavLink to="/register">Register</NavLink>}
        </Line>
        <Line>
          {isLoggedIn && (
            <BtnSmall
              onClick={() => logUserOut(userId) && clearUserPetsFromContext}
            >
              Log Out
            </BtnSmall>
          )}
        </Line>
      </Between>
    </nav>
  );
};
