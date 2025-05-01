import axios from "axios";
import { APIURL, CREDENTIALS } from "./reqParams";
import { getRandomAvatar } from "@/public/avatars/avatar";
import { errorNotifcation } from "@/components/toast";

const authUrl = `${APIURL}/api/auth`;

export function googleAuth() {
  window.open(`${APIURL}/google/callback`, "_self");
}

export async function signup(email, password) {
  try {
    const avatar = getRandomAvatar();
    if (!email || !password) {
      errorNotifcation("all inputs are required");
      return { status: 10 };
    }
    const { data, status } = await axios.post(
      `${authUrl}/signup`,
      {
        email,
        password,
        picture: avatar,
      },
      CREDENTIALS
    );
    return { data, status };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    const { data, status } = error.response;
    return { data, status };
  }
}

export async function login(username, password) {
  try {
    if (!username || !password) {
      errorNotifcation("all inputs are required");
      return { status: 10 };
    }
    const { data, status } = await axios.post(
      `${authUrl}/login`,
      {
        username,
        password,
      },
      CREDENTIALS
    );
    return { data, status };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    const { data, status } = error.response;
    return { data, status };
  }
}
export async function isLoggin() {
  try {
    const res = await axios.get(`${authUrl}/isLoggin`, CREDENTIALS);
    const { data, status } = res;
    return { data, status };
  } catch (error) {
    console.log("isloogin error : ", error);
    if (!error.response) return { status: 10 };
    const { data, status } = error.response;
    return { data, status };
  }
}
export async function logOut() {
  try {
    await axios.get(`${authUrl}/logout`, CREDENTIALS);
  } catch (error) {
    console.log(error);
  }
}
