import { Center } from "../UIKit/Layouts/Center/Center";
import { FormBasic } from "../components/FormBasic/FormBasic";
import { NavBar } from "../components/NavBar/NavBar";
import { Rows } from "../UIKit/Layouts/Rows/Rows";

export const ProfileView = () => {
  return (
    <div>
      <NavBar />
      <Center>
        <Rows>
          <Center>
            <h3>Edit your info below!</h3>
          </Center>
          <FormBasic />
        </Rows>
      </Center>
    </div>
  );
};
