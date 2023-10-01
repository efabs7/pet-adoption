import { useNavigate } from "react-router-dom";
import { Between } from "../../UIKit/Layouts/Between/Between";
import { Center } from "../../UIKit/Layouts/Center/Center";
import { Btn } from "../../UIKit/Elements/Btn/Btn";
import { FormPet } from "../../components/FormPet/FormPet";

export const AddPetView = () => {
  const navigate = useNavigate();
  const handleRouteUser = () => {
    navigate("/dashboard");
  };
  return (
    <div>
      <header>
        <Between>
          <h3>ADMIN VIEW</h3>
          <Btn onClick={handleRouteUser}>To Admin Dashboard</Btn>
        </Between>
      </header>
      <Center>
        <FormPet />
      </Center>
    </div>
  );
};
