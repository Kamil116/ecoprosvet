import './App.css';
import MainPage from "./components/MainPage";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import AddEvent from "./components/AdminPanel/AddEvent";
import ManageEvents from "./components/AdminPanel/ManageEvents";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/add_event" element={<AddEvent/>}/>
                    <Route path="/manage" element={<ManageEvents/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
