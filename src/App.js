import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AllUsers, Details, Favorites, Home, Login, NotAdmin, NotLogin, Profile, Register, Welcome } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/allusers" element={<AllUsers />} />
        <Route path="/details" element={<Details />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notadmin" element={<NotAdmin />} />
        <Route path="/notLogin" element={<NotLogin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </div>
  );
}

export default App;
