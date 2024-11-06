import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import { Search, Send } from "lucide-react";
import { GetUsers } from "../services/userServices";
import { SyncLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_APP_BACKEND_URL;

export default function Users() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounceTimeout = useRef(null);

  const fetchUsers = useCallback(async (filter = "") => {
    setLoading(true);
    console.log(url);

    try {
      const result = await GetUsers({ filter });
      setUsers(result || []);
      setError(null);
    } catch (e) {
      console.error("Error fetching users:", e);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // we don't want to lose the timeout ID between renders — we need it to clear the timeout properly if the user types more characters.
    // Using useRef, we:
    // Store the timeout ID in debounceTimeout.current.
    // Ensure the ID stays consistent between renders so that we can cancel the correct timeout if needed.
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchUsers(value);
    }, 300);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const toSendPage = useCallback(
    (user) => {
      const fullName = `${user.firstName} ${user.lastName}`;
      const userId = user._id;
      navigate(`/send?id=${userId}&name=${fullName}`);
    },
    [navigate]
  );

  const userList = useMemo(
    () =>
      users.map((user) => (
        <Card
          key={user._id}
          className="p-4 flex items-center justify-between mb-4"
        >
          <div className="flex items-center space-x-4">
            <Avatar className="bg-gray-200 w-12 h-12">
              <AvatarFallback className="text-xl font-bold">
                {user.firstName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-500">{user.username}</p>
            </div>
          </div>
          <Button size="sm" onClick={() => toSendPage(user)}>
            <Send className="mr-2 h-4 w-4" />
            Send Money
          </Button>
        </Card>
      )),
    [users, toSendPage]
  );

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Send Money</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for a user..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
            autoFocus
          />
        </div>
      </div>

      <ScrollArea className="h-[300px] rounded-md border flex items-center justify-center">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <SyncLoader />
          </div>
        ) : (
          userList
        )}
      </ScrollArea>
    </>
  );
}
