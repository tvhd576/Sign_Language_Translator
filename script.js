document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const icon = this;
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    // Redirect to index.html after login
    window.location.href = "index.html";
});
