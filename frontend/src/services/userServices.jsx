import axios from "axios";
const backendURL = import.meta.env.VITE_APP_BACKEND_URL;

const GetUsers = async ({ filter }) => {
  try {
    const authToken = localStorage.getItem("authToken");
    const response = await axios.get(
      `${backendURL}/user/bulk?filter=` + filter,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    return response.data.user;
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const FetchCurrentUser = async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    const response = await axios.get(`${backendURL}/user/me`, {
      headers: {
        Authorization: authToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching current user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export { GetUsers, FetchCurrentUser };
