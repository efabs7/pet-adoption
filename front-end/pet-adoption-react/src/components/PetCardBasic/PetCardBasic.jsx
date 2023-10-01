import { Btn } from "../../UIKit/Elements/Btn/Btn";
import { Rows } from "../../UIKit/Layouts/Rows/Rows";
import { Center } from "../../UIKit/Layouts/Center/Center";
import { Between } from "../../UIKit/Layouts/Between/Between";

import Box from "../Box/Box";
import "./PetCardBasic.css";
import { Around } from "../../UIKit/Layouts/Around/Around";
export const PetCardBasic = ({ petName, adoptionStatus, routeUser, img }) => {
  return (
    <div>
      <Center>
        <Box>
          <Rows>
            <div className="PetCardBasic">
              <Center>
                {" "}
                <h3>{`Hi, my name is ${petName}; I'm cute!`}</h3>
              </Center>
              <Center>
                <img src={img} alt={`Cute ${petName}`} />
              </Center>
              <Around>
                <Rows>
                  {" "}
                  <p>{`Status: ${adoptionStatus}`}</p>
                </Rows>
              </Around>
              <Center>
                <Btn onClick={routeUser}>Learn More!</Btn>
              </Center>
            </div>
          </Rows>
        </Box>
      </Center>
    </div>
  );
};
