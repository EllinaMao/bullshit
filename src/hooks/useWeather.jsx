import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchData";
import { BASE_WEATHER } from "../API/API";

const useWeather = (latitude, longitude) => {
    return useQuery({
        queryKey: ['weather', latitude, longitude],
        queryFn: () => fetchData(BASE_WEATHER, 'forecast', {
            latitude: latitude,
            longitude: longitude,
            currentWeather: true,
        }),
        enabled: latitude != null && longitude != null,
    });
};

export { useWeather };