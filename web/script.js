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
