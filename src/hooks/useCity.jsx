import { BASE_GEO } from "../API/API";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchData";

const useCity = (city, count = 1, language = 'en') => {
    const res  = useQuery({
        queryKey: ['city', city, count, language],

        queryFn: () => fetchData(BASE_GEO, 'search', {
            name: city,
            count: count,
            language: language,
            format: 'json',
        }),
        enabled: !!city && city.length > 0,
        staleTime: 1000 * 60 * 5, 
        
        retry: 1, 
    });
    return res;
};

export { useCity };