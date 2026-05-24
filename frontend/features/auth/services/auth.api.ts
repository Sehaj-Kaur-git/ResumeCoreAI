import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:3000", 
  withCredentials: true,
});

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}


export async function register(data: RegisterData) {
  try {
    const response = await api.post("/api/auth/register", data);
    return response.data;
  } catch (err: any) {
    console.log(err?.response?.data || err.message);
    throw err;
  }
}


export async function login(data: LoginData) {
  try {
    const response = await api.post("/api/auth/login", data);
    return response.data;
  } catch (err: any) {
    console.log(err?.response?.data || err.message);
    throw err;
  }
}


export async function logout() {
  try {
    const response = await api.get("/api/auth/logout");
    return response.data;
  } catch (err: any) {
    console.log(err?.response?.data || err.message);
    throw err;
  }
}

export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me");
    return response.data;
  } catch (err: any) {
    console.log(err?.response?.data || err.message);
    throw err;
  }
}