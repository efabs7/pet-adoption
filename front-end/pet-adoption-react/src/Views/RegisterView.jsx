import { FormBasic } from "../components/FormBasic/FormBasic";
import { Center } from "../UIKit/Layouts/Center/Center";
import { Rows } from "../UIKit/Layouts/Rows/Rows";
import { Header } from "../components/Header/Header";
import Modal from "react-modal";
import { useState } from "react";
import { Btn } from "../UIKit/Elements/Btn/Btn";
export const RegisterView = () => {
  //goals: schema validation ajv backend; jwt and bcrypt
  const [modalIsOpen, setIsOpen] = useState(true);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  // function openModal() {
  //   setIsOpen(true);
  // }
  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Center>
      <Rows>
        <Header />

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Register Form"
        >
          <FormBasic />
        </Modal>
      </Rows>
    </Center>
  );
};
