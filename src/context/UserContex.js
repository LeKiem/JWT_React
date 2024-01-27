import React, { useState, useEffect } from "react";
import { getUserAccount } from "../services/userService";
const UserContext = React.createContext(null);
const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthnticated: false,
    token: "",
    account: {},
  });

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser(userData);
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      name: "",
      auth: false,
    }));
  };
  const fetchuser = async () => {
    let response = await getUserAccount();
    if (response && response.EC === 0) {
      let groupWithRoles = response.DT.groupWithRoles;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.access_token;
      let data = {
        isAuthnticated: true,
        token: token,
        account: { groupWithRoles, email, username },
      };
      setUser(data);
    }
  };
  useEffect(() => {
    fetchuser();
  }, []);
  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
