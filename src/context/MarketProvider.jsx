import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const MarketContext = React.createContext();

export const MarketProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([]);

  const authContext = useContext(AuthContext);

  return (
    <AuthContext.Provider value={{ shoppingCart, setShoppingCart }}>
      {children}
    </AuthContext.Provider>
  );
};
