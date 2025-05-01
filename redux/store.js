const { configureStore } = require("@reduxjs/toolkit");
import user from "@/redux/user.js";
import dashboard from "./dashboard.js";
const store = configureStore({
  reducer: {
    user,
    dashboard,
  },
});

export default store;
