import { weatherMap, UNKNOWN_ICON } from "./weatherMap.js";

export const getWeatherIconName = (code, isDay) => {
  const config = weatherMap[code];

  if (!config) return UNKNOWN_ICON;

  return isDay === 1 ? config.d : config.n;
};
