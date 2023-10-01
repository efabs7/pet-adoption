import "./BtnSmall.css";
import { Center } from "../Layouts/Center/Center";
export const BtnSmall = ({ onClick, children }) => {
  return (
    <button className="BtnSmall" onClick={onClick}>
      <Center>{children}</Center>
    </button>
  );
};
