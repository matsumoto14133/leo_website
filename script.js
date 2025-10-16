const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-list');
const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

// メニューの表示切り替え
navToggle.addEventListener('click', () => {
  navList.classList.toggle('active');
});

// ページ読み込み後に実行
window.addEventListener('DOMContentLoaded', () => {
  // 初期状態はメニューを表示
  if (isHomePage) {
    navList.classList.add('active');  // index.htmlでは表示
  } else {
    navList.classList.remove('active'); // 他ページでは非表示
  }
});