import { createSlice } from "@reduxjs/toolkit";

const defaultValue = {
  logout_type: false,
  email_id: "",
  remember_me: null,
  social_login_keys: null,
  redirect_type: false,
  redirect_tab_setting: "",
  score_checkbox: false,
};

export const utilsSlice = createSlice({
  name: "utils",
  initialState: {
    ...defaultValue,
  },
  reducers: {
    setValue: (state, action) => {
      state[action.payload.label] = action.payload.value;
    },
    setScoreCheckBox: (state, action) => {
      state.score_checkbox = action.payload;
    },
  },
});

export const { setValue, setScoreCheckBox } = utilsSlice.actions;

export default utilsSlice.reducer;
