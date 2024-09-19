import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Blog.css';

// Компонент для статьи
function Article({title, image, content, author}) {
    return (
        <div className="article">
            <img className="article__image" src={image} alt={title}/>
            <h4>{title}</h4>
            <p>{content}</p>
            <p className="article__author">Автор статьи: {author}</p>
        </div>
    );
}

function Blog() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('Все');
    // Состояние для хранения статей
    const [articles, setArticles] = useState([
        {
            title: "Как уменьшить использование пластика",
            image: "https://i.pinimg.com/736x/09/d4/06/09d40688064cca28fc2bef6050d69583.jpg",
            content: "Использование пластика наносит огромный вред окружающей среде. В статье рассматриваются способы уменьшения потребления пластика в повседневной жизни.",
            author: "Бенджамин Франклин",
            category: "Охрана природы"
        },
        {
            title: "Почему важно сохранять леса",
            image: "https://fs.cap.ru/file/sVPy0ep4fm0YhwchtFEVmmHCZGX0nIhS?i=26",
            content: "Леса играют ключевую роль в поддержании экологического баланса. Узнайте, как их вырубка влияет на климат и биоразнообразие.",
            author: "Берек Муберек",
            category: "Устойчивое развитие"
        },
        {
            title: "Энергия ветра: перспективы",
            image: "https://s0.rbk.ru/v6_top_pics/media/img/5/76/755904825409765.jpg",
            content: "Ветроэнергетика становится все более популярной альтернативой ископаемым видам топлива. Обзор преимуществ и вызовов ветроэнергетики.",
            author: "Вася Покер",
            category: "Энергия"
        },
    ]);

    // Состояние для поля поиска
    const [searchQuery, setSearchQuery] = useState('');

    // Фильтрация статей на основе запроса поиска и выбранной категории
    const filteredArticles = articles.filter(article =>
        (selectedCategory === 'Все' || article.category === selectedCategory) &&
        (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.content.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="Blog">
            <button className="back-button" onClick={() => navigate('/')}>Назад</button>
            <h1>Экологический блог</h1>
            <div className="top">
                <ul className="tags">
                    <li
                        className={selectedCategory === 'Все' ? 'active' : ''}
                        onClick={() => setSelectedCategory('Все')}
                    >
                        Все
                    </li>
                    <li
                        className={selectedCategory === 'Загрязнение' ? 'active' : ''}
                        onClick={() => setSelectedCategory('Загрязнение')}
                    >
                        Загрязнение
                    </li>
                    <li
                        className={selectedCategory === 'Охрана природы' ? 'active' : ''}
                        onClick={() => setSelectedCategory('Охрана природы')}
                    >
                        Охрана природы
                    </li>
                    <li
                        className={selectedCategory === 'Устойчивое развитие' ? 'active' : ''}
                        onClick={() => setSelectedCategory('Устойчивое развитие')}
                    >
                        Устойчивое развитие
                    </li>
                    <li
                        className={selectedCategory === 'Энергия' ? 'active' : ''}
                        onClick={() => setSelectedCategory('Энергия')}
                    >
                        Энергия
                    </li>
                </ul>
                <input
                    className="search-input"
                    placeholder="Поиск по статьям"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Обновляем состояние при вводе
                />
            </div>

            <div className="content">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article, index) => (
                        <Article
                            key={index}
                            title={article.title}
                            image={article.image}
                            content={article.content}
                            author={article.author}
                        />
                    ))
                ) : (
                    <p>Ничего не найдено</p>
                )}
            </div>

            <ul className="pagination">
                <li>1</li>
                <li className="active">2</li>
                <li>3</li>
            </ul>
        </div>
    );
}

export default Blog;