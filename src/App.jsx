
import './App.css'
import WeatherPage from './pages/WeatherPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
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