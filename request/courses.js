import axios from "axios";
import { APIURL, CREDENTIALS } from "./reqParams";

export async function bestCourses(count = 5) {
  if (count === 0)
    return {
      status: 10,
    };
  try {
    const { status, data } = await axios.get(
      `${APIURL}/course/bestCourses/${count}`,
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    if (!error.response) return { status: 10 };
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
}
export async function setFavoriteCourse(courseId) {
  try {
    const { data, status } = await axios.put(
      `${APIURL}/course/favorite/${courseId}`,
      {},
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
}
export async function getCourse(courseId) {
  try {
    const { data, status } = await axios.get(
      `${APIURL}/course/${courseId}`,
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
}
export async function buyNewCourse(courseId) {
  try {
    const { status, data } = await axios.post(
      `${APIURL}/studient/${courseId}`,
      {},
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    if (!error.response) return { status: 10 };
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
}
export async function search(value) {
  try {
    const { status, data } = await axios.get(
      `${APIURL}/course/search/${value}`
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    if (error.response)
      return { status: error.response.status, data: error.response.data };
    return { status: 10 };
  }
}
export async function submitQueez(quizAnswer, courseId, chapterNumber) {
  try {
    const { status, data } = await axios.put(
      `${APIURL}/course/submitquize`,
      { quizeResult: quizAnswer, courseId, chapterNumber },
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    return { status: error.response.status, data: error.response.data };
  }
}
export async function handleReview(message, star, courseId) {
  try {
    const { status, data } = await axios.post(
      `${APIURL}/review`,
      {
        message,
        star,
        courseId,
      },
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
}
export async function getReview(courseId) {
  try {
    const { status, data } = await axios.get(
      `${APIURL}/review/${courseId}`,
      {},
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
}
export async function createCourse(formdata) {
  try {
    const { status, data } = await axios.post(`${APIURL}/course`, formdata, {
      withCredentials: true,
    });
    console.log(status, data);
    return { status, data };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
}
export async function getMyCourseReview(courseId) {
  try {
    const { status, data } = await axios.get(
      `${APIURL}/review/mine/${courseId}`,
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    return { status: error.response.status, data: error.response.data };
  }
}
export async function getMyCourseProgress(courseId) {
  try {
    const { status, data } = await axios.get(
      `${APIURL}/course/progress/${courseId}`,
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    return { status: error.response.status, data: error.response.data };
  }
}
export async function hideCourse(courseId) {
  try {
    const { status, data } = await axios.delete(
      `${APIURL}/course/${courseId}`,
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    return { status: error.response.status, data: error.response.data };
  }
}
export async function enableCourse(courseId) {
  try {
    const { status, data } = await axios.patch(
      `${APIURL}/course/${courseId}`,
      {},
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    return { status: error.response.status, data: error.response.data };
  }
}
export async function updateCourse(formdata, courseId) {
  try {
    const { status, data } = await axios.put(
      `${APIURL}/course/${courseId}`,
      formdata,
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    if (!error.response) return { status: 10 };
    return { status: error.response.status, data: error.response.data };
  }
}
export async function updateIntorductinoCourse(formdata, courseId) {
  try {
    const { status, data } = await axios.put(
      `${APIURL}/course/introduction/${courseId}`,
      formdata,
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    if (!error.response) return { status: 10 };
    return { status: error.response.status, data: error.response.data };
  }
}
export async function updateChapterCourse(formdata, courseId) {
  try {
    const { status, data } = await axios.put(
      `${APIURL}/course/chapter/${courseId}`,
      formdata,
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    return { status: error.response.status, data: error.response.data };
  }
}
export async function deleteCourseChapter(chapterNumber, courseId) {
  try {
    const { status, data } = await axios.delete(
      `${APIURL}/course/chapter/${courseId}/${chapterNumber}`,
      // { chapterNumber },
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    return { status: error.response.status, data: error.response.data };
  }
}

export async function updateQuize(allquiz ,chapterNumber, courseId) {
  try {
    const { status, data } = await axios.put(
      `${APIURL}/course/quize/${courseId}/${chapterNumber}`,
      { allquiz },
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    return { status: error.response.status, data: error.response.data };
  }
}