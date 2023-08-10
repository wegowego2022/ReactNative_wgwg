import {createSlice} from '@reduxjs/toolkit';

const initialState = { //초기 상태
  name: '',
  email: '',
  accessToken: '',
  refreshToken: '',
  profilepicture: '../../assets/images/more/profile-gray.png',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.profilepicture = action.payload.profilepicture;
    },
  },
  extraReducers: builder => {},
});

export default userSlice;