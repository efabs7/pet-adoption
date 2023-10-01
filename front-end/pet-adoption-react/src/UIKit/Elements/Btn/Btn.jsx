import "./Btn.css";
import { Center } from "../../Layouts/Center/Center";

export const Btn = ({ onClick, children }) => {
  return (
    <button className="Btn" onClick={onClick}>
      <Center>{children}</Center>
    </button>
  );
};
