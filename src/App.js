import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AddFood, AllUsers, Details, Favorites, FoodList, Home, Login, Profile, Register, Welcome } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/allusers" element={<AllUsers />} />
        <Route path="/details" element={<Details />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/addfood" element={<AddFood />} />
        <Route path="/foodlist" element={<FoodList />} />
      </Routes>
    </div>
  );
}

export default App;
