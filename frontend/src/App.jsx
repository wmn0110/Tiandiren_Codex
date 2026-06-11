import { useEffect, useState } from 'react';
import {
  aboutText,
  experiences as fallbackExperiences,
  personalInfo,
  products as fallbackProducts,
} from './data/siteData';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://127.0.0.1:5000/api' : '/api');
const PRODUCT_STORAGE_KEY = 'personal-brand-products';
const EXPERIENCE_STORAGE_KEY = 'personal-brand-experiences';

function resolveImageUrl(imageName, folderName, fallbackName) {
  const value = String(imageName || '').trim();

  if (!value) {
    return `/${folderName}/${fallbackName}`;
  }

  if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/')) {
    return value;
  }

  return `/${folderName}/${value}`;
}

function normalizeProduct(product) {
  return {
    ...product,
    image: resolveImageUrl(product.image, '商品圖片', 'product-1.jpg'),
  };
}

function normalizeExperience(experience) {
  return {
    ...experience,
    image: resolveImageUrl(experience.image, '經歷圖片', 'experience-1.jpg'),
  };
}

function readCachedList(storageKey) {
  try {
    const rawValue = window.localStorage.getItem(storageKey);
    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
}

function writeCachedList(storageKey, items) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  } catch {
    // 瀏覽器若禁止 localStorage，畫面仍然可以正常運作。
  }
}

function requestJson(url, options) {
  return fetch(url, options).then(async (response) => {
    const body = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(body?.message || `Request failed: ${response.status}`);
    }

    return body;
  });
}

function Carousel({ items, type, onSelect }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!items.length) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
    }, 4200);

    return () => window.clearInterval(timerId);
  }, [items.length]);

  useEffect(() => {
    if (activeIndex >= items.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, items.length]);

  const goTo = (nextIndex) => {
    if (!items.length) {
      return;
    }

    setActiveIndex((nextIndex + items.length) % items.length);
  };

  if (!items.length) {
    return <p className="form-hint">目前還沒有資料。</p>;
  }

  return (
    <div className="carousel">
      <div className="carousel-track">
        {items.map((item, index) => {
          const isProduct = type === 'product';
          const title = isProduct ? item.name : item.title;
          const intro = item.intro || item.description || '';

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
              <img src={item.image} alt={`${title} 圖片`} />
              <div className="card-body">
                <div className="card-kicker">{isProduct ? '商品展示' : '經歷展示'}</div>
                <h3>{title}</h3>
                <p>{intro}</p>
                <span className="card-link">看更多</span>
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
          aria-label="上一筆"
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
              aria-label={`切換到第 ${index + 1} 筆`}
              aria-current={index === activeIndex ? 'true' : 'false'}
            />
          ))}
        </div>

        <button
          type="button"
          className="carousel-button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="下一筆"
        >
          ›
        </button>
      </div>
    </div>
  );
}

function EntryForm({ type, onCancel, onSave }) {
  const isProduct = type === 'product';
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.currentTarget);
    const nameOrTitle = String(formData.get(isProduct ? 'name' : 'title') || '').trim();
    const intro = String(formData.get('intro') || '').trim();

    if (!nameOrTitle) {
      setError(isProduct ? '商品名稱不能空白。' : '經歷標題不能空白。');
      return;
    }

    if (!intro) {
      setError('簡介不能空白。');
      return;
    }

    try {
      await onSave(
        isProduct
          ? {
              name: nameOrTitle,
              image: String(formData.get('image') || '').trim(),
              intro,
              detail: String(formData.get('detail') || '').trim(),
              audience: String(formData.get('audience') || '').trim(),
              pricing: String(formData.get('pricing') || '').trim(),
            }
          : {
              title: nameOrTitle,
              image: String(formData.get('image') || '').trim(),
              intro,
              story: String(formData.get('story') || '').trim(),
              date: String(formData.get('date') || '').trim(),
              result: String(formData.get('result') || '').trim(),
            },
      );

      event.currentTarget.reset();
    } catch (submitError) {
      setError(submitError.message || '儲存失敗，請再試一次。');
    }
  };

  return (
    <form className="entry-form" onSubmit={handleSubmit}>
      <p className="form-hint">
        {isProduct
          ? '圖片檔名請輸入 product-4.jpg 這種格式，系統會自動對應到 frontend/商品圖片。'
          : '圖片檔名請輸入 experience-4.jpg 這種格式，系統會自動對應到 frontend/經歷圖片。'}
      </p>

      {error ? <p className="form-error">{error}</p> : null}

      <div className="form-grid">
        {isProduct ? (
          <>
            <div className="form-field">
              <label htmlFor="product-name">商品名稱</label>
              <input id="product-name" name="name" type="text" placeholder="例如：跨領域學習筆記" />
            </div>

            <div className="form-field">
              <label htmlFor="product-image">商品圖片檔名</label>
              <input id="product-image" name="image" type="text" placeholder="product-4.jpg" />
            </div>

            <div className="form-field full">
              <label htmlFor="product-intro">商品簡介</label>
              <textarea id="product-intro" name="intro" placeholder="一句話介紹這個商品的特色。" />
            </div>

            <div className="form-field full">
              <label htmlFor="product-detail">商品詳細介紹</label>
              <textarea
                id="product-detail"
                name="detail"
                placeholder="補充商品內容、使用方式或適合的情境。"
              />
            </div>

            <div className="form-field">
              <label htmlFor="product-audience">適合對象</label>
              <input id="product-audience" name="audience" type="text" placeholder="例如：初學者、企業團隊" />
            </div>

            <div className="form-field">
              <label htmlFor="product-pricing">價格或合作方式</label>
              <input id="product-pricing" name="pricing" type="text" placeholder="例如：NT$ 3,000 / 方案合作" />
            </div>
          </>
        ) : (
          <>
            <div className="form-field">
              <label htmlFor="experience-title">經歷標題</label>
              <input id="experience-title" name="title" type="text" placeholder="例如：跨領域學習歷程" />
            </div>

            <div className="form-field">
              <label htmlFor="experience-image">經歷圖片檔名</label>
              <input id="experience-image" name="image" type="text" placeholder="experience-4.jpg" />
            </div>

            <div className="form-field full">
              <label htmlFor="experience-intro">經歷簡介</label>
              <textarea id="experience-intro" name="intro" placeholder="用一句話說明這段經歷。" />
            </div>

            <div className="form-field full">
              <label htmlFor="experience-story">詳細故事</label>
              <textarea
                id="experience-story"
                name="story"
                placeholder="可以寫下背景、挑戰、做法與過程。"
              />
            </div>

            <div className="form-field">
              <label htmlFor="experience-date">日期或年份</label>
              <input id="experience-date" name="date" type="text" placeholder="例如：2024" />
            </div>

            <div className="form-field">
              <label htmlFor="experience-result">相關成果</label>
              <input id="experience-result" name="result" type="text" placeholder="例如：完成專題、建立作品集" />
            </div>
          </>
        )}
      </div>

      <div className="form-actions">
        <button className="button secondary" type="button" onClick={onCancel}>
          取消
        </button>
        <button className="button primary" type="submit">
          {isProduct ? '儲存商品' : '儲存經歷'}
        </button>
      </div>
    </form>
  );
}

function DetailModal({ item, onClose, onDelete }) {
  if (!item) {
    return null;
  }

  const isProduct = item.type === 'product';
  const title = item.name || item.title;
  const mainText = item.detail || item.story || '';

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-label={isProduct ? '商品詳細資訊' : '經歷詳細資訊'}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="關閉視窗">
          ×
        </button>

        <div className="modal-media">
          <img
            src={item.image}
            alt={title}
          />
        </div>

        <div className="modal-content">
          <p className="eyebrow">{isProduct ? '商品詳細資訊' : '經歷詳細資訊'}</p>
          <h3>{title}</h3>
          <p className="modal-lead">{mainText}</p>

          <div className="detail-grid">
            {isProduct ? (
              <>
                <div>
                  <span>適合對象</span>
                  <strong>{item.audience || '尚未填寫'}</strong>
                </div>
                <div>
                  <span>價格或合作方式</span>
                  <strong>{item.pricing || '尚未填寫'}</strong>
                </div>
              </>
            ) : (
              <>
                <div>
                  <span>日期或年份</span>
                  <strong>{item.date || '尚未填寫'}</strong>
                </div>
                <div>
                  <span>相關成果</span>
                  <strong>{item.result || '尚未填寫'}</strong>
                </div>
              </>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="button secondary" onClick={onClose}>
              關閉
            </button>
            <button
              type="button"
              className="button danger"
              onClick={() => onDelete(item)}
            >
              刪除
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [openForm, setOpenForm] = useState(null);
  const [notice, setNotice] = useState('');
  const [productItems, setProductItems] = useState(
    fallbackProducts.map(normalizeProduct),
  );
  const [experienceItems, setExperienceItems] = useState(
    fallbackExperiences.map(normalizeExperience),
  );

  useEffect(() => {
    if (!selectedItem) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  useEffect(() => {
    let isMounted = true;

    async function loadRemoteData() {
      const [productResult, experienceResult] = await Promise.allSettled([
        fetch(`${API_BASE_URL}/products`),
        fetch(`${API_BASE_URL}/experiences`),
      ]);

      if (!isMounted) {
        return;
      }

      if (productResult.status === 'fulfilled' && productResult.value.ok) {
        const backendProducts = await productResult.value.json();
        const normalizedProducts = backendProducts.map(normalizeProduct);
        setProductItems(normalizedProducts);
        writeCachedList(PRODUCT_STORAGE_KEY, normalizedProducts);
      } else {
        const cachedProducts = readCachedList(PRODUCT_STORAGE_KEY);
        if (cachedProducts) {
          setProductItems(cachedProducts.map(normalizeProduct));
        }
      }

      if (experienceResult.status === 'fulfilled' && experienceResult.value.ok) {
        const backendExperiences = await experienceResult.value.json();
        const normalizedExperiences = backendExperiences.map(normalizeExperience);
        setExperienceItems(normalizedExperiences);
        writeCachedList(EXPERIENCE_STORAGE_KEY, normalizedExperiences);
      } else {
        const cachedExperiences = readCachedList(EXPERIENCE_STORAGE_KEY);
        if (cachedExperiences) {
          setExperienceItems(cachedExperiences.map(normalizeExperience));
        }
      }

      if (
        productResult.status !== 'fulfilled' ||
        !productResult.value.ok ||
        experienceResult.status !== 'fulfilled' ||
        !experienceResult.value.ok
      ) {
        setNotice('後端暫時無法連線，畫面會先使用瀏覽器暫存資料。');
      }
    }

    loadRemoteData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!notice) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setNotice('');
    }, 4000);

    return () => window.clearTimeout(timerId);
  }, [notice]);

  const saveProduct = async (productData) => {
    try {
      const savedProduct = await requestJson(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const normalizedProduct = normalizeProduct(savedProduct);
      setProductItems((currentItems) => {
        const nextItems = [...currentItems, normalizedProduct];
        writeCachedList(PRODUCT_STORAGE_KEY, nextItems);
        return nextItems;
      });
      setSelectedItem({ type: 'product', ...normalizedProduct });
      setOpenForm(null);
      setNotice('商品已儲存成功。');
    } catch (error) {
      const localProduct = normalizeProduct({
        id: `local-${Date.now()}`,
        ...productData,
      });

      setProductItems((currentItems) => {
        const nextItems = [...currentItems, localProduct];
        writeCachedList(PRODUCT_STORAGE_KEY, nextItems);
        return nextItems;
      });
      setSelectedItem({ type: 'product', ...localProduct });
      setOpenForm(null);
      setNotice(`後端儲存失敗，已先保存在瀏覽器。${error.message ? `(${error.message})` : ''}`);
    }
  };

  const saveExperience = async (experienceData) => {
    try {
      const savedExperience = await requestJson(`${API_BASE_URL}/experiences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experienceData),
      });

      const normalizedExperience = normalizeExperience(savedExperience);
      setExperienceItems((currentItems) => {
        const nextItems = [...currentItems, normalizedExperience];
        writeCachedList(EXPERIENCE_STORAGE_KEY, nextItems);
        return nextItems;
      });
      setSelectedItem({ type: 'experience', ...normalizedExperience });
      setOpenForm(null);
      setNotice('經歷已儲存成功。');
    } catch (error) {
      const localExperience = normalizeExperience({
        id: `local-${Date.now()}`,
        ...experienceData,
      });

      setExperienceItems((currentItems) => {
        const nextItems = [...currentItems, localExperience];
        writeCachedList(EXPERIENCE_STORAGE_KEY, nextItems);
        return nextItems;
      });
      setSelectedItem({ type: 'experience', ...localExperience });
      setOpenForm(null);
      setNotice(`後端儲存失敗，已先保存在瀏覽器。${error.message ? `(${error.message})` : ''}`);
    }
  };

  const deleteProduct = async (product) => {
    const confirmed = window.confirm(`確定要刪除商品「${product.name}」嗎？`);
    if (!confirmed) {
      return;
    }

    try {
      if (typeof product.id === 'number') {
        await requestJson(`${API_BASE_URL}/products/${product.id}`, {
          method: 'DELETE',
        });
      }

      setProductItems((currentItems) => {
        const nextItems = currentItems.filter((item) => item.id !== product.id);
        writeCachedList(PRODUCT_STORAGE_KEY, nextItems);
        return nextItems;
      });
      setSelectedItem(null);
      setNotice('商品已刪除。');
    } catch (error) {
      setNotice(`刪除商品失敗。${error.message ? `(${error.message})` : ''}`);
    }
  };

  const deleteExperience = async (experience) => {
    const confirmed = window.confirm(`確定要刪除經歷「${experience.title}」嗎？`);
    if (!confirmed) {
      return;
    }

    try {
      if (typeof experience.id === 'number') {
        await requestJson(`${API_BASE_URL}/experiences/${experience.id}`, {
          method: 'DELETE',
        });
      }

      setExperienceItems((currentItems) => {
        const nextItems = currentItems.filter((item) => item.id !== experience.id);
        writeCachedList(EXPERIENCE_STORAGE_KEY, nextItems);
        return nextItems;
      });
      setSelectedItem(null);
      setNotice('經歷已刪除。');
    } catch (error) {
      setNotice(`刪除經歷失敗。${error.message ? `(${error.message})` : ''}`);
    }
  };

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
        {notice ? (
          <section className="container notice-banner" aria-live="polite">
            {notice}
          </section>
        ) : null}

        <section className="hero section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                {personalInfo.name} / {personalInfo.title}
              </p>
              <h1>{personalInfo.intro}</h1>
              <p className="lead">{aboutText[0]}</p>

              <div className="hero-actions">
                <a className="button primary" href="#products">
                  查看商品
                </a>
                <a className="button secondary" href="#experience">
                  查看經歷
                </a>
              </div>
            </div>

            <aside className="hero-panel" aria-label="個人資訊">
              <p className="panel-label">個人資訊</p>
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
                  <span>職稱</span>
                  <strong>{personalInfo.title}</strong>
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

            <div className="section-tools">
              <p className="form-hint">點擊卡片可看詳細資訊，按「新增商品」可以立刻加入新資料。</p>
              <button className="add-button" type="button" onClick={() => setOpenForm('product')}>
                新增商品
              </button>
            </div>

            {openForm === 'product' ? (
              <EntryForm type="product" onCancel={() => setOpenForm(null)} onSave={saveProduct} />
            ) : null}

            <Carousel items={productItems} type="product" onSelect={setSelectedItem} />
          </div>
        </section>

        <section className="section" id="experience">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Experience</p>
              <h2>經歷展示</h2>
            </div>

            <div className="section-tools">
              <p className="form-hint">點擊卡片可看詳細資訊，按「新增經歷」可以立刻加入新資料。</p>
              <button className="add-button" type="button" onClick={() => setOpenForm('experience')}>
                新增經歷
              </button>
            </div>

            {openForm === 'experience' ? (
              <EntryForm
                type="experience"
                onCancel={() => setOpenForm(null)}
                onSave={saveExperience}
              />
            ) : null}

            <Carousel items={experienceItems} type="experience" onSelect={setSelectedItem} />
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
                <span>社群或網站連結</span>
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

      <DetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onDelete={(item) => {
          if (item.type === 'product') {
            deleteProduct(item);
          } else {
            deleteExperience(item);
          }
        }}
      />
    </div>
  );
}

export default App;
