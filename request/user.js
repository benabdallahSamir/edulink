import axios from "axios";
import { APIURL, CREDENTIALS } from "./reqParams";

export async function getDashboard() {
  try {
    const { data, status } = await axios.get(
      `${APIURL}/user/dashboard`,
      CREDENTIALS
    );
    return { data, status };
  } catch (error) {
    if (!error.response) return { status: 10 };
    return { data: error.response.data, status: error.response.status };
  }
}

export async function updateUser(userinfo) {
  try {
    const { status, data } = await axios.put(
      `${APIURL}/user`,
      userinfo,
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    return { status: error.response.status, data: error.response.data };
  }
}
export async function updateProfileImage(img) {
  try {
    const { status, data } = await axios.put(
      `${APIURL}/user/profileImage`,
      img,
      {
        withCredentials: true,
      }
    );
    return {status , data}
  } catch (error) {
    console.log(error);
    if (!error.response) return {status : 10}
    return {
      status : error.response.status,
      data : error.response.data
    }
  }
}
