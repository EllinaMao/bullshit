import "./App.css";
import UserProfile from "./components/UserProfile.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <UserProvider>
        <UserProfile />
      </UserProvider>
      <ToastContainer />
    </>
  );
}

export default App;
