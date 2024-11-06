import { Card, CardContent } from "../components/ui/card";
import PropTypes from "prop-types";

export default function BalanceCard({ currentUser }) {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-2">Your Balance</h2>
        <p className="text-3xl font-bold">${currentUser.balance.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
}
BalanceCard.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
};
