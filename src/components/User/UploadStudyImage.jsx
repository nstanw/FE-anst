import React from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { actions } from "../../features/toogle/toogleSlice";
import {
  postAvatar,
  postLinkVideo,
  getUserAPI,
} from "../../features/user/userSlice";

function UploadStudyImage({ props }) {
  const URL = "http://localhost:3333/user/";
  const PostLink = URL + props;
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  // const { userInfo } = useSelector((state) => state.userLogin);

  const handleSubmit = async (event) => {
    const [show, setShow] = useState(false);
    const [link, setlink] = useState("");

    const toggle = () => {
      setShow(!show);
    };
    const handleChangeImage = () => {
      console.log("link:", link);
      console.log("props:", props);
      if (props.image) {
        dispatch(postAvatar({ image: link }))
          .then(() => dispatch(getUserAPI()))
          .catch((err) => console.error(err));
      }
      if (props.youtube) {
        dispatch(postLinkVideo({ video: link }))
          .then(() => dispatch(getUserAPI()))
          .catch((err) => console.error(err));
      }

      // dispatch(actions.changeImage(link));
    };
    setStatus(""); // Reset status
    event.preventDefault();
    const formData = new FormData();
    formData.append("avatar", file);
    // console.log(formData);
    const resp = await axios.post(PostLink, formData, {
      headers: {
        "content-type": "multipart/form-data",
        // Authorization: `Bearer ${userInfo.token}`,
      },
    });
    setStatus(resp.status === 200 ? "Thank you!" : "Error.");
  };

  return (
    <div className="form-upload-file">
      <div>
        <span className="btnWhite" onClick={toggle}>
          Tải ảnh lên
        </span>
        <Modal isOpen={show} toggle={toggle} className="">
          <ModalHeader toggle={toggle}>Hi!</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                name="avatar"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button type="submit">Upload File</button>
              {/* <label for="upload">
          aaaa
          <input type="file" id="upload" hidden />
        </label> */}
              {status ? <h1>{status}</h1> : null}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btnSave"
              onClick={handleChangeImage}
              // onClick={toggle}
            >
              Save
            </Button>
            <Button className="btnSave" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default UploadStudyImage;
