import "./UserCard.css";
import { Center } from "../../UIKit/Layouts/Center/Center";
import { Rows } from "../../UIKit/Layouts/Rows/Rows";
import { Btn } from "../../UIKit/Elements/Btn/Btn";
import { Between } from "../../UIKit/Layouts/Between/Between";
import { Line } from "../../UIKit/Layouts/Line/Line";
import { Around } from "../../UIKit/Layouts/Around/Around";
import Box from "../Box/Box";

export const UserCard = ({
  userName,
  userLast,
  userPhone,
  userOwned,
  userBio,
  onClick,
}) => {
  const renderList = (list) => {
    return list.map((i) => {
      return <p key={i._id}>{i.name}</p>;
    });
  };
  return (
    <div>
      <Center>
        <Box>
          <div className="UserCard">
            <Rows>
              <Center>
                <h3>A little bit about this user...</h3>
              </Center>

              <Rows>
                <Rows>
                  <Box>
                    {" "}
                    <h4>{`Name: ${userName} ${userLast}`}</h4>
                    <p>{`phone: ${userPhone}`}</p>
                    <p>{`About: ${userBio}`}</p>
                  </Box>
                </Rows>
                <Rows>
                  <Box>
                    <h4>{`User Owns:`}</h4>
                    <div>{renderList(userOwned)}</div>
                  </Box>
                </Rows>
              </Rows>

              <Btn onClick={onClick}>Exit</Btn>
            </Rows>
          </div>
        </Box>
      </Center>
    </div>
  );
};
