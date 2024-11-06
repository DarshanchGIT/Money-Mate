import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { transferFunds } from "../../services/accountServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReceiverLogo = ({ initial }) => (
  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-3xl mb-4">
    {initial}
  </div>
);

export default function Send() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const [successMessage, setSuccessMessage] = useState("");

  const receiverId = searchParams.get("id");
  const receiverName = searchParams.get("name") || "Unknown";
  const receiverInitial = receiverName.charAt(0).toUpperCase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await transferFunds({ receiverId, amount });
      setSuccessMessage(`Successfully sent $${amount} to ${receiverName}`);
      toast.success("Transaction successfully", { autoClose: 2000 });
      setError("");
      setAmount("");
    } catch (e) {
      console.error(e);
      toast.error("Transaction failed", { autoClose: 2000 });
      setError("Error transferring funds.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Money Mate</h1>
        <p className="text-xl text-muted-foreground">
          Your Friendly Financial Companion
        </p>
      </div>

      <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <ReceiverLogo initial={receiverInitial} />
            <div className="ml-4 text-left">
              <CardTitle className="text-2xl font-bold pb-1">
                Send Money
              </CardTitle>
              <p className="text-xl text-muted-foreground">
                To: {receiverName}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <Button className="w-full" type="submit" disabled={!amount}>
              Send Money
            </Button>
          </form>
          {successMessage && (
            <div className="mt-4 text-green-600 text-center">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="mt-4 text-red-600 text-center">{error}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

ReceiverLogo.propTypes = {
  initial: PropTypes.string,
};
