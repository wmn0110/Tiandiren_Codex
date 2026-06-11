import { useEffect, useState } from 'react';
import { aboutText, experiences, personalInfo, products } from './data/siteData';

function Carousel({ items, type, onSelect }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 4200);

    return () => window.clearInterval(timerId);
  }, [items.length]);

  const goTo = (index) => {
    setActiveIndex((index + items.length) % items.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-track">
        {items.map((item, index) => {
          const isProduct = type === 'product';
          const title = isProduct ? item.name : item.title;
          const intro = item.intro;

          return (
            <button
              key={item.id}
              type="button"
              className={`content-card interactive-card carousel-card ${
                index === activeIndex ? 'is-active' : ''
              }`}
              aria-hidden={index === activeIndex ? 'false' : 'true'}
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => onSelect({ type, ...item })}
            >
              <img src={item.image} alt={title} />
              <div className="card-body">
                <div className="card-kicker">{isProduct ? '商品' : '經歷'}</div>
                <h3>{title}</h3>
                <p>{intro}</p>
                <span className="card-link">點擊查看詳細資訊</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="carousel-controls" aria-label={type === 'product' ? '商品輪播控制' : '經歷輪播控制'}>
        <button
          type="button"
          className="carousel-button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="上一頁"
        >
          ‹
        </button>
        <div className="carousel-dots">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`carousel-dot ${index === activeIndex ? 'is-active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`切換到第 ${index + 1} 張`}
              aria-current={index === activeIndex ? 'true' : 'false'}
            />
          ))}
        </div>
        <button
          type="button"
          className="carousel-button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="下一頁"
        >
          ›
        </button>
      </div>
    </div>
  );
}

function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedItem(null);
      }
    };

    if (selectedItem) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top">
            {personalInfo.siteName}
          </a>

          <nav className="nav" aria-label="主導覽">
            <a href="#about">關於我</a>
            <a href="#products">商品展示</a>
            <a href="#experience">經歷展示</a>
            <a href="#contact">聯絡我</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                {personalInfo.name} / {personalInfo.title}
              </p>
              <h1>{personalInfo.intro}</h1>
              <p className="lead">
                我把學習、實作與整理結合在一起，持續累積能夠被看見的成果。
                這個網站會記錄我的商品、經歷與聯絡方式，讓你可以更快認識我。
              </p>

              <div className="hero-actions">
                <a className="button primary" href="#products">
                  查看商品
                </a>
                <a className="button secondary" href="#experience">
                  查看經歷
                </a>
              </div>
            </div>

            <aside className="hero-panel" aria-label="網站摘要">
              <p className="panel-label">網站摘要</p>
              <div className="panel-grid">
                <div className="panel-card">
                  <span>網站名稱</span>
                  <strong>{personalInfo.siteName}</strong>
                </div>
                <div className="panel-card">
                  <span>姓名</span>
                  <strong>{personalInfo.name}</strong>
                </div>
                <div className="panel-card">
                  <span>定位</span>
                  <strong>持續學習、持續實作、持續成長</strong>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">About</p>
              <h2>關於我</h2>
            </div>

            <div className="about-card">
              {aboutText.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="products">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Products</p>
              <h2>商品展示</h2>
            </div>

            <Carousel items={products} type="product" onSelect={setSelectedItem} />
          </div>
        </section>

        <section className="section" id="experience">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Experience</p>
              <h2>經歷展示</h2>
            </div>

            <Carousel items={experiences} type="experience" onSelect={setSelectedItem} />
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Contact</p>
              <h2>聯絡我</h2>
            </div>

            <div className="contact-card">
              <div className="contact-row">
                <span>Email</span>
                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              </div>
              <div className="contact-row">
                <span>社群或網站</span>
                <a href={personalInfo.socialLink} target="_blank" rel="noreferrer">
                  {personalInfo.socialLink}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>© 2026 {personalInfo.siteName}. All rights reserved.</p>
        </div>
      </footer>

      {selectedItem ? (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setSelectedItem(null)}
        >
          <section
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.type === 'product' ? '商品詳細資訊' : '經歷詳細資訊'}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedItem(null)}
              aria-label="關閉視窗"
            >
              ×
            </button>

            <div className="modal-media">
              <img src={selectedItem.image} alt={selectedItem.name || selectedItem.title} />
            </div>

            <div className="modal-content">
              <p className="eyebrow">
                {selectedItem.type === 'product' ? '商品詳細資訊' : '經歷詳細資訊'}
              </p>
              <h3>{selectedItem.name || selectedItem.title}</h3>

              <p className="modal-lead">{selectedItem.detail || selectedItem.story}</p>

              <div className="detail-grid">
                {selectedItem.type === 'product' ? (
                  <>
                    <div>
                      <span>適合對象</span>
                      <strong>{selectedItem.audience}</strong>
                    </div>
                    <div>
                      <span>價格或合作方式</span>
                      <strong>{selectedItem.pricing}</strong>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span>日期或年份</span>
                      <strong>{selectedItem.date}</strong>
                    </div>
                    <div>
                      <span>相關成果</span>
                      <strong>{selectedItem.result}</strong>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

export default App;
