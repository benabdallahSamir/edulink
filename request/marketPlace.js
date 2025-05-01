import axios from "axios";
import { APIURL, CREDENTIALS } from "./reqParams";

export async function getServices() {
  try {
    const { status, data } = await axios.get(
      `${APIURL}/marketplace`,
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

export async function addService(formdata) {
  try {
    const { status, data } = await axios.post(
      `${APIURL}/marketplace`,
      formdata,
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

export async function getServiceById(id) {
  try {
    const { status, data } = await axios.get(
      `${APIURL}/marketplace/${id}`,
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


export async function approvedOffer(serviceId , offerId) {
  try {
    const { status, data } = await axios.put(
      `${APIURL}/marketplace/aprroved`,
      {serviceId , offerId},
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


export async function addOffer({serviceId,message}) {
  console.log(serviceId)
  try {
    const { status, data } = await axios.post(
      `${APIURL}/marketplace/addOffer`,
      {serviceId,message},
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

export async function myServices() {
  try {
    const { status, data } = await axios.get(
      `${APIURL}/marketplace/mine`,
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

export async function myProposal() {
  try {
    const {status , data} = await axios.get(`${APIURL}/marketplace/offers`,CREDENTIALS)
    return {status , data}
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    return { status: error.response.status, data: error.response.data };
  }
}
