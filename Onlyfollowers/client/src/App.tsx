import LandingPage from "./components/pages/LandingPage"
import LoginPage from "./components/pages/LoginPage"
import SignupPage from "./components/pages/SignupPage ";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/ui/ProtectRoute";
import UnprotectedRoute from "./components/ui/UnprotectRoute";
import Home from "./components/pages/Home";
import Explore from "./components/pages/Explore";
import Notification from "./components/pages/Notification";
import Dashboard from "./components/pages/Dashboard";
import Post from "./components/pages/Post";
import Library from "./components/pages/Library";
function App() {
  return (
    <>
        <Router>
    <div className="relative w-full">
      
          <Routes>
          <Route element={<UnprotectedRoute/>}>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          </Route>
          <Route element={<ProtectRoute/>}>
          <Route path="/home" element={<Home/>}/>      
          <Route path="/explore" element={<Explore/>}/>    
          <Route path="/notification" element={<Notification/>}/> 
          <Route path= "/:username" element={<Dashboard/>}/>
          <Route path="/post" element={<Post/>}/>
          <Route path="/library" element={<Library/>}/>
          </Route>
          </Routes>
      

      
      </div>
    
    
        </Router>
    </>
  )
}

export default App