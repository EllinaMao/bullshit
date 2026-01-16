import { createContext, useState } from "react";

const defaultUserContext = {
    username: "Tom",
    age: 25,
    email: "tom@gmail.com",
    gender:"Helicopter"
};


export const UserContext = createContext({
    user: defaultUserContext,
    setUser: () => {} 
});


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(defaultUserContext);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};