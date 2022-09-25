import React from "react";
import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ShowModal() {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };

  return (
    <div>
      <Button  className="btnSave" onClick={toggle}>
       Nhập link ảnh
      </Button>
      <Modal
        isOpen={show}
        toggle={toggle}
        className=""
      >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
         <input 
         className=""
        
         placeholder="vui lòng nhập link ảnh..."
         ></input>
        </ModalBody>
        <ModalFooter>
          <Button className="btnSave" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button className="btnSave" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ShowModal;
