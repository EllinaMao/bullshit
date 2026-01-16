import { createContext, useState } from "react";

const defaultWeatherContext = {
  location: null,
  isResultVisible: false,
  handleLocationFound: () => {},
  hideResult: () => {},
};

export const WeatherContext = createContext(defaultWeatherContext);

export const WeatherProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [isResultVisible, setIsResultVisible] = useState(false);

  const handleLocationFound = (data) => {
    setLocation(data);
    setIsResultVisible(true);
  };

  const hideResult = () => {
    setIsResultVisible(false);
  };
  return (
    <WeatherContext.Provider
      value={{
        location,
        isResultVisible,
        handleLocationFound,
        hideResult,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
