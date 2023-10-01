import { Input } from "../Input/Input";
import Box from "../Box/Box";
import { useState } from "react";
import { Center } from "../../UIKit/Layouts/Center/Center";
import { Btn } from "../../UIKit/Elements/Btn/Btn";
import { Rows } from "../../UIKit/Layouts/Rows/Rows";
import { Between } from "../../UIKit/Layouts/Between/Between";
import { usersApi } from "../../helpers/usersApi";
import { useContext, useEffect } from "react";
import { getUserFromStorage } from "../../Auth/storage";
import { Line } from "../../UIKit/Layouts/Line/Line";
import { Around } from "../../UIKit/Layouts/Around/Around";
import { authContext } from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const FormBasic = () => {
  const { isLoggedIn, userId } = useContext(authContext);

  const [userInfo, setUserInfo] = useState({});
  const [userName, setName] = useState("");
  const [userLastName, setLastName] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userPasswordMatch, setUserPasswordMatch] = useState("");
  const [userPhone, setPhone] = useState("");
  const [userBio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("false");
  const navigate = useNavigate();

  const notifyEdited = () => {
    toast.success("edited your profile!!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const notifyAdded = () => {
    toast.success("Congrats! Account Created Successfully! Now you can login", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const loadUser = () => {
    if (isLoggedIn) {
      usersApi
        .getUser(userId)
        .then((resp) => {
          const user = resp;
          console.log(user);
          setUserInfo(user);
          const { name, password, phone, bio } = user;
          setName(name);
          setPassword(password);
          setPhone(phone);
          setBio(bio);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          setErrorMessage("error loading your info...");
        });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const sendUserInfoToServer = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      usersApi.update(
        {
          name: userName,
          password: userPassword,
          phone: userPhone,
          bio: userBio,
        },
        userId
      );
      notifyEdited();
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      if (userPassword === userPasswordMatch) {
        usersApi
          .add({
            name: userName,
            lastName: userLastName,
            password: userPassword,
            email: email,
            phone: userPhone,
            bio: userBio,
          })
          .catch((err) => {
            setError(true);
            setErrorMessage(err.response.data);
          });
        notifyAdded();
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setError(true);
        setErrorMessage("passwords gotta match buddy");
      }
    }
  };

  const toHome = () => {
    navigate("/");
  };

  return (
    <div>
      <ToastContainer theme="dark" />
      <div className="FormBasic">
        <Box>
          <Center>
            <h3>Enter Your Details; Ye Who Dare!</h3>
          </Center>
          <Rows>
            <Around>
              <div>
                <p>Name:</p>
                {isLoggedIn ? (
                  <Input
                    placeholder="your name.."
                    value={userName}
                    onChange={setName}
                  />
                ) : (
                  <Input
                    placeholder="your first name.."
                    value={userName}
                    onChange={setName}
                  />
                )}
              </div>
              <div>
                {!isLoggedIn ? (
                  <div>
                    <p>Last Name:</p>
                    <Input
                      placeholder="your last name.."
                      value={userLastName}
                      onChange={setLastName}
                    />
                  </div>
                ) : (
                  <div>
                    {" "}
                    <p>Password:</p>
                    <Input
                      placeholder="your password..?"
                      value={userPassword}
                      onChange={setPassword}
                    />
                  </div>
                )}
              </div>
            </Around>
            <Around>
              {!isLoggedIn && (
                <div>
                  {" "}
                  <p>Password:</p>
                  <Input
                    placeholder="your password..?"
                    value={userPassword}
                    onChange={setPassword}
                  />
                </div>
              )}
              <div>
                {!isLoggedIn && (
                  <div>
                    <p>Password Again..</p>
                    <Input
                      placeholder="your password again..?"
                      value={userPasswordMatch}
                      onChange={setUserPasswordMatch}
                    />
                  </div>
                )}
              </div>
            </Around>
            <Around>
              <div>
                {" "}
                <p>Phone:</p>
                <Input
                  placeholder="your phone number.."
                  value={userPhone}
                  onChange={setPhone}
                />
              </div>

              <div>
                <p>Email:</p>
                <Input
                  placeholder="your email.."
                  value={email}
                  onChange={setEmail}
                />
              </div>
            </Around>

            <Rows>
              <p>Optional Bio:</p>
              <Input
                placeholder="optional enter a little info about yourself!"
                value={userBio}
                onChange={setBio}
              />
            </Rows>

            <p>{error && `${errorMessage}`}</p>
            <Between>
              <Btn onClick={sendUserInfoToServer}>Save</Btn>
              <Btn onClick={toHome}>Back To Home</Btn>
            </Between>
          </Rows>
        </Box>
      </div>
    </div>
  );
};
