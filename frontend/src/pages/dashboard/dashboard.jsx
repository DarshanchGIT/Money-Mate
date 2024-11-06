// src/pages/Dashboard.jsx
import BalanceCard from "../../components/BalanceCard";
import Appbar from "../../components/Appbar";
import Users from "../../components/User";
import useCurrentUser from "../../hooks/useCurrentUser";

const Dashboard = () => {
  const currentUser = useCurrentUser();
  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar currentUser={currentUser} />
      <main className="container mx-auto px-4 py-8">
        <BalanceCard currentUser={currentUser} />
        <Users />
      </main>
    </div>
  );
};

export default Dashboard;
