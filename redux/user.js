const { createSlice } = require("@reduxjs/toolkit");

const user = createSlice({
  name: "user",
  initialState: {
    isLoggin: false,
    user: {},
  },
  reducers: {
    setState: (state, { payload }) => {
      if (payload) {
        state.isLoggin = true;
        state.user = payload;
      } else {
        state.isLoggin = false;
        state.user = {};
      }
    },
  },
});

export const { setState } = user.actions;
export default user.reducer;
