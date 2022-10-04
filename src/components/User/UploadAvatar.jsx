import React from 'react';

const AvatarUploadForm = () => {
  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    const file = event.target.files[0]
    console.log(event.target.files[0]);
    const url = 'http://localhost:3333/user/uploadAvatar';

    axios
      .post(url, file, {
        headers: {
          'Content-Type':'multipart/form-data'
        },
      })
      .then((res) => console.log(res))
      .catch((errors) => console.log(errors));
  };
  return (
    <form
      encType='multipart/form-data'
      onSubmit={event => handleSubmit(event)}
    >
      <label htmlFor='image'>image Address</label>
      <input
        id='image'
        name='image'
        type='file'
      />

      <button type='submit'>Submit</button>
    </form>
  );
};
export default AvatarUploadForm;
