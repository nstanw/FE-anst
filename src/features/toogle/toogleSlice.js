import { createSlice } from '@reduxjs/toolkit';

const ToogleSlice = createSlice({
  name: 'ToogleSlice',
  initialState: {
    status: false,
    feedback: true,
    form: false,
    task: {
      name: 'Task...',
      time: 25,
    },
    active: {
      toogle: 'active',
      youtube: '',
      image: '',
    },
    youtube: {
      autoplay: false,
    },
    image: {
      link: '',
    },
    showStudy: true,
  },
  reducers: {
    reset: (state, action) => {
      state.status = false;
      state.feedback =  true; 
      state.showStudy = true;
    },
    hideStudy: (state, action) => {
      state.showStudy = false;
    },
    mode: (state) => {
      state.status = !state.status;
    },
    modeOff: (state) => {
      state.status = false;
    },
   Feedback: (state) => {
      state.feedback =  !state.feedback;
    },
   hidenFeedback: (state) => {
      state.feedback =  false;
    },
    activeYoutube: (state) => {
      state.active.youtube = 'active';
      state.active.toogle = '';
      state.active.image = '';
    },
    activeImage: (state) => {
      state.active.youtube = '';
      state.active.toogle = '';
      state.active.image = 'active';
    },
    activeToogle: (state) => {
      state.active.youtube = '';
      state.active.toogle = 'active';
      state.active.image = '';
    },
    linkYoutube: (state, action) => {
      state.youtube.link = action.payload.link;
      state.youtube.autoplay = action.payload.autoplay;
    },
    changeImage: (state,action) =>{
      state.image = action.payload;
    },
    
  },
});

export const actions = ToogleSlice.actions;
const toogle = ToogleSlice.reducer;
export default toogle;
