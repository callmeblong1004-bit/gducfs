// Xử lý đăng ký
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    alert("Đăng ký thành công! Mời bạn đăng nhập.");
    window.location.href = "login.html";
  });
}

// Xử lý đăng nhập
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");

    if (username === savedUser && password === savedPass) {
      alert("Đăng nhập thành công!");
      window.location.href = "index.html";
    } else {
      alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
  });
}
// 1️⃣ Firebase config (dán config bạn lấy từ Firebase vào đây)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 2️⃣ Khởi tạo Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 3️⃣ Hàm lưu confession vào Firestore
function saveConfession(name, message) {
  db.collection("confessions").add({
    name: name,
    message: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    alert("Đã lưu confession!");
  })
  .catch((error) => {
    console.error("Lỗi khi lưu dữ liệu: ", error);
  });
}

// 4️⃣ Xử lý submit form
const form = document.getElementById("confessionForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;
  if(message.trim() !== "") {
    saveConfession(name, message);
    form.reset();
  } else {
    alert("Hãy viết confession trước khi gửi!");
  }
});

// 5️⃣ Hiển thị danh sách confession (tự động cập nhật)
const confessionsList = document.getElementById("confessionsList");
db.collection("confessions").orderBy("timestamp", "desc")
  .onSnapshot((snapshot) => {
    confessionsList.innerHTML = ""; // xóa hết trước khi render lại
    snapshot.forEach((doc) => {
      const data = doc.data();
      const div = document.createElement("div");
      div.innerHTML = `<strong>${data.name || "Ẩn danh"}:</strong> ${data.message}`;
      confessionsList.appendChild(div);
    });
  });

