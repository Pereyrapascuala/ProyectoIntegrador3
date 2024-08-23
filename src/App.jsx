import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home  from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>

    </Router>

);
export default App;