import Navbar from "./components/Navbar.jsx"
import {Routes,Route,Navigate} from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useThemeStore } from "./store/useThemeStore.js";
import { useEffect } from "react";
import {Fan} from "lucide-react"
import { Toaster } from "react-hot-toast";




const App = () => {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();
  const {theme} = useThemeStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth]);


  console.log({authUser});

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Fan className="size-20 animate-spin text-accent" />
      </div>
    );


  return (

    <div>
      <div data-theme={theme}>
      <Navbar />


      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={ authUser ? <ProfilePage /> : <Navigate to="/login"/>} />
      </Routes>

      
      <Toaster />

      </div>
    </div>
  )
}

export default App