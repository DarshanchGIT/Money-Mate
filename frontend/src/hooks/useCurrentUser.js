import { useState, useEffect } from "react";
import { FetchCurrentUser } from "../services/userServices";
import { getUserBalance } from "../services/accountServices";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState({
    name: "John Doe",
    balance: 5000.0,
    avatar:
      "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDetailsResponse = await FetchCurrentUser();
        const userBalanceResponse = await getUserBalance();

        const userDetails = userDetailsResponse.user;
        const userBalance = userBalanceResponse.balance;

        setCurrentUser({
          name: `${userDetails.firstName} ${userDetails.lastName}`,
          username: userDetails.username,
          balance: userBalance,
          avatar:
            "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
        });
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    getUserData();
  }, []);

  return currentUser;
};

export default useCurrentUser;
