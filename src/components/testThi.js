import React, { useEffect, useState } from 'react';

function Thi() {
  const [res, setRes] = useState([])
  useEffect(() => {
    const url = 'https://jsonplaceholder.typicode.com/posts'
    fetch(url).then(res => res.json()).then(data => setRes(data))

  },[])
  const onsubmit = (e) => {
    e.preventDefault(e);
    const data = {
     input1: e.target[0].value,
     input2: e.target[1].value,
    }
    console.log(data);
  };
  return (
    <>
    {res.map(post => (
      <>
      <li>{post.body}</li>
      </>
    ))}
      <form onSubmit={onsubmit}>
        <input
        ></input>
        <input></input>
        <button type='submit'>submit</button>
      </form>
    </>
  );
}
export default Thi;
