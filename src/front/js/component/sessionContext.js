import React, { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export const useSession = () => {
    return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState(null);

    return (
        <SessionContext.Provider value={{ userEmail, setUserEmail }}>
            {children}
        </SessionContext.Provider>
    );
};
