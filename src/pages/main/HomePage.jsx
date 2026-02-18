{/* Вынести иконки в отдельный файл*/}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState(''); {/* при нажатии на поиск скролинг в секцию тем*/}
  const [selectedCategory, setSelectedCategory] = useState('all');

  {/* плашки категорий -> секция категорий*/}{/* перенос в бд*/}
  const categories = [
    { id: 'all', name: 'Все разделы', icon: '📚' },
    { id: 'pathology', name: 'Общая патология', icon: '🔬' },
    { id: 'systems', name: 'Системные расстройства', icon: '🧬' },
    { id: 'organs', name: 'Органная патология', icon: '❤️' },
    { id: 'molecular', name: 'Молекулярные механизмы', icon: '⚛️' }
  ];

  {/* плашки тем -> секция тем*/}{/* перенос в бд*/}
  const featuredTopics = [
    { id: 1, title: 'Воспаление', category: 'pathology', image: '🦠', desc: 'Молекулярные механизмы воспалительного ответа', path: 'inflammation' },
    { id: 2, title: 'Гипоксия', category: 'pathology', image: '💨', desc: 'Типы гипоксии и адаптационные механизмы', path: 'hypoxia' },
    { id: 3, title: 'Опухолевый рост', category: 'molecular', image: '🧫', desc: 'Канцерогенез и молекулярные основы', path: 'tumor' },
    { id: 4, title: 'Сердечная недостаточность', category: 'systems', image: '💔', desc: 'Механизмы декомпенсации', path: 'heart-failure' },
    { id: 5, title: 'Патология печени', category: 'organs', image: '🧪', desc: 'Цирроз и печеночная недостаточность', path: 'liver-pathology' },
    { id: 6, title: 'Атеросклероз', category: 'systems', image: '🩸', desc: 'Нарушения липидного обмена', path: 'atherosclerosis' }
  ];

  const filteredTopics = featuredTopics.filter(topic => {
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="atlas-container">
      {/* верхняя плашка*/}
      <header className="atlas-header">
        <div className="header-content">
          <div className="logo-section">
            <span className="logo-icon">📘</span>
            <h1 className="logo-title">Название<span>Атлас</span></h1>
          </div>
          <nav className="main-nav">
            <a href="#" className="nav-link active">Атлас</a>
            <a href="#" className="nav-link">Интерактив</a>
            <a href="#" className="nav-link">Тесты</a>
            <a href="#" className="nav-link">Симуляции</a>
            <a href="#" className="nav-link">Избранное</a>
          </nav>
          <button className="profile-btn">
            <span className="profile-icon">👤</span>
          </button>
        </div>
      </header>

      {/* главный банер*/}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">
            Интерактивный атлас<br />
            <span>патологической физиологии</span>
          </h2>
          <p className="hero-subtitle">
            Визуализация патологических процессов, 3D-модели и интерактивные схемы 
            для глубокого понимания механизмов заболеваний
          </p>
          <div className="hero-search">
            <input
              type="text"
              placeholder="Поиск по атласу (например, воспаление, гипоксия...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">250+</span> {/* сделать автоматический счетчик*/}
              <span className="stat-label">Тем</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1500+</span> {/* сделать автоматический счетчик*/}
              <span className="stat-label">Иллюстраций</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span> {/* сделать автоматический счетчик*/}
              <span className="stat-label">3D-моделей</span>
            </div>
          </div>
        </div>
      </section>

      {/* секция категорий */}
      <section className="categories-section">
        <h3 className="section-title">Разделы атласа</h3>
        <div className="categories-grid">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* секция тем */}
      <section className="topics-section">
        <div className="section-header">
          <h3 className="section-title">Популярные темы</h3>
          <a href="#" className="view-all">Смотреть все →</a>
        </div>
        <div className="topics-grid">
          {filteredTopics.map(topic => (
            <div key={topic.id} className="topic-card">
              <div className="topic-image">{topic.image}</div>
              <div className="topic-content">
                <h4 className="topic-title">{topic.title}</h4>
                <p className="topic-desc">{topic.desc}</p>
                <div className="topic-meta">
                  <span className="topic-category">
                    {categories.find(c => c.id === topic.category)?.name}
                  </span>
                  <span className="topic-interactive">Интерактив</span>
                </div>
                <Link to={`/topic/${topic.path}`} className="topic-btn">Изучить →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* возможности интерактивного атласа */}
      <section className="features-section">
        <h3 className="section-title">Возможности интерактивного атласа</h3>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🔄</span>
            <h4>3D-модели органов</h4>
            <p>Вращайте, приближайте и изучайте патологически измененные органы в реальном времени</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h4>Анимация процессов</h4>
            <p>Динамическая визуализация патогенеза заболеваний</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📊</span>
            <h4>Сравнительная гистология</h4>
            <p>Норма и патология бок о бок с детальным описанием</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🧪</span>
            <h4>Виртуальные эксперименты</h4>
            <p>Моделирование патофизиологических процессов</p>
          </div>
        </div>
      </section>

      {/* призыв к действию */}
      <section className="cta-section">
        <div className="cta-content">
          <h3>Начните исследование</h3>
          <p>Получите доступ ко всем разделам интерактивного атласа</p>
          <button className="cta-btn">Открыть атлас</button>
        </div>
      </section>

      {/* футер */}
      <footer className="atlas-footer">
        <div className="footer-content">
          <div className="footer-col">
            <h4>НазваниеАтласа</h4>
            <p>Интерактивный атлас по патологической физиологии для студентов и специалистов</p>
          </div>
          <div className="footer-col">
            <h4>Разделы</h4>
            <ul>
              <li><a href="#">Общая патология</a></li>
              <li><a href="#">Системные расстройства</a></li>
              <li><a href="#">Органная патология</a></li>
              <li><a href="#">Молекулярная патология</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Ресурсы</h4>
            <ul>
              <li><a href="#">Учебные модули</a></li>
              <li><a href="#">Тесты и задания</a></li>
              <li><a href="#">Виртуальная лаборатория</a></li>
              <li><a href="#">Справочник</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Контакты</h4>
            <ul>
              <li><a href="#">Поддержка</a></li>
              <li><a href="#">О проекте</a></li>
              <li><a href="#">Для преподавателей</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 НазваниеАтласа. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;