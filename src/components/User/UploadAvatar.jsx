import React from "react";
import axios from "axios";
import { useState } from "react";

function UploadAvatar({ props }) {
  const URL = "http://localhost:3333/user/";
  const PostLink = URL + props;
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  // const { userInfo } = useSelector((state) => state.userLogin);

  const handleSubmit = async (event) => {
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
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="avatar"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload File</button>
        {status ? <h1>{status}</h1> : null}
      </form>
    </div>
  );
}

export default UploadAvatar;
