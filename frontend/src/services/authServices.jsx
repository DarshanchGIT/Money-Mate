import axios from "axios";

// const userBackendURL = "http://localhost:3000/api/v1/user";
const backendURL = import.meta.env.VITE_APP_BACKEND_URL;

const SignUp = async ({ firstName, lastName, email, password }) => {
  try {
    const response = await axios.post(`${backendURL}/user/signup`, {
      username: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });

    const token = response.data.token;
    if (token) {
      localStorage.setItem("authToken", token);
    }

    return response.data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data || error.message);
    throw error;
  }
};

const SignIn = async ({ email, password }) => {
  try {
    const response = await axios.post(`${backendURL}/user/signin`, {
      username: email,
      password: password,
    });

    const token = response.data.token;
    if (token) {
      localStorage.setItem("authToken", token);
    }
    return response.data;
  } catch (error) {
    console.error("Signin Error:", error.response?.data || error.message);
    throw error;
  }
};

export { SignUp, SignIn };
