
import './App.css'
import WeatherPage from './pages/WeatherPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // retry: 1,
      staleTime: 1000 * 60 * 50,
    },
  },
})

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WeatherPage />
      </QueryClientProvider>
    </>
  )
}

export default App;


 
// import { useQuery } from "@tanstack/react-query";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 
// function App() {
//   return (
//     <div>
//       <QueryClientProvider client={queryClient}>
//         <div className="p-6 space-y-4">
//           <h1 className="text-2xl font-bold">React Query Example</h1>
//           <Posts />
//         </div>
//         {/* <ReactQueryDevtools initialIsOpen={false} /> */}
//       </QueryClientProvider>
//     </div>
//   );
// }
 
// // Создаем экземпляр QueryClient
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 5, // Кэш будет свежим 5 минут
//     },
//   },
// });
 
// async function fetchPosts() {
//   const res = await fetch(
//     "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true"
//   );
//   if (!res.ok) throw new Error("Failed to fetch posts");
//   return res.json();
// }     
 
// function Posts() {
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["weather"],
//     queryFn: fetchPosts,
//   });
 
//   if (isLoading) return <p>Loading weather...</p>;
//   if (isError) return <p>Error: {error.message}</p>;
 
//   return (
//     <div className="p-4 border rounded shadow">
//       <h2 className="text-lg font-semibold">Current Weather</h2>
//       {data.current_weather ? (
//         <div>
//           <p>Temperature: {data.current_weather.temperature}°C</p>
//           <p>Wind Speed: {data.current_weather.windspeed} km/h</p>
//           <p>Weather Code: {data.current_weather.weathercode}</p>
//         </div>
//       ) : (
//         <p>No weather data available</p>
//       )}
//     </div>
//   );
// }
 
// export default App;


 