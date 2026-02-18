import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './InflammationPage.css';

const InflammationPage = () => {
  const [activeTab, setActiveTab] = useState('definition');
  const [activeStage, setActiveStage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Состояния для теста
  const [quizAnswers, setQuizAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: ''
  });
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const stages = [
    { name: 'Альтерация', icon: '💥', desc: 'Повреждение ткани, выделение медиаторов' },
    { name: 'Экссудация', icon: '🌊', desc: 'Выход жидкости и клеток крови в очаг' },
    { name: 'Пролиферация', icon: '🧫', desc: 'Разрастание ткани, заживление' }
  ];

  const mediators = [
    { name: 'Гистамин', source: 'Тучные клетки', effect: 'Расширение сосудов, повышение проницаемости' },
    { name: 'Простагландины', source: 'Многие клетки', effect: 'Боль, лихорадка, усиление воспаления' },
    { name: 'Лейкотриены', source: 'Лейкоциты', effect: 'Хемотаксис, бронхоспазм' },
    { name: 'Цитокины (ИЛ-1, ФНО)', source: 'Макрофаги', effect: 'Лихорадка, активация иммунитета' }
  ];

  // содержание теста (перенос в бд)
  const quizQuestions = [
    {
      id: 'q1',
      question: 'Какой из признаков воспаления соответствует понятию "Tumor"?',
      options: ['Покраснение', 'Припухлость', 'Боль', 'Жар'],
      correct: 'Припухлость'
    },
    {
      id: 'q2',
      question: 'Какие клетки первыми мигрируют в очаг острого воспаления?',
      options: ['Лимфоциты', 'Эозинофилы', 'Нейтрофилы', 'Макрофаги'],
      correct: 'Нейтрофилы'
    },
    {
      id: 'q3',
      question: 'Какой медиатор вызывает расширение сосудов и повышение проницаемости?',
      options: ['Гистамин', 'Интерлейкин-10', 'Фактор некроза опухоли', 'Интерферон'],
      correct: 'Гистамин'
    },
    {
      id: 'q4',
      question: 'Какая стадия воспаления характеризуется разрастанием ткани?',
      options: ['Альтерация', 'Экссудация', 'Пролиферация', 'Васкуляризация'],
      correct: 'Пролиферация'
    },
    {
      id: 'q5',
      question: 'Что такое рубцевание?',
      options: [
        'Полное восстановление ткани',
        'Замещение соединительной тканью',
        'Образование гноя',
        'Хроническое воспаление'
      ],
      correct: 'Замещение соединительной тканью'
    }
  ];

  const handleQuizAnswerChange = (questionId, value) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleQuizSubmit = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) score++;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({ q1: '', q2: '', q3: '', q4: '', q5: '' });
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  // escape для выхода из полноэкранного режима
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`topic-container ${isFullscreen ? 'fullscreen-active' : ''}`}>
      {/* Хедер */}
      <header className="topic-header">
        <div className="header-content">
          <div className="logo-section">
            <span className="logo-icon">📘</span>
            <h1 className="logo-title">Название<span>Атлас</span></h1>
          </div>
          <nav className="main-nav">
            <Link to="/" className="nav-link">Атлас</Link>
            <Link to="/interactive" className="nav-link">Интерактив</Link>
            <Link to="/tests" className="nav-link">Тесты</Link>
            <Link to="/simulations" className="nav-link">Симуляции</Link>
            <Link to="/favorites" className="nav-link">Избранное</Link>
          </nav>
          <button className="profile-btn">
            <span className="profile-icon">👤</span>
          </button>
        </div>
      </header>

      {/*hero‑секция */}
      <section className="topic-hero-compact">
        <div className="hero-compact-content">
          <h1 className="hero-compact-title">Воспаление</h1>
          <p className="hero-compact-subtitle">
            Сосудисто-мезенхимальная реакция на повреждение
          </p>
        </div>
      </section>

      {/* Две колонки */}
      <div className={`topic-main ${isFullscreen ? 'fullscreen' : ''}`}>
        {/* Левая колонка — модель */}
        <div className="model-column">
          <div className="model-placeholder">
            <div className="placeholder-content">
              <span className="placeholder-icon">🔄</span>
              <p>Интерактивная 3D‑модель очага воспаления</p>
              <small>Вращайте, приближайте, изучайте клеточные взаимодействия</small>
            </div>
          </div>
        </div>

        {/* Правая колонка — вкладки и контент */}
        <div className="content-column">
          {/* кнопка полноэкранного режима */}
          <button className="fullscreen-toggle" onClick={toggleFullscreen}>
            {isFullscreen ? '✕' : '⛶'}
          </button>

          {/*вкладки */}
          <div className="topic-tabs">
            <button 
              className={`tab-btn ${activeTab === 'definition' ? 'active' : ''}`}
              onClick={() => setActiveTab('definition')}
            >
              Определение
            </button>
            <button 
              className={`tab-btn ${activeTab === 'etiology' ? 'active' : ''}`}
              onClick={() => setActiveTab('etiology')}
            >
              Этиология
            </button>
            <button 
              className={`tab-btn ${activeTab === 'pathogenesis' ? 'active' : ''}`}
              onClick={() => setActiveTab('pathogenesis')}
            >
              Патогенез
            </button>
            <button 
              className={`tab-btn ${activeTab === 'morphology' ? 'active' : ''}`}
              onClick={() => setActiveTab('morphology')}
            >
              Морфология
            </button>
            <button 
              className={`tab-btn ${activeTab === 'outcomes' ? 'active' : ''}`}
              onClick={() => setActiveTab('outcomes')}
            >
              Исходы
            </button>
            <button 
              className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveTab('quiz')}
            >
              Проверка знаний
            </button>
          </div>

          {/* Контент вкладок */}
          <div className="tab-content">
            {activeTab === 'definition' && (
              <div className="definition-section">
                <p>
                  Воспаление — это эволюционно сформировавшаяся защитно-приспособительная реакция 
                  организма на действие патогенного раздражителя, проявляющаяся комплексом сосудистых, 
                  клеточных и тканевых изменений.
                </p>
                <div className="info-card">
                  <h3>Ключевые признаки (Celsus — Galen)</h3>
                  <ul className="signs-list">
                    <li><span className="sign-icon">🔥</span> Calor (жар)</li>
                    <li><span className="sign-icon">❤️</span> Rubor (краснота)</li>
                    <li><span className="sign-icon">💧</span> Tumor (припухлость)</li>
                    <li><span className="sign-icon">⚡</span> Dolor (боль)</li>
                    <li><span className="sign-icon">🚫</span> Functio laesa (нарушение функции)</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'etiology' && (
              <div className="etiology-section">
                <h3>Причины воспаления</h3>
                <div className="etiology-grid">
                  <div className="etiology-card">
                    <span className="etiology-icon">🦠</span>
                    <h4>Инфекционные</h4>
                    <p>Бактерии, вирусы, грибы, паразиты</p>
                  </div>
                  <div className="etiology-card">
                    <span className="etiology-icon">💥</span>
                    <h4>Физические</h4>
                    <p>Травма, радиация, ожоги, отморожения</p>
                  </div>
                  <div className="etiology-card">
                    <span className="etiology-icon">🧪</span>
                    <h4>Химические</h4>
                    <p>Кислоты, щелочи, токсины</p>
                  </div>
                  <div className="etiology-card">
                    <span className="etiology-icon">⚡</span>
                    <h4>Иммунные</h4>
                    <p>Аутоиммунные реакции, аллергия</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pathogenesis' && (
              <div className="pathogenesis-section">
                <h3>Механизм развития</h3>    
                <div className="stages-interactive">
                  <h4>Стадии воспаления</h4>
                  <div className="stage-selector">
                    {stages.map((stage, idx) => (
                      <button
                        key={idx}
                        className={`stage-btn ${activeStage === idx ? 'active' : ''}`}
                        onClick={() => setActiveStage(idx)}
                      >
                        <span className="stage-icon">{stage.icon}</span>
                        <span>{stage.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="stage-description">
                    <h4>{stages[activeStage].name}</h4>
                    <p>{stages[activeStage].desc}</p>
                    <div className="stage-detail">
                      {activeStage === 0 && (
                        <ul>
                          <li>Повреждение клеток</li>
                          <li>Высвобождение лизосомальных ферментов</li>
                          <li>Активация медиаторов (гистамин, серотонин)</li>
                        </ul>
                      )}
                      {activeStage === 1 && (
                        <ul>
                          <li>Расширение сосудов (гиперемия)</li>
                          <li>Повышение проницаемости</li>
                          <li>Эмиграция лейкоцитов</li>
                          <li>Образование экссудата</li>
                        </ul>
                      )}
                      {activeStage === 2 && (
                        <ul>
                          <li>Размножение фибробластов</li>
                          <li>Ангиогенез</li>
                          <li>Синтез коллагена</li>
                          <li>Формирование рубца</li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mediators-section">
                  <h4>Основные медиаторы</h4>
                  <div className="mediators-table">
                    {mediators.map((med, idx) => (
                      <div key={idx} className="mediator-row">
                        <div className="mediator-name">{med.name}</div>
                        <div className="mediator-source">{med.source}</div>
                        <div className="mediator-effect">{med.effect}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'morphology' && (
              <div className="morphology-section">
                <h3>Виды воспаления</h3>
                <div className="morphology-grid">
                  <div className="morph-card">
                    <span className="morph-icon">💧</span>
                    <h4>Экссудативное</h4>
                    <p>Преобладание сосудистых изменений и выхода жидкости</p>
                    <ul>
                      <li>Серозное</li>
                      <li>Фибринозное</li>
                      <li>Гнойное</li>
                      <li>Геморрагическое</li>
                    </ul>
                  </div>
                  <div className="morph-card">
                    <span className="morph-icon">🧫</span>
                    <h4>Пролиферативное</h4>
                    <p>Преобладание размножения клеток (продуктивное)</p>
                    <ul>
                      <li>Гранулематозное</li>
                      <li>Интерстициальное</li>
                      <li>С образованием полипов</li>
                    </ul>
                  </div>
                </div>
                <div className="info-note">
                  <p>🔬 <strong>Клеточный состав:</strong> нейтрофилы (острое), лимфоциты/макрофаги (хроническое), эозинофилы (аллергия)</p>
                </div>
              </div>
            )}

            {activeTab === 'outcomes' && (
              <div className="outcomes-section">
                <h3>Исходы воспаления</h3>
                <div className="outcomes-list">
                  <div className="outcome-item">
                    <span className="outcome-icon">✅</span>
                    <div>
                      <h4>Полное восстановление</h4>
                      <p>Регенерация ткани с возвратом к исходной структуре</p>
                    </div>
                  </div>
                  <div className="outcome-item">
                    <span className="outcome-icon">🔄</span>
                    <div>
                      <h4>Рубцевание</h4>
                      <p>Замещение соединительной тканью с потерей функции</p>
                    </div>
                  </div>
                  <div className="outcome-item">
                    <span className="outcome-icon">⏳</span>
                    <div>
                      <h4>Хронизация</h4>
                      <p>Переход в затяжное течение (например, при персистенции агента)</p>
                    </div>
                  </div>
                  <div className="outcome-item">
                    <span className="outcome-icon">💀</span>
                    <div>
                      <h4>Генерализация</h4>
                      <p>Распространение инфекции (сепсис)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Новая вкладка с тестом */}
            {activeTab === 'quiz' && (
              <div className="quiz-section">
                <h3>Проверьте свои знания</h3>
                <p>Ответьте на вопросы по теме «Воспаление»</p>

                {!quizSubmitted ? (
                  <>
                    {quizQuestions.map((q) => (
                      <div key={q.id} className="quiz-question">
                        <p className="question-text">{q.question}</p>
                        <div className="question-options">
                          {q.options.map((opt) => (
                            <label key={opt} className="option-label">
                              <input
                                type="radio"
                                name={q.id}
                                value={opt}
                                checked={quizAnswers[q.id] === opt}
                                onChange={(e) => handleQuizAnswerChange(q.id, e.target.value)}
                              />
                              {opt}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button className="quiz-submit-btn" onClick={handleQuizSubmit}>
                      Проверить ответы
                    </button>
                  </>
                ) : (
                  <div className="quiz-result">
                    <h4>Результат</h4>
                    <p>Вы ответили правильно на {quizScore} из {quizQuestions.length} вопросов.</p>
                    {quizScore === quizQuestions.length ? (
                      <p className="success-message">Отлично! Вы отлично усвоили тему.</p>
                    ) : (
                      <p className="retry-message">Попробуйте ещё раз, чтобы закрепить материал.</p>
                    )}
                    <button className="quiz-retry-btn" onClick={resetQuiz}>
                      Пройти заново
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Футер */}
      <footer className="atlas-footer">
        <div className="footer-content">
          <div className="footer-col">
            <h4>НазваниеАтласа</h4>
            <p>Интерактивный атлас по патологической физиологии для студентов и специалистов</p>
          </div>
          <div className="footer-col">
            <h4>Разделы</h4>
            <ul>
              <li><Link to="/pathology">Общая патология</Link></li>
              <li><Link to="/systems">Системные расстройства</Link></li>
              <li><Link to="/organs">Органная патология</Link></li>
              <li><Link to="/molecular">Молекулярная патология</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Ресурсы</h4>
            <ul>
              <li><Link to="/modules">Учебные модули</Link></li>
              <li><Link to="/tests">Тесты и задания</Link></li>
              <li><Link to="/lab">Виртуальная лаборатория</Link></li>
              <li><Link to="/reference">Справочник</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Контакты</h4>
            <ul>
              <li><Link to="/support">Поддержка</Link></li>
              <li><Link to="/about">О проекте</Link></li>
              <li><Link to="/teachers">Для преподавателей</Link></li>
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

export default InflammationPage;