import product1Image from '../../商品圖片/product-1.jpg';
import product2Image from '../../商品圖片/product-2.jpg';
import product3Image from '../../商品圖片/product-3.jpg';
import experience1Image from '../../經歷圖片/experience-1.jpg';
import experience2Image from '../../經歷圖片/experience-2.jpg';
import experience3Image from '../../經歷圖片/experience-3.jpg';

export const personalInfo = {
  siteName: '自我學習紀錄',
  name: '梁晏誠',
  title: '工程師',
  intro: '一個正在跨領域學習的工程師',
  email: 'neteworld2024@gmail.com',
  socialLink: 'https://github.com/wmn0110',
};

export const aboutText = [
  '我是一位正在跨領域學習的工程師，平常習慣把知識拆成小步驟慢慢累積，並盡量把學到的內容轉成可以實際使用的成果。',
  '我重視實用性，也在意呈現方式是否清楚、自然，因為我希望讓人看到的不只是能力，還有我做事的節奏與態度。',
  '這個網站會持續更新，記錄我的學習路線、商品內容與工作經歷。',
];

export const products = [
  {
    id: 1,
    name: '高效能桌機組合',
    image: product1Image,
    intro: '兼顧穩定性與多工效率的實用配置。',
    detail:
      '這款配置以日常工作、內容整理與中度創作為主軸，強調穩定、好維護與未來擴充性。適合需要長時間處理文件、程式、素材整理，或想從入門一路升級到更完整工作流的人。',
    audience: '學生、工程師、內容創作者',
    pricing: 'NT$ 28,000 起，可依預算客製規格',
  },
  {
    id: 2,
    name: '雙螢幕工作站',
    image: product2Image,
    intro: '適合長時間工作與高效率切換任務。',
    detail:
      '以工作效率為核心，適合需要一邊閱讀、一邊輸入，或同時開啟多個專案視窗的使用情境。可搭配人體工學、收納與桌面配置建議，讓整體工作空間更好用也更舒服。',
    audience: '上班族、自由工作者、遠距工作者',
    pricing: '專案報價，含配置建議與安裝協助',
  },
  {
    id: 3,
    name: '學習與開發效率方案',
    image: product3Image,
    intro: '幫助跨領域學習者建立順手的工作流。',
    detail:
      '這是一套偏向學習與開發用途的組合，重視筆記、測試、編輯與資料整理的流暢度。很適合正在學習新技能、準備作品集，或想把日常記錄整理得更有系統的人。',
    audience: '跨領域學習者、初階開發者',
    pricing: '可洽詢顧問合作或內容整理合作',
  },
];

export const experiences = [
  {
    id: 1,
    title: '學生時期的基礎累積',
    image: experience1Image,
    intro: '從課堂、筆記與專題開始建立學習節奏。',
    story:
      '在學生階段，我把大量時間放在基礎訓練、專題實作與自學探索。這段期間最重要的收穫不是單一技術，而是學會如何拆解問題、持續練習，並把零散知識整理成可以重複使用的方法。',
    date: '2019 - 2022',
    result: '完成課堂專題、建立 Git 使用習慣、累積自學紀錄',
  },
  {
    id: 2,
    title: '進入職場後的協作養成',
    image: experience2Image,
    intro: '在實務情境中磨練溝通與執行能力。',
    story:
      '進入工作環境後，我開始更明確地理解需求溝通、任務排程與跨部門合作的重要性。很多事情不只是做出來，而是要做得清楚、可交接、可維護，這讓我對工程實作有了更完整的理解。',
    date: '2023 - 2024',
    result: '參與專案協作、問題排查、文件整理與流程優化',
  },
  {
    id: 3,
    title: '持續跨領域成長',
    image: experience3Image,
    intro: '把學習成果轉化成可展示的內容。',
    story:
      '我一直在嘗試把新學到的內容轉化成可以實際呈現的成果，像是整理作品集、更新學習筆記、優化個人品牌網站。對我來說，成長不是一次性的成果，而是每一段經驗都能往下一步推進。',
    date: '2024 - 至今',
    result: '持續更新作品集、學習紀錄與個人品牌內容',
  },
];
