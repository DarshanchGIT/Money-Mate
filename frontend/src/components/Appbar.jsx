import { Avatar, AvatarFallback } from "../components/ui/avatar";
import PropTypes from "prop-types";

export default function Appbar({ currentUser }) {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">MoneyMate</h1>
        <div className="flex items-center space-x-4">
          <span>Hello, {currentUser.name}</span>
          <Avatar>
            <img
              src={currentUser.avatar}
              alt={`${currentUser.name}'s Avatar`}
              className="w-full h-full rounded-full object-cover"
            />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

Appbar.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
};
