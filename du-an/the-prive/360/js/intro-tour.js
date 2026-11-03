const INTRO_SHOWN_KEY = 'vr360_intro_shown';

function getIntroSteps() {
  return [
    {
      intro: `
          <div style="text-align:center ; font-size:16px; color:#fff;">
            <h2>Chào mừng bạn đến với tour VR360!</h2>
            <p>Khám phá các tính năng nổi bật của dự án bằng các bước hướng dẫn sau.</p>
            <img src="./images/help_screen_fg.png" alt="Hướng dẫn" style="max-width:80%; margin:16px auto 0; display:block;">
          </div>
        `
    },
    { element: parent.document.querySelector('.main-menu-button'), intro: "Nhấn vào đây để mở menu chính." },
    { element: document.querySelector('#showSearchBtn'), intro: "Tìm kiếm căn hộ hoặc khu vực tại đây." },
    { element: document.querySelector('.floorplan'), intro: "Xem sa bàn 3D dự án." },
    { element: document.querySelector('#sound_btn_2'), intro: "Bật/tắt âm thanh." },
    { element: document.querySelector('#auto_rotation'), intro: "Bật/tắt chế độ tự động xoay." },
    { element: document.querySelector('#fullscreen_2'), intro: "Chuyển sang chế độ toàn màn hình." },
    { element: document.querySelector('#help_tour'), intro: "Nhấn vào đây để xem lại hướng dẫn." },
    { element: document.querySelector('#share_2'), intro: "Chia sẻ tour lên mạng xã hội." }
  ];
}

function startIntro() {
  introJs().setOptions({
    steps: getIntroSteps(),
    nextLabel: 'Tiếp',
    prevLabel: 'Trước',
    doneLabel: 'Hoàn tất',
    skipLabel: 'Đã hiểu',
    overlayOpacity: 0.8,
    exitOnOverlayClick: false,
    exitOnEsc: false
  }).oncomplete(function () {
    localStorage.setItem(INTRO_SHOWN_KEY, 'true');
  }).onexit(function () {
    localStorage.setItem(INTRO_SHOWN_KEY, 'true');
  }).start();
}

function hasSeenIntro() {
  return localStorage.getItem(INTRO_SHOWN_KEY) === 'true';
}

// if (!hasSeenIntro()) {
//   startIntro();
// }

// Cho phép bấm lại nút help_tour để xem lại hướng dẫn

// document.addEventListener('click', function (e) {
//   if (e.target && e.target.parent.id === 'help_tour') {
//     startIntro();
//     console.log('Help tour clicked, restarting intro.');
    
//   }
//   console.log('Click event:', e.target);
  
// });
window.startIntro = startIntro;
var helpBtn = document.getElementById('help_tour');
if (helpBtn) {
  helpBtn.addEventListener('click', function(e) {
    e.preventDefault();
    alert("Bạn sẽ xem lại hướng dẫn từ đầu.");
    startIntro();
  });
}