import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";

export const CharacterContext = createContext();

export const CharacterContextProvider = ({ children }) => {
  const BeersApi = "https://api.punkapi.com/v2/beers";

  const fetchDataById = async () => {
    const response = await fetch(BeersApi);
    const jsonData = await response.json();
    return jsonData;
  };

  const { data: BeersData, isLoading } = useQuery({
    queryKey: ["beersChars"],
    queryFn: () => fetchDataById(),
  });

  const contextValues = {
    BeersData,
    isLoading,
  };

  return (
    <CharacterContext.Provider value={{ ...contextValues }}>
      {children}
    </CharacterContext.Provider>
  );
};