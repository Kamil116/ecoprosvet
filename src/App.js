import './App.css';
import MainPage from "./components/MainPage";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import AddEvent from "./components/AdminPanel/AddEvent";
import ManageEvents from "./components/AdminPanel/ManageEvents";
import Blog from "./components/Blog";
import SuperAdminPage from "./components/SuperAdmin/SuperAdmin";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/blog" element={<Blog/>}/>
                    <Route path="/add_event" element={<AddEvent/>}/>
                    <Route path="/manage" element={<ManageEvents/>}/>
                    <Route path="/check" element={<SuperAdminPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
