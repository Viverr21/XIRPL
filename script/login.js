const form = document.getElementById('loginForm');
const user = document.getElementById('username');
const pass = document.getElementById('password');
const toggle = document.getElementById('togglePass');
const overlay = document.getElementById('overlay');

// tampilkan / sembunyikan password
toggle.addEventListener('click', ()=>{
  if (pass.type === 'password') { 
    pass.type = 'text'; 
    toggle.innerText='🙈';
  } else { 
    pass.type = 'password'; 
    toggle.innerText='👁️';
  }
});

// validasi sederhana
function validate(){
  const u = user.value.trim();
  const p = pass.value.trim();
  if (!u || !p) return {ok:false, reason:'empty'};
  return {ok:true};
}

// cek tanggal + jam (6 Okt 2025 jam 09:00)
function canAccessNow() {
  const now = new Date();
  const startDate = new Date("2025-10-10T10:00:00"); 
  return now >= startDate;
}

form.addEventListener('submit', (ev)=>{
  ev.preventDefault();
  const v = validate();
  if (!v.ok){
    [user, pass].forEach(i=>{
      i.classList.remove('shake'); 
      void i.offsetWidth; 
      i.classList.add('shake');
    });
    return;
  }

  const validUser = "XIRPL";
  const validPass = "12345";

  if (user.value === validUser && pass.value === validPass) {
    if (!canAccessNow()) {
      alert("⏰ Belum waktunya BUKA!! Website bisa dibuka mulai 10 Oktober 2025 jam 10:00.");
      return;
    }

    const btn = form.querySelector('.btn');
    btn.disabled = true; 
    btn.style.opacity = '0.9';
    const origText = btn.innerHTML;
    btn.innerHTML = 'Memeriksa…';

    setTimeout(()=>{
      btn.innerHTML = origText; 
      btn.disabled=false;
      overlay.classList.add('show');
      setTimeout(()=>{
        overlay.querySelector('.check div:last-child').innerText = 'Dialihkan ke Kelas.';
      },1200);
      setTimeout(() => {
        window.location.href ="halamanutama.html"; 
      }, 2500);
    }, 1200);
  } else {
    [user, pass].forEach(i=>{
      i.classList.remove('shake'); 
      void i.offsetWidth; 
      i.classList.add('shake');
    });
  }
});

// hapus shake saat mengetik
[user, pass].forEach(i=> i.addEventListener('input', ()=>{
  if (i.value) i.classList.remove('shake');
}));

// efek bintang di background
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.x += s.dx;
    s.y += s.dy;
    if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
    if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
  });
  requestAnimationFrame(drawStars);
}
drawStars();
const btn = document.getElementById("myBtn");

    btn.addEventListener("click", () => {
      // tambah class spin
      btn.classList.add("spin");

      // setelah 2 detik, stop muter
      setTimeout(() => {
        btn.classList.remove("spin");
      }, 3000);

    });
