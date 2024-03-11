import React, { useContext, useState } from "react";

const MarketContext = React.createContext();



export const MarketProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([]);


  return (
    <AuthContext.Provider
      value={{ shoppingCart, setShoppingCart }}
    >
      {children}
    </AuthContext.Provider>
  );
};