import "./ListItem.css";
import { Line } from "../../UIKit/Layouts/Line/Line";

export const ListItemUser = ({ name, last, onClick }) => {
  return (
    <div className="ListItem UserItem" onClick={onClick}>
      <Line>
        <h4>User:</h4>
        <p>{`${name} ${last}`}</p>
      </Line>
    </div>
  );
};

export const ListItemPet = ({ name, type, breed, status, onClick }) => {
  return (
    <div className="ListItem" onClick={onClick}>
      <Line>
        <h4>{`${type}: ${name}.`}</h4>
        <p>{`Breed: ${breed}. ${status}.`}</p>
      </Line>
    </div>
  );
};
