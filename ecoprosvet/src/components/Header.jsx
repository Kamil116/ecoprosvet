import './Header.css'

export default function Header() {
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
                <button className="auth-button">Войти</button>
            </div>
        </header>
    );
}
