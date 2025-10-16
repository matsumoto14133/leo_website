const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-list');
const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

// 初期状態はメニューを表示
if (isHomePage) {
  navList.classList.add('active');  // index.htmlでは表示
} else {
  navList.classList.remove('active'); // 他ページでは非表示
}

// メニューの表示切り替え
navToggle.addEventListener('click', () => {
  navList.classList.toggle('active');
});
