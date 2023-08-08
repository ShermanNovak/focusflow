import React, { ReactNode, createContext, useContext, useState } from "react";

// Create a context for user data
export const UserContext = createContext<any>(null);

// Create a custom hook to consume the context
export const useUserContext = () => useContext(UserContext);

// Create the UserProvider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children })=> {
  const [userData, setUserData] = useState<any>({});

  // Function to update user data
  const updateUser = (newData: any) => {
    setUserData((prevData: any) => ({ ...prevData, ...newData }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};