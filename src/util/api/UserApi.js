import axios from 'axios';
const UserApi = {
  get: async (url = '') => {
    const res = await fetch(url);
    return res.json();
  },
  post: async (url, data) => {
    const config = {
      method: 'POST',
       headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:(data)
    };
    const res = await axios.post(url, config);
    return res.data;
  },
};
export default UserApi;
