import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>Контакты:</p>
                <p>Email: info@info.com | Телефон: +7 (777) 777-77-77</p>
                <p>Следите за нами:</p>
                <a href="https://vk.com" target="_blank" rel="noopener noreferrer">ВКонтакте </a>
                <a href="https://telegram.com" target="_blank" rel="noopener noreferrer">Telegram</a>
                <p>© 2024 Экопросвет. Все права защищены.</p>
            </div>
        </footer>

    );
}
