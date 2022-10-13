export const PREFIX = 'http://localhost:3333';

//GET REQUEST
export const getData = async (path, token) => {
  const url = PREFIX + path;
  try {
    // Send GET request to server with user token
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authentication: 'Bearer ' + token,
      },
    });
    const data = await response.json();

    //Check if response ok or not
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
//POST REQUEST
export const postData = async (path, token, value) => {
  const url = PREFIX + path;
  try {
    // Send POST request to server with user token
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: 'Bearer ' + token,
      },
      body: JSON.stringify(value),
    });
    const data = await response.json();

    //Check if response ok or not
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
