const userApi = {
  signIn: (payload) => {
    const url = 'http://localhost:3333'+'/signin';
    return axiosClient.post(url, payload);
  },

  getMe : async (payload) => {
    const url = '/me';
    const response = await axiosClient.get(url, payload);
    return response.data;
  }
}

export default userApi;