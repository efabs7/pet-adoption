import { Btn } from "../../UIKit/Elements/Btn/Btn";
import { Rows } from "../../UIKit/Layouts/Rows/Rows";
import { Center } from "../../UIKit/Layouts/Center/Center";
import { Between } from "../../UIKit/Layouts/Between/Between";
import Box from "../Box/Box";
import { Around } from "../../UIKit/Layouts/Around/Around";
import { Line } from "../../UIKit/Layouts/Line/Line";
import "./PetCardBig.css";
import { NavBar } from "../NavBar/NavBar";
import { authContext } from "../../Auth/AuthContext";
import { useContext } from "react";

export const PetCardBig = ({
  returnPet,
  saveOrUnsavePet,
  type,
  breed,
  diet,
  petName,
  adoptionStatus,
  height,
  weight,
  color,
  petBio,
  isHypoallergenic,
  isSaved,
  img,
  isUserOwned,
  isUserFostered,
  adoptPet,
  fosterPet,
}) => {
  const { isLoggedIn } = useContext(authContext);
  return (
    <div>
      <NavBar />
      <Center>
        <Box>
          <Center>
            <Rows>
              <div className="PetCardBig">
                <Center>
                  <Rows>
                    <img src={img} alt={`cute ${type}`} className="largeImg" />
                  </Rows>
                </Center>

                <Center>
                  <Box>
                    <Rows>
                      <Between>
                        <h4>{`Type: ${type}`}</h4>
                        <h4>{`Name: ${petName}`}</h4>
                      </Between>

                      <Between>
                        <h4>{`Status: ${adoptionStatus}`}</h4>

                        <h4>{`Color: ${color}`}</h4>
                      </Between>
                      <Line>
                        <h4>{`Bio: ${petBio}`}</h4>
                      </Line>
                    </Rows>
                  </Box>
                  <Box>
                    <Rows>
                      <Between>
                        <h4>{`Breed: ${breed}`}</h4>
                        <h4>{`Hypoallergenic: ${isHypoallergenic}`}</h4>
                      </Between>
                      <Between>
                        <h4>{`Weight: ${weight}`}</h4>
                        <h4>{`Height: ${height}`}</h4>
                      </Between>

                      <Line>
                        <h4>{`Diet: ${diet}`}</h4>
                      </Line>
                    </Rows>
                  </Box>
                </Center>

                {isLoggedIn && (
                  <Between>
                    {(isUserOwned && (
                      <Btn onClick={returnPet}>{`Return Me :(`}</Btn>
                    )) ||
                      (isUserFostered && (
                        <Btn onClick={returnPet}>{`Return Me :(`}</Btn>
                      ))}
                    <Btn onClick={saveOrUnsavePet}>
                      {isSaved ? `Unsave Me` : `Save Cutie`}
                    </Btn>
                    {!isUserOwned ? (
                      <Btn onClick={adoptPet}>Adopt Me!</Btn>
                    ) : (
                      ``
                    )}
                    {!isUserFostered ? (
                      <Btn onClick={fosterPet}>Foster Me!</Btn>
                    ) : (
                      ``
                    )}
                  </Between>
                )}
              </div>
            </Rows>
          </Center>
        </Box>
      </Center>
    </div>
  );
};
