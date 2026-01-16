import { createContext, useState } from "react";

const defaultUserData = {
    username: "Tom",
    age: 25,
    email: "tom@gmail.com",
    gender: "Helicopter"
};

export const UserContext = createContext({
    user: defaultUserData,
    setUser: () => {} 
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(defaultUserData);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
