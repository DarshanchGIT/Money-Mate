import axios from "axios";
const backendURL = import.meta.env.VITE_APP_BACKEND_URL;

const getUserBalance = async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    const response = await axios.get(`${backendURL}/account/balance`, {
      headers: {
        Authorization: authToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user's balance:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const transferFunds = async ({ receiverId, amount }) => {
  try {
    const authToken = localStorage.getItem("authToken");
    const response = await axios.post(
      `${backendURL}/account/transfer`,
      {
        amount,
        reciever: receiverId,
      },
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error transferring funds",
      error.response?.data || error.message
    );
    throw error;
  }
};

export { getUserBalance, transferFunds };
