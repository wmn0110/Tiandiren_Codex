import { useEffect, useState } from 'react';

const products = [
  {
    id: 1,
    name: '高效能桌機組合',
    image: '/商品圖片/product-1.jpg',
    intro: '兼顧穩定性與多工效率的實用配置。',
    detail:
      '這款配置以日常工作、內容整理與中度創作為主軸，強調穩定、好維護與未來擴充性。適合需要長時間處理文件、程式、素材整理，或想從入門一路升級到更完整工作流的人。',
    audience: '學生、工程師、內容創作者',
    pricing: 'NT$ 28,000 起，可依預算客製規格',
  },
  {
    id: 2,
    name: '雙螢幕工作站',
    image: '/商品圖片/product-2.jpg',
    intro: '適合長時間工作與高效率切換任務。',
    detail:
      '以工作效率為核心，適合需要一邊閱讀、一邊輸入，或同時開啟多個專案視窗的使用情境。可搭配人體工學、收納與桌面配置建議，讓整體工作空間更好用也更舒服。',
    audience: '上班族、自由工作者、遠距工作者',
    pricing: '專案報價，含配置建議與安裝協助',
  },
  {
    id: 3,
    name: '學習與開發效率方案',
    image: '/商品圖片/product-3.jpg',
    intro: '幫助跨領域學習者建立順手的工作流。',
    detail:
      '這是一套偏向學習與開發用途的組合，重視筆記、測試、編輯與資料整理的流暢度。很適合正在學習新技能、準備作品集，或想把日常記錄整理得更有系統的人。',
    audience: '跨領域學習者、初階開發者',
    pricing: '可洽詢顧問合作或內容整理合作',
  },
];

const experiences = [
  {
    id: 1,
    title: '學生時期的基礎累積',
    image: '/經歷圖片/experience-1.jpg',
    intro: '從課堂、筆記與專題開始建立學習節奏。',
    story:
      '在學生階段，我把大量時間放在基礎訓練、專題實作與自學探索。這段期間最重要的收穫不是單一技術，而是學會如何拆解問題、持續練習，並把零散知識整理成可以重複使用的方法。',
    date: '2019 - 2022',
    result: '完成課堂專題、建立 Git 使用習慣、累積自學紀錄',
  },
  {
    id: 2,
    title: '進入職場後的協作養成',
    image: '/經歷圖片/experience-2.jpg',
    intro: '在實務情境中磨練溝通與執行能力。',
    story:
      '進入工作環境後，我開始更明確地理解需求溝通、任務排程與跨部門合作的重要性。很多事情不只是做出來，而是要做得清楚、可交接、可維護，這讓我對工程實作有了更完整的理解。',
    date: '2023 - 2024',
    result: '參與專案協作、問題排查、文件整理與流程優化',
  },
  {
    id: 3,
    title: '持續跨領域成長',
    image: '/經歷圖片/experience-3.jpg',
    intro: '把學習成果轉化成可展示的內容。',
    story:
      '我一直在嘗試把新學到的內容轉化成可以實際呈現的成果，像是整理作品集、更新學習筆記、優化個人品牌網站。對我來說，成長不是一次性的成果，而是每一段經驗都能往下一步推進。',
    date: '2024 - 至今',
    result: '持續更新作品集、學習紀錄與個人品牌內容',
  },
];

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
            自我學習紀錄
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
              <p className="eyebrow">梁晏誠 / 工程師</p>
              <h1>一個正在跨領域學習的工程師</h1>
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
                  <strong>自我學習紀錄</strong>
                </div>
                <div className="panel-card">
                  <span>姓名</span>
                  <strong>梁晏誠</strong>
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
              <p>
                我是一位正在跨領域學習的工程師，平常習慣把知識拆成小步驟慢慢累積，並盡量把學到的內容轉成可以實際使用的成果。
                我重視實用性，也在意呈現方式是否清楚、自然，因為我希望讓人看到的不只是能力，還有我做事的節奏與態度。
                這個網站會持續更新，記錄我的學習路線、商品內容與工作經歷。
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="products">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Products</p>
              <h2>商品展示</h2>
            </div>

            <div className="card-grid">
              {products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  className="content-card interactive-card"
                  onClick={() => setSelectedItem({ type: 'product', ...product })}
                >
                  <img src={product.image} alt={product.name} />
                  <div className="card-body">
                    <div className="card-kicker">商品</div>
                    <h3>{product.name}</h3>
                    <p>{product.intro}</p>
                    <span className="card-link">點擊查看詳細資訊</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Experience</p>
              <h2>經歷展示</h2>
            </div>

            <div className="card-grid">
              {experiences.map((experience) => (
                <button
                  key={experience.id}
                  type="button"
                  className="content-card interactive-card experience-card"
                  onClick={() => setSelectedItem({ type: 'experience', ...experience })}
                >
                  <img src={experience.image} alt={experience.title} />
                  <div className="card-body">
                    <div className="card-kicker">經歷</div>
                    <h3>{experience.title}</h3>
                    <p>{experience.intro}</p>
                    <span className="card-link">點擊查看詳細資訊</span>
                  </div>
                </button>
              ))}
            </div>
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
                <a href="mailto:neteworld2024@gmail.com">neteworld2024@gmail.com</a>
              </div>
              <div className="contact-row">
                <span>社群或網站</span>
                <a
                  href="https://github.com/wmn0110"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://github.com/wmn0110
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>© 2026 自我學習紀錄. All rights reserved.</p>
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
