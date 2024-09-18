import './Header.css'
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Header() {
    let navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function handleLogout() {
        localStorage.removeItem('loggedIn');
        setIsLoggedIn(false);
        window.location.reload();
    }

    useEffect(() => {
        // Check if user is logged in by checking localStorage
        const user = localStorage.getItem('loggedIn');
        if (user) {
            setIsLoggedIn(true);
        }
        console.log(user)
    }, []);

    return (
        <header className="header">
            <div className="header-logo">
                <a href="/">Экопросвет</a>
            </div>
            <nav className="header-nav">
                <a href='/'>Карта событий</a>
                <a href='/blog'>Блог</a>
            </nav>
            <div className="header-auth">
                {isLoggedIn ? (
                    <button className="auth-button" onClick={handleLogout}>Выйти</button>
                ) : (
                    <button className="auth-button" onClick={() => navigate('/login')}>Войти</button>
                )}

            </div>
        </header>
    );
}
