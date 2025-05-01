const { createSlice } = require("@reduxjs/toolkit");

const dashboard = createSlice({
  initialState: {
    Mycourses: [],
    courses: [],
    favoriteCourse: [],
    wishlistCourse: [],
  },
  name: "dashboard",
  reducers: {
    initCourses: (state, { payload: courses }) => {
      state.courses = courses;
    },
    initMyCourses: (state, { payload: Mycourses }) => {
      state.Mycourses = Mycourses;
    },
    initFavCourses: (state, { payload: courses }) => {
      state.favoriteCourse = courses;
    },
    initWishlistCourses: (state, { payload: courses }) => {
      state.wishlistCourse = courses;
    },
    toggleFavorite: (state, { payload }) => {
      try {
        const { favoriteCourse } = state;
        let removed = false;
        const result = favoriteCourse.filter((ele) => {
          if (ele.id === payload.id) {
            removed = true;
          }
          return ele.id !== payload.id;
        });
        if (removed) {
          state.favoriteCourse = result;
        } else {
          state.favoriteCourse = [...favoriteCourse, payload];
        }
      } catch (error) {
        console.log(error);
      }
    },
    deleteCourse: (state, { payload }) => {
      try {
        const { Mycourses: courses } = state;
        state.Mycourses = courses.map((ele) => {
          if (ele.id === payload) return { ...ele, visible: false };
          return ele;
        });
      } catch (error) {
        console.log(error);
      }
    },
    addCourse: (state, { payload }) => {
      try {
        const { Mycourses: courses } = state;
        state.Mycourses = courses.map((ele) => {
          if (ele.id === payload) return { ...ele, visible: true };
          return ele;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
export const {
  toggleFavorite,
  initMyCourses,
  initCourses,
  deleteCourse,
  addCourse,
  initFavCourses,
  initWishlistCourses,
} = dashboard.actions;
export default dashboard.reducer;
